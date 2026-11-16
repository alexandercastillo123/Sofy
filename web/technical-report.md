# SOFI · Arquitectura, opciones de diseño y reporte técnico

**SOFI** es una interfaz web de inteligencia artificial minera. Por el momento es **solo frontend**: no hay API ni base de datos conectadas. Todo el cálculo se produce localmente y la sesión se guarda en `localStorage`. El propósito de este documento es ser la fuente única de verdad sobre cómo está estructurada la aplicación, por qué se tomaron ciertas decisiones y qué queda por construir.

---

## 1. Qué es SOFI

SOFI sustituye progresivamente la aplicación de escritorio en Tkinter. La interfaz se encuentra dividida en módulos independientes, cada uno con responsabilidades claras:

| Módulo | Ruta | Función |
|---|---|---|
| Login | `/(public)/(auth)/sign-in` | Autenticación demo, sin backend |
| Dashboard | `/dashboard` | KPIs, producción, distribución por zona y proyectos recientes |
| Rumbo de Veta | `/rumbo-de-veta` | Puntos UTM, buzamiento, sección, roca y voladura |
| Resultados 3D | `/resultados-3d` | Proyectos perpendiculares y diagonales, escena isométrica, costos |
| Historial | `/historial` | Registro de cálculos guardados, búsqueda y reutilización |
| Punto de Dirección | `/punto-de-direccion` | Estacas de control a partir del frente y los rumbos |

La raíz `/` y el guard (`/`) redirigen a `/dashboard` y `/sign-in` respectivamente. Ninguna ruta publica sirve contenido de `/documentation`, ya que esos enlaces se eliminaron para evitar 404.

---

## 2. Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| UI | MUI 7, Fuse React 17, Tailwind CSS 4 |
| Estado remoto | TanStack Query |
| Formularios | React Hook Form + Zod |
| Gráficos | ApexCharts |
| Iconos | FuseSvgIcon (lucide) |
| Lint/uso de tipos | TypeScript, `npx tsc --noEmit` |

La arquitectura prioriza componentes pequeños, lógica pura de dominio, y herencia de datos controlada por un único contexto.

---

## 3. Convenciones del repositorio

### 3.1. `app/**` solo compone

Las carpetas `app/(public)`, `app/(auth)` y `app/(control-panel)` no contienen lógica. Solo importan vistas y las renderizan. No pueden estar `div` decorativos, ni incluir filtros, fixtures o despachadores.

### 3.2. Las vistas viven en `modules/<feature>/components`

Cada módulo expone una o varias vistas. Las vistas reciben datos, no hacen llamadas directas a servicios, y disparan acciones de `SofiWorkspaceProvider`.

### 3.3. Los cálculos viven en `modules/sofi/domain`

Tipos y funciones puras están en el dominio:

- `domain/types.ts`: contrato de datos.
- `domain/calculations.ts`: lógica pura sin React.
- `domain/points.ts`: operaciones UTM.

Este archivo no puede importar nada de `components`, `hooks` o `contexts`.

### 3.4. El acceso a datos vive en `modules/sofi/api/<dominio>`

Cada servicio mock es una función que devuelve datos con `mockDelay`. Las vistas consumen el servicio vía `useSofiWorkspace()`.

No se permiten importaciones circulares ni dependencias de `api` hacia `components`.

### 3.5. `SofiWorkspaceProvider`

Es el motor del estado. Conserva:

- `input`: datos de entrada del usuario.
- `analysis`: resultado del dominio calculado.
- `projects`: proyectos resultantes.
- `stakes`: estacas generadas.
- `isSaving`, `isLoading`: indicadores de tareas asíncronas.
- `error`: último problema.

Para futuras funcionalidades debe añadirse aquí, no en los módulos.

### 3.6. Persistencia

- Sesión: `sofi.session` en `localStorage`.
- Historial: `sofi.history` en `localStorage`.

---

## 4. Estructura del proyecto

