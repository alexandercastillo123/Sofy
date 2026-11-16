import { spawn } from 'node:child_process';
import fs from 'node:fs';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9231;
const PROFILE = 'C:/Users/ALEXANDER/AppData/Local/Temp/sofi-runtime-profile-3d';
const BASE = 'http://127.0.0.1:3012';

fs.rmSync(PROFILE, { recursive: true, force: true });

const chrome = spawn(
	CHROME,
	[
		'--headless=new',
		`--remote-debugging-port=${PORT}`,
		`--user-data-dir=${PROFILE}`,
		'--no-first-run',
		'--no-default-browser-check',
		'--enable-unsafe-swiftshader',
		'--window-size=1440,1000',
		'about:blank'
	],
	{ stdio: 'ignore' }
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getTarget() {
	for (let attempt = 0; attempt < 40; attempt += 1) {
		try {
			const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((response) => response.json());
			const page = list.find((target) => target.type === 'page');

			if (page) {
				return page;
			}
		} catch {
			// Chrome is still starting.
		}

		await sleep(250);
	}

	throw new Error('Chrome CDP no respondió.');
}

const target = await getTarget();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
	socket.addEventListener('open', resolve, { once: true });
	socket.addEventListener('error', reject, { once: true });
});

let messageId = 0;
const pending = new Map();
const errors = [];
const network404 = [];

socket.addEventListener('message', (event) => {
	const message = JSON.parse(event.data);

	if (message.id && pending.has(message.id)) {
		const { resolve, reject } = pending.get(message.id);
		pending.delete(message.id);

		if (message.error) {
			reject(new Error(message.error.message));
		} else {
			resolve(message.result);
		}
		return;
	}

	if (message.method === 'Runtime.exceptionThrown') {
		errors.push(message.params.exceptionDetails?.text ?? 'Runtime exception');
	}

	if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
		errors.push(message.params.args?.map((arg) => arg.value ?? arg.description).join(' ') ?? 'console.error');
	}

	if (message.method === 'Log.entryAdded' && message.params.entry.level === 'error') {
		errors.push(message.params.entry.text);
	}

	if (message.method === 'Network.responseReceived' && message.params.response.status === 404) {
		network404.push(message.params.response.url);
	}
});

function send(method, params = {}) {
	messageId += 1;

	return new Promise((resolve, reject) => {
		pending.set(messageId, { resolve, reject });
		socket.send(JSON.stringify({ id: messageId, method, params }));
	});
}

async function evaluate(expression) {
	const result = await send('Runtime.evaluate', {
		expression,
		returnByValue: true,
		awaitPromise: true
	});

	return result.result?.value;
}

async function navigate(path, wait = 2400) {
	await send('Page.navigate', { url: `${BASE}${path}` });
	await sleep(wait);
	return evaluate('document.body.innerText');
}

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Network.enable');
await send('Emulation.setDeviceMetricsOverride', {
	width: 1440,
	height: 1000,
	deviceScaleFactor: 1,
	mobile: false
});

await navigate('/sign-in', 1800);
await evaluate(`
	localStorage.setItem('sofi.session', JSON.stringify({
		id: 'usr-sofi-001',
		role: ['admin'],
		displayName: 'Ing. Alexander Ríos',
		email: 'admin@sofi.pe',
		shortcuts: ['dashboard','proyectos','rumbo-de-veta','resultados-3d','historial','punto-de-direccion','perfil','suscripciones']
	}));
	localStorage.removeItem('sofi.subscription');
	localStorage.removeItem('sofi.profile');
`);

const projectsText = await navigate('/proyectos');
const projectRows = await evaluate(`document.querySelectorAll('tbody tr').length`);
const projectHasMobileSource = projectsText.includes('Sofy Corte de Vetas');

const detailText = await navigate('/proyectos/hrs-2041');
const detailHasHeader = detailText.includes('Cabecera del proyecto');
const detailHasAlternatives = detailText.includes('Alternativas calculadas');
const detailHasThreeButton = detailText.includes('Simulación 3D');
const detailShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync('C:/Users/ALEXANDER/Desktop/Sofi/web/.tmp-project.png', Buffer.from(detailShot.data, 'base64'));

