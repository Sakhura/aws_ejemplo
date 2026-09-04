# Laboratorios guiados con estado real — diseño

**Fecha:** 2026-09-04
**Estado:** Aprobado por el usuario, pendiente de implementación

## 1. Problema y motivación

`Nube Académica` es una maqueta educativa de IAM. Hoy, tanto el directorio
`/aprendizaje/laboratorios` como las páginas de IAM (Usuarios, Grupos, Roles,
Políticas) son **decorativas**: leen arrays estáticos de
`src/data/sampleData.js`, los botones "Crear..." no hacen nada, y el
progreso de cada laboratorio ("5 de 5 comprobaciones", "Bloqueado · requiere
el laboratorio 03") es texto fijo, no una verificación real.

El objetivo de este trabajo es convertir los 6 laboratorios guiados en
ejercicios **funcionales**: el estudiante crea usuarios, grupos, políticas y
roles de verdad dentro del simulador, y cada laboratorio comprueba en vivo,
contra ese estado real, si las tareas están completas — sin que nadie tenga
que marcar nada a mano.

Este documento cubre únicamente esta pieza. No decide contenido de más
módulos del curso ("Módulo 11" queda fuera de alcance).

## 2. Alcance

**Dentro de alcance:**
- Un store de estado compartido para usuarios, grupos, políticas, roles y
  progreso de laboratorios, persistido en `localStorage`.
- CRUD completo (crear/editar/eliminar) en Usuarios, Grupos, Roles y
  Políticas, conectado a ese store.
- Una página de listado de Usuarios nueva (hoy no existe; solo existe el
  wizard de creación).
- Un motor de evaluación de políticas IAM (Allow/Deny/Deny implícito, con
  soporte mínimo de `Condition: aws:MultiFactorAuthPresent`).
- Un Simulador de políticas, accesible desde Políticas.
- Un framework genérico de laboratorios: candados dinámicos, progreso
  calculado en vivo, comprobaciones reactivas al estado.
- Las 6 comprobaciones concretas de cada uno de los 6 laboratorios
  existentes (01 a 06).

**Fuera de alcance (explícitamente, para esta iteración):**
- Persistencia en un backend real (todo sigue siendo `localStorage`, en
  línea con "toda la información vive solo en el navegador" del README).
- El lenguaje `Condition` completo de IAM (solo la clave de MFA).
- Autenticación real o multiusuario — un único "estudiante" por navegador,
  igual que hoy.
- Contenido de nuevos módulos del curso (Módulo 11 en adelante).

## 3. Arquitectura del estado

**Decisión: React Context + `useReducer`, sin librerías nuevas.**

El proyecto no usa hoy ninguna librería de estado (solo `react`,
`react-dom`, `react-router-dom`). Se descarta traer Zustand u otra
alternativa externa para no romper la consistencia del código existente ni
añadir una dependencia nueva solo para esto.

- `src/state/iamStore.jsx` — `IamProvider` (Context + reducer) montado en la
  raíz de `App.jsx`, por fuera de `<Routes>`. Expone un hook `useIamStore()`
  que retorna `{ state, dispatch }`, y hooks de conveniencia (`useUsers()`,
  `useGroups()`, etc.) que memorizan selectores simples sobre `state`.
- Cada cambio de estado se serializa a `localStorage` (clave
  `nube-academica:iam-state`) dentro del reducer (o en un `useEffect` que
  observa `state`); al montar, `IamProvider` hidrata desde `localStorage` si
  existe, o desde un estado inicial vacío (sin usuarios/grupos/políticas de
  ejemplo, salvo los que cada laboratorio necesite precargar — ver §7).
- La lógica de dominio (validar antes de crear un grupo, calcular si un
  laboratorio está desbloqueado, etc.) vive en funciones puras separadas del
  reducer, en `src/state/iamLogic.js`, siguiendo el patrón ya usado en
  `src/pages/UsuariosCrear/wizardLogic.js`. El reducer llama a esas
  funciones; los componentes no contienen lógica de dominio.

### Acciones del reducer (lista no exhaustiva, ampliable en implementación)

`CREATE_USER`, `UPDATE_USER`, `DELETE_USER`, `DOWNLOAD_CREDENTIALS`,
`CREATE_GROUP`, `UPDATE_GROUP`, `DELETE_GROUP`, `ADD_USER_TO_GROUP`,
`REMOVE_USER_FROM_GROUP`, `CREATE_POLICY`, `UPDATE_POLICY`,
`DELETE_POLICY`, `ATTACH_POLICY` (a usuario, grupo o rol),
`DETACH_POLICY`, `CREATE_ROLE`, `UPDATE_ROLE`, `DELETE_ROLE`,
`ASSUME_ROLE`, `EXPIRE_ROLE_SESSION`, `ENABLE_MFA`, `DISABLE_MFA`,
`SET_LAB_CHECK` (deriva progreso; ver §7 — en la práctica los checks se
recalculan leyendo el estado, esta acción es solo para cachear el resultado
si hiciera falta optimizar).

## 4. Modelo de datos

```js
{
  users: {
    [username]: {
      username,
      courseTag: string,
      accessType: 'console' | 'programmatic',
      password: string | null,
      requirePasswordReset: boolean,
      mfaEnabled: boolean,
      accessKey: { accessKeyId, secretAccessKey } | null,
      credentialsDownloaded: boolean,
      groups: string[],     // ids de grupo — espejo de groups[].members
      policies: string[],   // ids de política adjunta directamente
      createdAt: string,    // ISO
    }
  },
  groups: {
    [groupId]: {
      id, name, desc,
      policies: string[],   // ids de política adjunta al grupo
      members: string[],    // usernames — fuente de verdad de membresía
      createdAt,
    }
  },
  policies: {
    [policyId]: {
      id, name,
      type: 'Administrada' | 'Propia del curso',
      document: {           // JSON real de la política
        Version: '2012-10-17',
        Statement: [{ Sid?, Effect: 'Allow'|'Deny', Action: string|string[],
                       Resource: string|string[], Condition?: object }]
      },
      createdAt,
    }
  },
  roles: {
    [roleId]: {
      id, name,
      trustPolicy: { Effect, Principal, Action: 'sts:AssumeRole' },
      policies: string[],
      maxDurationMinutes: number,
      activeSession: { accessKeyId, secretAccessKey, sessionToken, expiresAt } | null,
    }
  },
  labs: {
    [labId]: { checks: { [checkId]: boolean }, startedAt?, completedAt? }
  }
}
```

Invariantes que el reducer debe mantener:
- `users[u].groups` y `groups[g].members` siempre en sincronía (una sola
  acción `ADD_USER_TO_GROUP`/`REMOVE_USER_FROM_GROUP` actualiza ambos
  lados).
- Eliminar una política (`DELETE_POLICY`) la desadjunta de cualquier
  usuario/grupo/rol que la tuviera.
- Eliminar un grupo (`DELETE_GROUP`) limpia `groups` de la lista de todos
  sus miembros.

`labs[labId].checks` se recalcula leyendo el resto del estado cada vez que
cambia (ver §7) — no es la fuente de verdad de si una tarea está hecha, es
un resultado derivado. El candado de un laboratorio y su % de progreso
**nunca** se leen de un booleano guardado a mano.

## 5. Motor de evaluación de políticas

`src/state/policyEngine.js`, funciones puras, sin dependencia de React ni
del store:

```js
evaluate({ principal, action, resource, state }) => {
  effect: 'Allow' | 'Deny',
  reason: 'explicit-deny' | 'allow' | 'implicit-deny',
  matchedStatements: [{ policyId, policyName, statement }]
}
```

Algoritmo:
1. Reunir todos los `Statement` aplicables al `principal`:
   - Si es un usuario: sus políticas propias + las de cada grupo al que
     pertenece.
   - Si es un rol: sus políticas de permisos (no la trust policy, que solo
     decide quién puede asumirlo).
2. Filtrar los statements cuyo `Action` y `Resource` matcheen (comodines
   simples tipo `s3:*`, `arn:aws:s3:::bucket/*` — coincidencia por prefijo
   antes de `*`, sin implementar el lenguaje de comodines IAM completo).
3. De los que matchean: si **alguno** es `Effect: Deny` **y** (no tiene
   `Condition`, o su `Condition.aws:MultiFactorAuthPresent` coincide con
   `principal.mfaEnabled`) → `Deny` explícito, se corta ahí.
4. Si no hay Deny aplicable pero **algún** `Allow` matchea (con la misma
   regla de `Condition` de MFA) → `Allow`.
5. Si nada matchea → `Deny` implícito.

`Condition.aws:MultiFactorAuthPresent` es la única clave de `Condition`
soportada (§2, fuera de alcance el resto del lenguaje `Condition`).

**Simulador de políticas** — página nueva `src/pages/PolicySimulator.jsx`,
ruta `iam/politicas/simulador`, enlazada desde un botón en `Politicas.jsx`.
Formulario: Principal (selector de usuario o rol existente), Action
(texto), Resource (texto), y un modo "usar sus políticas adjuntas reales"
(por defecto) o "probar un JSON de política suelto" (pega un documento sin
guardarlo, útil para el Laboratorio 03 antes de crear la política
definitiva). Resultado: `Allow`/`Deny` grande, y debajo qué statement
concreto decidió — mismo componente para uso libre y para las
comprobaciones del Laboratorio 03 y 05, que llaman a `evaluate()`
directamente sobre el estado real en vez de reimplementar la lógica.

## 6. Framework de laboratorios

- Ruta nueva `aprendizaje/laboratorios/:labId` → `LaboratorioDetalle.jsx`
  (un único componente genérico, no uno por laboratorio).
- `src/data/labDefinitions.js` — array de 6 definiciones declarativas:

```js
{
  id: '02',
  title: 'Permisos por grupo, no por persona',
  duration: '20 min',
  requires: [],                // ids de labs previos que deben estar 100% completos
  intro: '...',                // texto de contexto (mismo tono que las clases del curso)
  steps: [{ title, body }],    // instrucciones numeradas, sin verificación propia
  seed: (dispatch, state) => { /* opcional: precarga un escenario roto (Lab 05) */ },
  checks: [
    { id: 'grupo-existe', label: 'Existe el grupo practicas-lectura',
      verify: (state) => Object.values(state.groups).some(g => g.name === 'practicas-lectura') },
    // ...
  ],
}
```

- `Laboratorios.jsx` (directorio) deja de leer `sampleData.labs`: por cada
  definición calcula `checks.filter(passing).length / checks.length`,
  estado (`Sin empezar` / `En curso` / `Completado`), y si está bloqueado
  (`requires` no cumplidos al 100%). Las tarjetas pasan a ser `<Link>` reales
  hacia `LaboratorioDetalle`.
- `LaboratorioDetalle.jsx`: muestra `intro` + `steps`, y una barra lateral
  con la lista de `checks` — cada uno se recalcula contra `state` en cada
  render (usa el store de §3 directamente, sin botón "verificar"). Al entrar
  por primera vez a un laboratorio con `seed`, si el escenario no existe
  aún en el estado, lo crea (idempotente: no duplica si ya se corrió).

## 7. Comprobaciones por laboratorio

| Lab | # | Comprobación |
|---|---|---|
| **01** Crear tu primer usuario IAM | 1 | Usuario creado |
| | 2 | Nombre de usuario válido (formato) |
| | 3 | Contraseña cumple la política de la cuenta |
| | 4 | "Requerir cambio de contraseña" activado |
| | 5 | Credenciales `.csv` descargadas |
| **02** Permisos por grupo, no por persona | 1 | Grupo `practicas-lectura` existe |
| | 2 | Política `LecturaS3` adjunta al grupo |
| | 3 | ≥2 usuarios son miembros del grupo |
| | 4 | Ningún usuario tiene `LecturaS3` adjunta directamente |
| | 5 | `evaluate()` confirma `Allow` para `s3:GetObject` de un miembro vía el grupo |
| **03** Escribir una política desde cero | 1 | JSON de la política es válido |
| | 2 | Contiene `Allow` sobre lectura (`GetObject`/`ListBucket`) del bucket de prácticas |
| | 3 | Contiene `Deny` explícito sobre `DeleteObject` |
| | 4 | Simulador: acción de lectura → `Allow` |
| | 5 | Simulador: acción de borrado → `Deny` |
| **04** Asumir un rol temporal | 1 | Rol creado |
| | 2 | Trust policy correcta (`Principal` + `sts:AssumeRole`) |
| | 3 | Política de permisos adjunta al rol (no vacía) |
| | 4 | Rol asumido (`activeSession` generado) |
| | 5 | La sesión activa tiene `expiresAt` en el futuro (no permanente) |
| **05** Depurar un acceso denegado | seed | Precarga usuario+grupo+política con `Deny` explícito sobre `s3:PutObject` |
| | 1 | El Simulador se usó para localizar el statement que deniega |
| | 2 | Ese `Deny` fue corregido o eliminado |
| | 3 | `evaluate()` confirma ahora `Allow` para `s3:PutObject` |
| | 4 | El resto de permisos del usuario no se amplió más allá de lo necesario |
| **06** Activar la verificación en dos pasos | 1 | MFA activado en el usuario |
| | 2 | Simulador: acción sensible con `Condition aws:MultiFactorAuthPresent` → `Deny` sin MFA |
| | 3 | La misma acción → `Allow` con MFA activo |
| | 4 | Identificó una acción que NO cambia con MFA (sigue igual con o sin) |

Nota sobre la comprobación 1 de los labs 03 y 05 ("se usó el Simulador"):
como el store no registra un historial de interacciones, esta
comprobación se aproxima verificando que el usuario **guardó/editó** la
política correspondiente después de que el escenario se precargó — no un
registro literal de "abrió el Simulador". Se documenta como aproximación
conocida, no como ambigüedad a resolver en implementación.

## 8. Estructura de archivos

```
src/state/
  iamStore.jsx         Context + reducer + hooks (useIamStore, useUsers, ...)
  iamLogic.js           Funciones puras de dominio (validaciones, cálculo de candados)
  policyEngine.js        evaluate() / matchStatement(), sin dependencias de React
src/data/
  labDefinitions.js       6 laboratorios: intro, steps, checks, seed()
  sampleData.js            se recorta: quita labs/groups/roles/policies estáticos
                             que pasan a vivir en el store; conserva glossary,
                             commonErrors y los catálogos de referencia
                             (availableGroups/availablePolicies del wizard,
                             que siguen siendo "catálogo disponible para elegir",
                             no "recursos ya creados")
src/pages/
  Usuarios.jsx              NUEVO — listado de usuarios (editar/eliminar)
  UsuariosCrear/UsuariosCrear.jsx   se conecta a CREATE_USER en vez de estado local únicamente
  Grupos.jsx                  CRUD real
  Roles.jsx                    CRUD real + "Asumir rol"
  Politicas.jsx                  CRUD real + enlace al Simulador
  PolicySimulator.jsx              NUEVO
  Laboratorios.jsx                  lee del store, candados/progreso derivados
  LaboratorioDetalle.jsx              NUEVO — runner genérico
```

`App.jsx` gana las rutas: `iam/usuarios` (listado), `iam/politicas/simulador`,
`aprendizaje/laboratorios/:labId`. Y envuelve el árbol con `<IamProvider>`.

## 9. Fases de entrega

Cada fase termina en un commit funcional (la app no debe quedar rota entre
fases). Sin aprobación intermedia salvo que el alcance cambie.

1. **Motor de estado** — `iamStore.jsx`, `iamLogic.js`, persistencia en
   `localStorage`. Sin tocar todavía ninguna página existente.
2. **CRUD real** — Usuarios (listado nuevo + wizard conectado), Grupos,
   Roles, Políticas, todos leyendo/escribiendo el store real.
3. **Motor de políticas + Simulador** — `policyEngine.js` y
   `PolicySimulator.jsx`.
4. **Framework de laboratorios** — `labDefinitions.js` con las 6
   comprobaciones de §7, `LaboratorioDetalle.jsx`, `Laboratorios.jsx`
   reescrito para candados/progreso dinámicos.

## 10. Fuera de alcance / decisiones explícitas ya tomadas

- No se agrega ninguna librería de estado externa.
- Todo el estado vive en `localStorage` del navegador; no hay backend.
- El lenguaje `Condition` de IAM se soporta solo para
  `aws:MultiFactorAuthPresent` — nada más.
- No se construye contenido de un "Módulo 11"; ese tema queda
  explícitamente fuera de esta iteración.