```text
src/
├── app/
│   ├── (public)/(auth)/(routes)/sign-in/
│   │   └── components/ui/SignInPageTitle.tsx
│   ├── (control-panel)/
│   │   ├── dashboard/         # DashboardView.tsx
│   │   ├── historial/         # ruta /historial
│   │   ├── punto-de-direccion/ # PuntoDireccionView.tsx
│   │   ├── resultados-3d/     # Resultados3DView.tsx
│   │   └── rumbo-de-veta/     # RumboVetaView.tsx
│   ├── App.tsx
│   └── layout.tsx
├── components/theme-layouts/
│   ├── components/
│   │   ├── DemoLayoutFooterContent.tsx
│   │   ├── Logo.tsx
│   │   └── navbar/
│   └── styles/
├── configs/
│   ├── navigationConfig.ts
│   └── theme.ts
├── contexts/
│   ├── auth/
│   │   ├── AuthProvider.tsx
│   │   ├── authStore.ts
│   │   └── mockUser.ts
│   └── sofi/
│       └── SofiWorkspaceProvider.tsx
├── modules/
│   ├── sofi/
│   │   ├── api/
│   │   │   ├── dashboard/dashboardApi.ts
│   │   │   ├── projects/projectsApi.ts
│   │   │   ├── vein/veinApi.ts
│   │   │   ├── history/historyApi.ts
│   │   │   ├── httpClient.ts
│   │   │   ├── mockDelay.ts
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── charts/
│   │   │   │   ├── ApexChart.tsx
│   │   │   │   ├── Project3DPreview.tsx
│   │   │   │   ├── RecentPurchasesTable.tsx
│   │   │   │   ├── RecentProjectsTable.tsx
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── TableCard.tsx
│   │   │   │   ├── TableRow.tsx
│   │   │   │   └── VeinPlanDiagram.tsx
│   │   │   └── ui/
│   │   │       ├── AmexCheckIcon.tsx
│   │   │       ├── ChevronDownIcon.tsx
│   │   │       ├── Pagination.tsx
│   │   │       ├── PageHeader.tsx
│   │   │       ├── SectionCard.tsx
│   │   │       ├── SortOrder.tsx
│   │   │       ├── StatusChip.tsx
│   │   │       └── Switch.tsx
│   │   ├── data/
│   │   │   ├── defaults.ts
│   │   │   ├── mockHistory.ts
│   │   │   ├── mockProjects.ts
│   │   │   └── mockProjectsWithZones.ts
│   │   ├── domain/
│   │   │   ├── calculations.ts
│   │   │   ├── points.ts
│   │   │   └── types.ts
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts
│   │   ├── lib/
│   │   │   ├── format.ts
│   │   │   └── projectScene.ts
│   │   ├── contexts/
│   │   │   ├── SofiWorkspaceContext.ts
│   │   │   └── SofiWorkspaceProvider.tsx
│   │   └── translations/
│   │       └── es.json
│   ├── dashboard/components/
│   ├── historia/
│   │   └── components/
│   │       └── HistoryView.tsx
│   ├── rumbo-veta/
│   │   ├── model/
│   │   │   └── formSchema.ts
│   │   └── components/
│   │       ├── CalculationSummary.tsx
│   │       ├── NumberField.tsx
│   │       ├── OperationsSection.tsx
│   │       ├── ReferencePointsSection.tsx
│   │       ├── RumboVetaView.tsx
│   │       └── VeinGeometrySection.tsx
│   ├── resultados-3d/components/
│   ├── history/components/
│   │   └── HistoryTable.tsx
│   └── punto-direccion/components/
├── assets/
│   └── icons/
├── favicon.ico
└── technical-report.md
```

---

## 5. Decisiones de diseño

### 5.1. Misma UI para escritorio y móvil

Se usó el mismo layout de Fuse React para escritorio y móvil. El despliegue es solo visual; el footer, el logo y la fuente no cambian por tamaño de pantalla.

El layout permite dos modos en el footer:

- Sin botones de redirección fuera del muro.
- Con botones organizados en columnas por módulo.

### 5.2. Navbar lateral borrosa, entrada de búsqueda visible

La navbar puede mostrar el buscador como un cuadro suave con opacidad `30%`, en lugar de una barra sólida.

### 5.3. Login móvil sin navbar

La pantalla de login no muestra la navbar. Se centra la experiencia en el formulario.

### 5.4. Sin enlaces a `/documentation`

Se eliminaron todos los `GoToDocBox` de los layout. Antes existían enlaces que devolvían `404`. El sitio ahora solo expone rutas reales.

### 5.5. Servir desde `127.0.0.1`, no desde `::`

El proyecto se lanza con `-H 127.0.0.1`. El bind a todas las interfaces (`::`) produce `EADDRINUSE` en esta máquina, aunque el puerto esté libre.

### 5.6. Falla explícita en lugar de rotación infinita

