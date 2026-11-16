# SOFI · Landing Oficial de Inteligencia Artificial Minera

Landing page corporativa y técnica para la plataforma **SOFI (Simulador de Cortes de Veta)**. Presenta la solución integrada entre la aplicación móvil Android de campo y el sistema web de gestión y modelado geológico 3D.

---

## Características Principales

1. **Identidad Visual Corporativa**:
   - Paleta de colores oficial SOFI (`#0F766E` Deep Teal, `#D97706` Ámbar Minero, neutrales de alto contraste).
   - Componentes oficiales de **Material UI v7** (`@mui/material`, `@mui/icons-material`).
   - Sin emojis genéricos: iconografía técnica seria.

2. **Flujo Integrado Móvil -> Nube -> Web**:
   - Muestra cómo las mediciones en campo con la app Android (brújula, clinómetro, coordenadas UTM, potencia de veta) funcionan offline en interior mina.
   - Sincronización transparente con la nube hacia la oficina técnica.

3. **Galería de Pantallas Reales de Android**:
   - Brújula digital de alta precisión.
   - Clinómetro digital para buzamiento.
   - Captura de coordenadas UTM de afloramientos.
   - Corte de vetas y sección geológica.
   - Simulación rápida en móvil.
   - Registro y gestión de proyectos.
   - Sincronización segura con Google.

4. **Showcase del Sistema Web**:
   - Simulación 3D interactiva en la nube.
   - Detalle matemático y cálculo comparativo entre Proyecto Perpendicular (EP) y Cortaveta Diagonal (PC).
   - Facturación y suscripciones.
   - Perfil profesional y auditoría.

5. **Simulador 3D Interactivo Three.js en Vivo**:
   - Motor Three.js idéntico al del sistema web.
   - Órbita 360°, zoom, restablecimiento de cámara y pantalla completa.
   - Control de capas: Plano de veta, Proyectos de avance (EP/PC), Grilla métrica y vector Norte.
   - Presets geológicos de yacimiento: Veta Esperanza, Veta San José y Veta El Carmen.
   - Métricas de avance y ahorro de metros lineales en tiempo real.

6. **Planes de Suscripción y Simulación**:
   - Activación de **14 días de prueba gratuita** con cuenta de Google (simulación OAuth interactiva).
   - Planes Básico y Premium con selector mensual/anual y desglose de ahorros.
   - Pasarela de confirmación simulada lista para despliegue.

---

## Arquitectura del Proyecto

Estructura modular limpia, escalable y con archivos reducidos (cero archivos monolíticos):

```text
landing/
├── public/
│   ├── assets/images/android/   # Capturas reales de la app móvil
│   ├── assets/images/web/       # Capturas reales del sistema web
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css          # Estilos base y variables CSS
│   │   ├── layout.tsx           # Layout raíz con ThemeRegistry y metadatos
│   │   └── page.tsx             # Composición limpia (~50 líneas)
│   ├── theme/
│   │   ├── theme.ts             # Configuración del tema MUI oficial
│   │   └── ThemeRegistry.tsx    # Proveedor de caché Emotion y CssBaseline
│   ├── data/
│   │   ├── plans.ts             # Datos de planes y precios
│   │   ├── mobileFeatures.ts    # Especificaciones de la app Android
│   │   ├── webFeatures.ts       # Capacidades del sistema web
│   │   ├── simulatorPresets.ts  # Modelos geológicos de muestra
│   │   └── faqData.ts           # Preguntas frecuentes técnicas
│   └── components/
│       ├── layout/
│       │   ├── Navbar.tsx       # Barra de navegación corporativa
│       │   └── Footer.tsx       # Pie de página institucional
│       ├── simulator/
│       │   ├── VeinSceneBuilder.ts # Generador de geometría Three.js
│       │   ├── VeinViewer3D.tsx    # Canvas 3D con OrbitControls
│       │   └── SimulatorControls.tsx # Selector de vetas y capas
│       ├── modals/
│       │   ├── GoogleAuthModal.tsx # Simulación de inicio con Google
│       │   └── PricingModal.tsx    # Modal de suscripción simulada
│       └── sections/
│           ├── HeroSection.tsx
│           ├── WorkflowSyncSection.tsx
│           ├── MobileAppSection.tsx
│           ├── WebPlatformSection.tsx
│           ├── Interactive3DSection.tsx
│           ├── PricingSection.tsx
│           ├── TrialCtaSection.tsx
│           └── FaqSection.tsx
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## Instrucciones de Ejecución Local

1. Entrar en la carpeta:
   ```bash
   cd landing
   ```
2. Instalar dependencias (ya instaladas):
   ```bash
   npm install
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

4. Compilar para producción:
   ```bash
   npm run build
   ```

---

## Cómo Desplegar en Vercel con tu Cuenta de Google

### Enlace directo para iniciar sesión en Vercel:
👉 **[Iniciar sesión en Vercel con Google](https://vercel.com/login)**

### Pasos para subir el proyecto:

#### Opción 1: Desde la web de Vercel (Recomendada)
1. Abre [https://vercel.com/login](https://vercel.com/login) y selecciona **"Continue with Google"**.
2. Una vez dentro de tu panel de Vercel, haz clic en **"Add New..."** -> **"Project"**.
3. Conecta tu repositorio de GitHub / GitLab / Bitbucket donde subas la carpeta `landing`.
4. En **Root Directory**, selecciona la carpeta `landing`.
5. En **Framework Preset**, Vercel detectará automáticamente **Next.js**.
6. Haz clic en **Deploy**. ¡Tu landing estará en vivo en segundos con certificado SSL gratuito!

#### Opción 2: Usando Vercel CLI desde tu terminal
1. En tu terminal ejecuta:
   ```bash
   npx vercel login
   ```
2. Se abrirá una pestaña en tu navegador para que selecciones tu cuenta de Google.
3. Luego, entra en la carpeta `landing` y ejecuta:
   ```bash
   cd landing
   npx vercel
   ```
4. Sigue las instrucciones interactivas en pantalla (acepta los valores por defecto).

