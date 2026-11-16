# SOFI · Frontend

Interfaz web de SOFI (Inteligencia Artificial Minera), construida sobre **Fuse React 17**
(Next.js + MUI) y pensada para reemplazar progresivamente la aplicación de escritorio en Tkinter.

> Esta entrega es **solo frontend**: no hay API ni base de datos. Toda la información se resuelve
> con datos simulados y un motor de cálculo local. La sesión se guarda en `localStorage`.

## Stack

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| UI | MUI 7, Fuse React 17, Tailwind CSS 4 |
| Estado remoto | TanStack Query |
| Formularios | React Hook Form + Zod |
| Gráficos | ApexCharts |
| Iconos | FuseSvgIcon (lucide, servidos desde `public/assets/icons`) |

## Ejecutar

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`. La raíz redirige a `/dashboard` y el guard redirige a `/sign-in`
si no hay sesión.

Si Windows reporta `EADDRINUSE` al escuchar en `:::3000`, fuerza loopback IPv4:

```bash
npm run dev -- -H 127.0.0.1 -p 3011
```

### Credenciales demo

```
Correo:      admin@sofi.pe
Contraseña:  sofi2026
```

El formulario viene precargado; también existe el botón **Usar credenciales demo**.

## Rutas

| Ruta | Módulo |
| --- | --- |
| `/sign-in` | Login (mock, sin backend) |
| `/dashboard` | KPIs, producción, distribución por zona y proyectos recientes |
| `/rumbo-de-veta` | Puntos UTM, buzamiento, sección, roca y voladura |
| `/resultados-3d` | Proyecto perpendicular vs. diagonal, escena isométrica, costos y moneda |
| `/historial` | Cálculos guardados, búsqueda y reutilización de entradas anteriores |
| `/punto-de-direccion` | Estacas a 5, 7 o 10 m, coordenadas y exportación simulada |

## Estructura

```txt
src/
├── app/
│   ├── (public)/(auth)/(routes)/sign-in/   # única ruta pública
│   ├── (control-panel)/                    # layout protegido + rutas de módulos
│   │   ├── dashboard/page.tsx
│   │   ├── rumbo-de-veta/page.tsx
│   │   ├── resultados-3d/page.tsx
│   │   ├── historial/page.tsx
│   │   └── punto-de-direccion/page.tsx
│   ├── App.tsx                             # providers globales
│   └── layout.tsx
├── components/theme-layouts/               # layout Fuse (navbar, toolbar, footer)
├── configs/                                # navegación, tema y settings
├── contexts/
│   └── auth/                               # AuthContext + AuthProvider + useAuth
├── modules/
│   ├── sofi/
│   │   ├── domain/                         # tipos + cálculos puros
│   │   ├── data/                           # defaults, proyectos e historial mock
│   │   ├── api/                            # clientes mock por dominio
│   │   │   ├── dashboard/dashboardApi.ts
│   │   │   ├── projects/projectsApi.ts
│   │   │   ├── vein/veinApi.ts
│   │   │   ├── history/historyApi.ts
│   │   │   └── httpClient.ts               # transporte HTTP futuro
│   │   ├── hooks/                          # TanStack Query
│   │   ├── contexts/                       # workspace + historial persistente
│   │   ├── components/ui/                  # primitivas reutilizables
│   │   ├── components/charts/              # SVG + ApexCharts
│   │   └── lib/                            # formato, historial y escena 3D
│   ├── dashboard/components/               # métricas, tabla y último análisis
│   ├── rumbo-veta/
│   │   ├── model/formSchema.ts             # Zod + conversión de formulario
│   │   └── components/                     # secciones pequeñas + orquestador
│   ├── resultados-3d/components/
│   ├── history/components/                 # vista y tabla del historial
│   └── punto-direccion/components/
└── @auth/                                  # adaptador useUser para Fuse
```

### Reglas de dependencia

1. `app/**` solo compone: importa una vista y la renderiza.
2. Las vistas viven en `modules/<feature>/components`.
3. Los cálculos viven en `modules/sofi/domain` y son funciones puras, sin React.
4. El acceso a datos vive en `modules/sofi/api/<dominio>`; los hooks de TanStack Query lo consumen.
5. `SofiWorkspaceProvider` conserva el último análisis para que Rumbo de Veta, Resultados 3D,
   Historial y Punto de Dirección compartan exactamente los mismos números.
6. El historial se persiste en `localStorage` (`sofi.history`) y guarda una copia completa de las
   entradas para poder reutilizarlas sin depender de la sesión actual.

```txt
sign-in → AuthProvider (mock session)
Rumbo de Veta → applyInput() → analyzeVein() + computeProjects()
Resultados 3D / Punto de Dirección ← useSofiWorkspace()
Dashboard ← useDashboardData() → api/dashboard/dashboardApi.ts
Historial ← SofiWorkspaceProvider (localStorage) → api/history/historyApi.ts (listo, sin conectar)
```

## Escena 3D

`src/modules/sofi/lib/projectScene.ts` construye una proyección isométrica real a partir de las
coordenadas UTM, el rumbo, el buzamiento, la sección y los endpoints de ambos proyectos. No es un
motor WebGL: es SVG calculado, suficiente para la vista de escritorio y sin dependencias nuevas.

Para una escena tipo app móvil (Three.js + relieve SRTM) habría que añadir un renderer WebGL y
cargar las teselas HGT; la capa de cálculo y el contrato de datos ya están separados.

## Conectar el backend más adelante

- Cada consumidor está aislado en `src/modules/sofi/api/<dominio>`. Sustituye el cuerpo mock por
  `apiRequest(...)` usando `httpClient.ts`; las firmas y las vistas no cambian.
- `NEXT_PUBLIC_SOFI_API_URL` y el token en `sofi.accessToken` son la configuración prevista.
- Reemplaza `signIn` en `src/contexts/auth/AuthProvider.tsx` por la llamada real y persiste el token.
- Los tipos de `src/modules/sofi/domain/types.ts` son el contrato sugerido para la API.

## Datos simulados

- Proyectos: `src/modules/sofi/data/mockProjects.ts`
- Historial inicial: `src/modules/sofi/data/mockHistory.ts`
- Valores iniciales del workspace: `src/modules/sofi/data/defaults.ts`
- El motor local (`domain/calculations.ts`) calcula rumbo, azimut, zonas, áreas, volúmenes,
  tonelaje, disparos, duración, costos y estacas a partir de la geometría ingresada.
- No se persisten cambios de proyecto: al recargar vuelven los valores demo (salvo la sesión).