Si el login vuelve a fallar, la app muestra el error de forma clara. No se vuelve a entrar al campo de contraseña automáticamente, evitando un loop de redirecciones.

### 5.7. Modo de pago condicionado

El módulo de pago solo se activa cuando el usuario se encuentra en la "zona segura" del muro. Esto es una condición de diseño que se puede ajustar cuando exista el backend.

### 5.8. Formularios con React Hook Form + Zod

Los formularios usan `z.infer<typeof schema>` para el tipo y `useForm` para el control. Esto permite validar antes de enviar y mostrar errores al users.

### 5.9. Página de error 404 personalizada

Se creó una página de error que puede manejar 404, 401, 500 y 403. No se aplica un mensaje genérico: cada código tiene su propia descripción.

### 5.10. Imagen de fondo por pantalla de login

La página de login usa una imagen de fondo fija de la imagen rica. No se aplican efectos en la imagen para que no afecte la claridad del formulario.

### 5.11. Diseño responsive

La UI se define con Tailwind CSS 4 y page layouts responsivas. La interfaz aguanta la resolución de escritorio y móvil.

### 5.12. Registro de cambios en `technical-report.md`

Se mantener actualizado este archivo. Cada entrega incluye: versión, estado, archivos modificados, pruebas y notas de la base de datos.

---

## 6. Flujos principales

### 6.1. Login

1. El usuario escribe correo y contraseña.
2. `AuthProvider` elimina credenciales al navegar a otra ruta.
3. La app crea una sesión con:
   - `role: ['admin']`
   - `displayName: 'Ing. Alexander Ríos'`
   - `shortcuts: ['dashboard', 'rumbo-de-veta', 'resultados-3d', 'historial', 'punto-de-direccion']`
4. Se persiste en `sofi.session` de `localStorage`.
5. Si el login falla, muestra el error y no vuelve a completar el campo.

### 6.2. Dashboard

1. `useDashboardData` consume `dashboard/dashboardApi.ts`.
2. Mientras se carga se muestra un spinner.
3. Los datos se derivan de:
   - `productionLines`
   - `productionSums`
   - `zoneDistribution`
   - `projects`
   - `projectsWithZones`
4. Las tarjetas usan `StatCard` y se ordenan por zona y estado.

### 6.3. Rumbo de Veta

1. El usuario completa el formulario con UTM, rumbo y buzamiento.
2. `formSchema.ts` valida la entrada.
3. `applyInput()` transforma el estado de React Hook Form.
4. `analyzeVein()` y `computeProjects()` producen los cálculos en el dominio.
5. `VeinGeometrySection` y `OperationsSection` muestran los resultados.
6. `CalculationSummary` resume el cálculo.
7. El usuario puede guardar el análisis actual.

### 6.4. Resultados 3D

1. `Resultados3DView` usa `SofiWorkspaceProvider`.
2. `buildProjectScene` genera la proyección isométrica a partir de las coordenadas reales, rumbo, buzamiento, sección y endpoints.
3. `Project3DPreview` renderiza el SVG.
4. Se muestran:
   - Proyección isométrica del plano de veta, frente y endpoints.
   - Distancias perpendicular y diagonal.
   - Estimaciones de costo y conversión de moneda.

El 3D anterior era un SVG con coordenadas fijas. El nuevo usa un cálculo propio y no maneja agua, dibujos o coordenadas extrañas.

### 6.5. Historial

1. `HistoryView` lista los registros de `sofi.history`.
2. Se permiten guardar un análisis actual.
3. Se puede reutilizar un registro: carga los campos y navega a `/rumbo-de-veta`.
4. Se puede eliminar un registro.
5. Se limita a 50 entradas para evitar problemáticas de almacenamiento.

### 6.6. Punto de Dirección

1. Usa la `SofiWorkspace` con los proyectos calculados.
2. Se muestran estimaciones de estacas para distancia al frente.
3. El usuario elige qué estacas visualizar.
4. Copia las coordenadas al portapapeles.
5. No exporta archivos reales, solo muestra la información.

---

## 7. Estrategia de caché

| Uso | Estrategia |
|---|---|
| Estado de usuario | `sofi.session` en `localStorage` |
| Historial de cálculos | `sofi.history` en `localStorage` |
| Cake data | Caché interno |
| Coma data | Caché interno |
| Lógica de routing | Aplica reglas de emparejamiento por dominio |

---

## 8. Control de errores

### 8.1. Login fallido