const resultsText = await navigate('/resultados-3d', 3800);
const resultsHasThree = resultsText.includes('THREE.JS · WEBGL') || resultsText.includes('Simulación 3D de proyectos');
const resultsCanvas = await evaluate(`Boolean(document.querySelector('canvas'))`);

const simulationText = await navigate('/proyectos/hrs-2041/simulacion-3d', 4200);
const canvasInfo = await evaluate(`
	(() => {
		const canvas = document.querySelector('canvas');
		if (!canvas) return { exists: false };
		const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
		return { exists: true, width: canvas.width, height: canvas.height, webgl: Boolean(gl) };
	})()
`);
const webglFailed = simulationText.includes('No se pudo iniciar WebGL');
const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync('C:/Users/ALEXANDER/Desktop/Sofi/web/.tmp-simulation.png', Buffer.from(screenshot.data, 'base64'));

const profileText = await navigate('/perfil');
const profileFirstName = await evaluate(`document.querySelector('input[name="firstName"]')?.value ?? null`);
const profileHasSubscription = profileText.includes('Suscripción') && profileText.includes('Elegir un plan');

await evaluate(`
	(() => {
		const input = document.querySelector('input[name="phone"]');
		if (!input) return;
		const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
		setter.call(input, '+51 999 111 222');
		input.dispatchEvent(new Event('input', { bubbles: true }));
	})()
`);
await evaluate(`
	[...document.querySelectorAll('button')]
		.find((button) => button.innerText.includes('Guardar cambios'))
		?.click()
`);
await sleep(1400);
const storedProfilePhone = await evaluate(`JSON.parse(localStorage.getItem('sofi.profile') || '{}').phone ?? null`);

const profileShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync('C:/Users/ALEXANDER/Desktop/Sofi/web/.tmp-profile.png', Buffer.from(profileShot.data, 'base64'));

const billingText = await navigate('/suscripciones');
const billingHasPlans = billingText.includes('Planes disponibles');
const billingHasPremium = billingText.includes('Premium mensual');
const billingHasCulqi = billingText.includes('Culqi');
const billingShot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
fs.writeFileSync('C:/Users/ALEXANDER/Desktop/Sofi/web/.tmp-billing.png', Buffer.from(billingShot.data, 'base64'));

const improveButtons = await evaluate(`
	[...document.querySelectorAll('button')]
		.filter((button) => button.innerText.includes('Mejorar plan'))
		.map((button) => button.innerText)
`);
await evaluate(`
	(() => {
		const cards = [...document.querySelectorAll('.MuiPaper-root')];
		const premium = cards.find((card) => card.innerText.includes('Premium mensual'));
		const button = premium?.querySelector('button');
		button?.click();
	})()
`);
await sleep(700);
const dialogText = await evaluate('document.body.innerText');
const dialogOpened = dialogText.includes('Cambiar a Premium mensual');
await evaluate(`
	[...document.querySelectorAll('button')]
		.find((button) => button.innerText.includes('Confirmar cambio'))
		?.click()
`);
await sleep(1800);
const afterChangeText = await evaluate('document.body.innerText');
const storedPlan = await evaluate(`JSON.parse(localStorage.getItem('sofi.subscription') || '{}').planId ?? null`);
const premiumActive = afterChangeText.includes('Premium mensual');

await evaluate(`
	[...document.querySelectorAll('button')]
		.find((button) => button.innerText.includes('Configurar Culqi'))
		?.click()
`);
await sleep(1200);
const afterPaymentText = await evaluate('document.body.innerText');
const culqiActive = afterPaymentText.includes('Culqi ya configurado');

console.log(
	JSON.stringify(
		{
			projectRows,
			projectHasMobileSource,
			detailHasHeader,
			detailHasAlternatives,
			detailHasThreeButton,
			canvasInfo,
			webglFailed,
			resultsHasThree,
			resultsCanvas,
			storedProfilePhone,
			profileFirstName,
			profileHasSubscription,
			billingHasPlans,
			billingHasPremium,
			billingHasCulqi,
			improveButtons,
			dialogOpened,
			storedPlan,
			premiumActive,
			culqiActive,
			network404: [...new Set(network404)],
			errors: [...new Set(errors)].slice(0, 10)
		},
		null,
		2
	)
);

socket.close();
chrome.kill();
