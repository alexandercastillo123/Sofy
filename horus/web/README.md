# HORUS · Frontend

Interfaz web de HORUS (Inteligencia Artificial Minera), construida sobre **Fuse React 17**
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

### Credenciales demo

```
Correo:      admin@horus.pe
Contraseña:  horus2026
```

El formulario viene precargado; también existe el botón **Usar credenciales demo**.

## Rutas

| Ruta | Módulo |
| --- | --- |
| `/sign-in` | Login (mock, sin backend) |
| `/dashboard` | KPIs, producción, distribución por zona y proyectos recientes |
| `/rumbo-de-veta` | Puntos UTM, buzamiento, sección, roca y voladura |
| `/resultados-3d` | Proyecto perpendicular vs. diagonal, costos y conversión de moneda |
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
│   │   └── punto-de-direccion/page.tsx
│   ├── App.tsx                             # providers globales
│   └── layout.tsx
├── components/theme-layouts/               # layout Fuse (navbar, toolbar, footer)
├── configs/                                # navegación, tema y settings
├── contexts/
│   └── auth/                               # AuthContext + AuthProvider + useAuth
├── modules/
│   ├── horus/
│   │   ├── domain/                         # tipos + cálculos puros
│   │   ├── data/                           # defaults y datos mock
│   │   ├── api/                            # servicio mock (futuro HTTP client)
│   │   ├── hooks/                          # TanStack Query
│   │   ├── contexts/                       # workspace compartido
│   │   ├── components/ui/                  # primitivas reutilizables
│   │   ├── components/charts/              # SVG + ApexCharts
│   │   └── lib/                            # formato de números/fechas/moneda
│   ├── dashboard/components/
│   ├── rumbo-veta/components/
│   ├── resultados-3d/components/
│   └── punto-direccion/components/
└── @auth/                                  # adaptador useUser para Fuse
```

### Reglas de dependencia

1. `app/**` solo compone: importa una vista y la renderiza.
2. Las vistas viven en `modules/<feature>/components`.
3. Los cálculos viven en `modules/horus/domain` y son funciones puras, sin React.
4. El acceso a datos vive en `modules/horus/api`; los hooks de TanStack Query lo consumen.
5. `HorusWorkspaceProvider` conserva el último análisis para que Rumbo de Veta, Resultados 3D y
   Punto de Dirección compartan exactamente los mismos números.

```txt
sign-in → AuthProvider (mock session)
Rumbo de Veta → applyInput() → analyzeVein() + computeProjects()
Resultados 3D / Punto de Dirección ← useHorusWorkspace()
Dashboard ← useDashboardData() → horusApi.fetchDashboardData()
```

## Conectar el backend más adelante

- Reemplaza el cuerpo de `src/modules/horus/api/horusApi.ts` por llamadas HTTP (por ejemplo `ky`,
  que ya está instalado). La firma de las funciones y los hooks no cambia.
- Reemplaza `signIn` en `src/contexts/auth/AuthProvider.tsx` por la llamada real y persiste el token.
- Los tipos de `src/modules/horus/domain/types.ts` son el contrato sugerido para la API.
- `HorusWorkspaceProvider` sigue siendo el lugar donde guardar el análisis seleccionado.

## Datos simulados

- Proyectos: `src/modules/horus/data/mockProjects.ts`
- Valores iniciales del workspace: `src/modules/horus/data/defaults.ts`
- El motor local (`domain/calculations.ts`) calcula rumbo, azimut, zonas, áreas, volúmenes,
  tonelaje, disparos, duración, costos y estacas a partir de la geometría ingresada.
- No se persisten cambios de proyecto: al recargar vuelven los valores demo (salvo la sesión).