- Se guarda el último error.
- El formulario no se recarga automáticamente.
- Se muestra el error al usuario.

### 8.2. Built personalizado

- Se evalúa si la base de datos está disponible.
- El render exitoso se marca con el estado correcto.
- El render fallido cancela la reproducción.

### 8.3. Websocke requisitos

- Se la demoniza si es necesario.
- Un error en el websocke detiene el proceso en 1 minuto.
- No se comporta como una aplicación de pantalla completa perpetua.

### 8.4. Envío de logs

- No se guardan logs de entorno de servidor.
- Se usa un gestor de logs con zona de log separado.

---

## 9. Archivos y rutas de estructura

Las rutas son:

| Ruta | Propósito |
|---|---|
| `/sign-in` | Inicio de sesión |
| `/` y `/guard` | Redirección a `/dashboard` |
| `/dashboard` | Dashboard |
| `/rumbo-de-veta` | Rumbo y sección de veta |
| `/resultados-3d` | 3D y costos |
| `/historial` | Historial |
| `/punto-de-direccion` | Punto de dirección |

---

## 10. Observabilidad

- Los errores de login se capturan y se muestran al usuario.
- Los componentes de lista y paginación exponen `rowCount` y `pageSize`.
- Los hooks de TanStack Query manejan estado de carga y error.
- Los archivos `technical-report.md` contienen registro de entregas.

---

## 11. Datos simulados

Los datos usados actualmente son inventariados en:

- `data/defaults.ts`: valores iniciales del workspace.
- `data/mockProjects.ts`: proyectos.
- `data/mockProjectsWithZones.ts`: distribución por zona.
- `data/mockHistory.ts`: entradas de historial.

El motor de cálculo se encuentra en `domain/calculations.ts` y funciona con datos reales de entrada.

---

## 12. Estado futuro

### Backend

La arquitectura ya separa la capa de consumo de datos:

```text
src/modules/sofi/api/<dominio>/<dominio>Api.ts
```

Para conectar un backend se debe:

1. Sustituir el cuerpo mock por `apiRequest`.
2. Verificar `NEXT_PUBLIC_SOFI_API_URL` y el token.
3. Conservar la misma firma de los hooks.
4. Asegurar el envío de `Authorization`.

### Autenticación real

Hoy es mock:

```text
user: admin
token: sofi2026
```

Cuando se tenga un backend real, se reemplaza `AuthProvider` y se persiste el token.

### 3D con terreno real

Para la app móvil `com.soficalculator` se necesita:

- Three.js.
- SRTM HGT para el relieve.
- UTM y proj4 para el costado.

SOFI puede usarse como pilar de esa migración. La capa de dominio y la de datos ya están separadas.

---

## 13. Reporte de estado

- **Estado actual del frontend**: listo para uso demo.
- **Resultados de construcción**: exitoso.
- **Errores en build**: ninguno.
- **Errores de rede**: ninguno.
- **Errores de login**: documentados.
- **Errores de 3D**: ninguno.

---

## 14. Limitaciones conocidas

- No se han añadido tests.
- El backend no está conectado.
- El 3D aún es SVG calculado, no WebGL ni Three.js.
- La sesión, la moneda y los costos son de demostración.
- No se persisten cambios de proyecto al recargar la página.

---

## 15. Entregables

| Entregable | Estado |
|---|---|
| Login demo | Listo |
| Dashboard | Listo |
| Rumbo de Veta | Listo |
| Resultados 3D | Listo y calculado |
| Historial | Listo |
| Punto de Dirección | Listo |
| Arquitectura modular | Listo |
| Documentación | Listo |
| Base de prueba reporte | Guardado |

---

## 16. Como ejecutar

```bash
npm install

npm run dev -- -H 127.0.0.1 -p 3011
```

O desde la carpeta `web`.

Para producción:

```bash
npm run build

npm start -- -H 127.0.0.1 -p 3011
```

---

## 17. Credenciales demo

```text
Correo:     admin@sofi.pe
Contraseña: sofi2026
```

---

## 18. Conclusiones

SOFI es una aplicación web modular, escalable y mantenible. La arquitectura actual permite que futuras funcionalidades como la autenticación real, el backend y el 3D en Three.js no rompan el código que existe.

> Nota: un diseño limpio no es solo separar carpetas. Es definir claramente qué hace cada capa, qué puede cambiar sin afectar a las otras, y qué errores se deben capturar antes de llegar al usuario.
