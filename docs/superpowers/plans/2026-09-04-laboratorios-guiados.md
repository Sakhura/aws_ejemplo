# Laboratorios guiados con estado real — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the 6 "Laboratorios guiados" from static/decorative cards into functional exercises backed by real, persisted IAM state (users, groups, policies, roles), with a policy evaluation engine, a Policy Simulator, and live-recalculated checks/locks/progress.

**Architecture:** A single React Context + `useReducer` store (`src/state/`) holding all IAM resources, persisted to `localStorage`. Pure, framework-free modules (`iamReducer.js`, `iamLogic.js`, `policyEngine.js`) carry all domain logic and are unit-tested with Vitest. Pages (Usuarios, Grupos, Roles, Políticas) become real CRUD screens reading/writing that store. A generic `LaboratorioDetalle.jsx` runner interprets declarative lab definitions (`src/data/labDefinitions.js`) and recomputes pass/fail live against the store — no manual "verify" step, no hardcoded progress.

**Tech Stack:** React 19, react-router-dom 7, Vite 8. Adds Vitest (dev-only, no new runtime dependency) to unit-test the pure logic modules — this is a new devDependency; everything else reuses what's already in the project.

**Spec:** `docs/superpowers/specs/2026-09-04-laboratorios-guiados-design.md`

## Global Constraints

- No new runtime dependency beyond `vitest` (dev-only, no jsdom needed — every automated test targets pure functions, not rendered components).
- All state lives in `localStorage`; no backend, no network calls.
- The IAM `Condition` language is supported for exactly one key: `aws:MultiFactorAuthPresent`. Nothing else.
- Reuse existing CSS classes only (`field`, `field-row`, `input`, `btn btn-primary|secondary|ghost`, `checklist`, `checklist-item`, `table`, `alert alert-danger|warning`, `content-grid`, `content-card`, `guide-panel`, `tag tag-*`, `codeblock`, `mono`, `card elev-sm`, `lab-progress`, `lab-card`). No new global CSS is added by this plan.
- Every reducer/domain function lives in a `.js` file with zero JSX, so it can be unit-tested without a DOM.
- Run `npm run lint` (oxlint) after every task that touches `.jsx`/`.js` files — it must stay clean, matching the standard already kept throughout this codebase.

---

## Task 1: Add Vitest as the test runner

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/state/__smoke__.test.js` (deleted again at the end of this task — only exists to prove the runner works)

**Interfaces:**
- Consumes: nothing.
- Produces: `npm test` runs Vitest once (`vitest run`) in Node environment (no jsdom). Every later task with a `.test.js` file relies on this.

- [ ] **Step 1: Install Vitest as a dev dependency**

```bash
npm install --save-dev vitest
```

- [ ] **Step 2: Point Vitest at the existing Vite config**

Edit `vite.config.js` — change the import so the same config file configures both Vite and Vitest:

```js
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 3: Add the `test` script**

Edit `package.json` scripts block:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "oxlint",
  "preview": "vite preview",
  "test": "vitest run"
},
```

- [ ] **Step 4: Write a smoke test to confirm the runner works**

Create `src/state/__smoke__.test.js`:

```js
import { describe, it, expect } from 'vitest';

describe('vitest smoke test', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 5: Run it**

Run: `npm test`
Expected: 1 test file, 1 test, PASS.

- [ ] **Step 6: Delete the smoke test (its job is done)**

Run: `rm src/state/__smoke__.test.js` (or delete the file via your editor).

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js
git commit -m "Add Vitest as the test runner for pure logic modules"
```

---

## Task 2: `iamLogic.js` — validation and lab-progress helpers

**Files:**
- Create: `src/state/iamLogic.js`
- Test: `src/state/iamLogic.test.js`

**Interfaces:**
- Consumes: nothing (pure module, no imports from the rest of the app).
- Produces (used by Task 3, 6, 7, 8, 9, 12, 13, 14):
  - `generateId(prefix: string): string`
  - `nowIso(): string`
  - `isValidUsername(username: string): boolean`
  - `isValidResourceName(name: string): boolean` (used for group/policy/role names)
  - `isValidPassword(password: string): boolean`
  - `computeLabProgress(labDef, state): { passed: number, total: number, percent: number, status: 'sin-empezar'|'en-curso'|'completado', checkResults: Array<{ id: string, label: string, passing: boolean }> }`
  - `isLabUnlocked(labDef, labDefsById: Record<string, LabDef>, state): boolean`

Where `labDef` (defined fully in Task 12) has the shape `{ id, requires: string[], checks: Array<{ id, label, verify: (state) => boolean }> }`.

- [ ] **Step 1: Write the failing tests**

Create `src/state/iamLogic.test.js`:

```js
import { describe, it, expect } from 'vitest';
import {
  generateId, isValidUsername, isValidResourceName, isValidPassword,
  computeLabProgress, isLabUnlocked,
} from './iamLogic.js';

describe('generateId', () => {
  it('prefixes the id and returns a non-empty suffix', () => {
    const id = generateId('grp');
    expect(id.startsWith('grp-')).toBe(true);
    expect(id.length).toBeGreaterThan(4);
  });

  it('returns different ids on each call', () => {
    expect(generateId('pol')).not.toBe(generateId('pol'));
  });
});

describe('isValidUsername', () => {
  it('accepts letters, numbers and + = , . @ _ -', () => {
    expect(isValidUsername('alumno-practicas-01')).toBe(true);
    expect(isValidUsername('a.b_c+d=e,f@g')).toBe(true);
  });

  it('rejects empty strings, spaces, and other symbols', () => {
    expect(isValidUsername('')).toBe(false);
    expect(isValidUsername('con espacio')).toBe(false);
    expect(isValidUsername('nombre#invalido')).toBe(false);
  });
});

describe('isValidResourceName', () => {
  it('accepts a simple lowercase-with-dashes name', () => {
    expect(isValidResourceName('practicas-lectura')).toBe(true);
  });

  it('rejects empty strings', () => {
    expect(isValidResourceName('')).toBe(false);
    expect(isValidResourceName('   ')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('requires 12+ chars, an uppercase letter, a number and a symbol', () => {
    expect(isValidPassword('Verano2026!!')).toBe(true);
  });

  it('rejects passwords missing any requirement', () => {
    expect(isValidPassword('short1!')).toBe(false);           // too short
    expect(isValidPassword('verano2026!!')).toBe(false);      // no uppercase
    expect(isValidPassword('Veranoanioanio!!')).toBe(false);  // no number
    expect(isValidPassword('Verano202600')).toBe(false);      // no symbol
  });
});

describe('computeLabProgress', () => {
  const labDef = {
    id: '02',
    checks: [
      { id: 'a', label: 'A', verify: (state) => state.flagA === true },
      { id: 'b', label: 'B', verify: (state) => state.flagB === true },
    ],
  };

  it('reports sin-empezar when no check passes', () => {
    const result = computeLabProgress(labDef, { flagA: false, flagB: false });
    expect(result).toEqual({
      passed: 0, total: 2, percent: 0, status: 'sin-empezar',
      checkResults: [
        { id: 'a', label: 'A', passing: false },
        { id: 'b', label: 'B', passing: false },
      ],
    });
  });

  it('reports en-curso when some but not all checks pass', () => {
    const result = computeLabProgress(labDef, { flagA: true, flagB: false });
    expect(result.status).toBe('en-curso');
    expect(result.passed).toBe(1);
    expect(result.percent).toBe(50);
  });

  it('reports completado when every check passes', () => {
    const result = computeLabProgress(labDef, { flagA: true, flagB: true });
    expect(result.status).toBe('completado');
    expect(result.percent).toBe(100);
  });
});

describe('isLabUnlocked', () => {
  const lab03 = {
    id: '03',
    checks: [{ id: 'x', label: 'X', verify: (state) => state.lab03Done === true }],
  };
  const lab04 = { id: '04', requires: ['03'], checks: [] };
  const lab01 = { id: '01', requires: [], checks: [] };
  const labDefsById = { '01': lab01, '03': lab03, '04': lab04 };

  it('is unlocked when requires is empty', () => {
    expect(isLabUnlocked(lab01, labDefsById, {})).toBe(true);
  });

  it('is locked when a required lab is not yet completed', () => {
    expect(isLabUnlocked(lab04, labDefsById, { lab03Done: false })).toBe(false);
  });

  it('is unlocked once every required lab is completed', () => {
    expect(isLabUnlocked(lab04, labDefsById, { lab03Done: true })).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `src/state/iamLogic.js` does not exist yet (import error).

- [ ] **Step 3: Implement `iamLogic.js`**

Create `src/state/iamLogic.js`:

```js
export function generateId(prefix) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export function nowIso() {
  return new Date().toISOString();
}

const USERNAME_RE = /^[A-Za-z0-9+=,.@_-]+$/;

export function isValidUsername(username) {
  return typeof username === 'string' && username.trim().length > 0 && USERNAME_RE.test(username);
}

export function isValidResourceName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

export function isValidPassword(password) {
  if (typeof password !== 'string' || password.length < 12) return false;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  return hasUpper && hasNumber && hasSymbol;
}

export function computeLabProgress(labDef, state) {
  const checkResults = labDef.checks.map((check) => ({
    id: check.id,
    label: check.label,
    passing: Boolean(check.verify(state)),
  }));
  const passed = checkResults.filter((c) => c.passing).length;
  const total = checkResults.length;
  const percent = total === 0 ? 0 : Math.round((passed / total) * 100);
  let status = 'sin-empezar';
  if (passed === total && total > 0) status = 'completado';
  else if (passed > 0) status = 'en-curso';
  return { passed, total, percent, status, checkResults };
}

export function isLabUnlocked(labDef, labDefsById, state) {
  const requires = labDef.requires || [];
  return requires.every((requiredId) => {
    const requiredLab = labDefsById[requiredId];
    if (!requiredLab) return true;
    return computeLabProgress(requiredLab, state).status === 'completado';
  });
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, all `iamLogic` tests green.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: no warnings on `src/state/iamLogic.js` or `src/state/iamLogic.test.js`.

- [ ] **Step 6: Commit**

```bash
git add src/state/iamLogic.js src/state/iamLogic.test.js
git commit -m "Add iamLogic: validation and lab-progress pure functions"
```

---

## Task 3: `iamReducer.js` — the IAM domain reducer

**Files:**
- Create: `src/state/iamReducer.js`
- Test: `src/state/iamReducer.test.js`

**Interfaces:**
- Consumes: `generateId`, `nowIso` from `./iamLogic.js` (Task 2).
- Produces (used by Task 4 and every CRUD page task):
  - `initialIamState: { users: {}, groups: {}, policies: {}, roles: {}, labs: {} }`
  - `iamReducer(state, action): newState`
  - Action creators, each returning a plain `{ type, payload }` object:
    - `createUser({ username, courseTag, accessType, password, requirePasswordReset })`
    - `deleteUser(username)`
    - `markCredentialsDownloaded(username)`
    - `setMfaEnabled(username, mfaEnabled)`
    - `createGroup({ name, desc })`
    - `deleteGroup(id)`
    - `addUserToGroup(username, groupId)`
    - `removeUserFromGroup(username, groupId)`
    - `createPolicy({ name, type, document })`
    - `updatePolicy(id, { name, type, document })`
    - `deletePolicy(id)`
    - `attachPolicy(targetType, targetId, policyId)` — `targetType` is `'user' | 'group' | 'role'`
    - `detachPolicy(targetType, targetId, policyId)`
    - `createRole({ name, trustPolicy, maxDurationMinutes })`
    - `deleteRole(id)`
    - `assumeRole(id)`
    - `clearRoleSession(id)`

User records created by `createUser` have shape: `{ username, courseTag, accessType, password, requirePasswordReset, mfaEnabled: false, accessKey: {accessKeyId, secretAccessKey} | null, credentialsDownloaded: false, groups: [], policies: [], createdAt }`. `accessKey` is generated when `accessType === 'programmatic'`, using `generateId('AKIA').toUpperCase()` for the key id and `generateId('secret')` for the secret (fake, simulator-only, matching how `UsuariosCrear` already fabricates credentials today).

- [ ] **Step 1: Write the failing tests**

Create `src/state/iamReducer.test.js`:

```js
import { describe, it, expect } from 'vitest';
import {
  initialIamState, iamReducer,
  createUser, deleteUser, markCredentialsDownloaded, setMfaEnabled,
  createGroup, deleteGroup, addUserToGroup, removeUserFromGroup,
  createPolicy, updatePolicy, deletePolicy, attachPolicy, detachPolicy,
  createRole, deleteRole, assumeRole, clearRoleSession,
} from './iamReducer.js';

function withUser(state, overrides = {}) {
  return iamReducer(state, createUser({
    username: 'alumno-01', courseTag: 'curso=cloud', accessType: 'console',
    password: 'Verano2026!!', requirePasswordReset: true, ...overrides,
  }));
}

describe('createUser / deleteUser', () => {
  it('adds a console user with no groups, no policies, mfa off', () => {
    const state = withUser(initialIamState);
    const user = state.users['alumno-01'];
    expect(user.username).toBe('alumno-01');
    expect(user.accessType).toBe('console');
    expect(user.mfaEnabled).toBe(false);
    expect(user.groups).toEqual([]);
    expect(user.policies).toEqual([]);
    expect(user.credentialsDownloaded).toBe(false);
    expect(user.accessKey).toBeNull();
  });

  it('generates an access key for a programmatic user', () => {
    const state = iamReducer(initialIamState, createUser({
      username: 'app-01', courseTag: '', accessType: 'programmatic',
      password: null, requirePasswordReset: false,
    }));
    const user = state.users['app-01'];
    expect(user.accessKey).not.toBeNull();
    expect(typeof user.accessKey.accessKeyId).toBe('string');
    expect(typeof user.accessKey.secretAccessKey).toBe('string');
  });

  it('deleteUser removes the user and unlinks them from any group', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.keys(state.groups)[0];
    state = iamReducer(state, addUserToGroup('alumno-01', groupId));
    state = iamReducer(state, deleteUser('alumno-01'));
    expect(state.users['alumno-01']).toBeUndefined();
    expect(state.groups[groupId].members).toEqual([]);
  });
});

describe('markCredentialsDownloaded / setMfaEnabled', () => {
  it('flips credentialsDownloaded to true', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, markCredentialsDownloaded('alumno-01'));
    expect(state.users['alumno-01'].credentialsDownloaded).toBe(true);
  });

  it('toggles mfaEnabled', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, setMfaEnabled('alumno-01', true));
    expect(state.users['alumno-01'].mfaEnabled).toBe(true);
    state = iamReducer(state, setMfaEnabled('alumno-01', false));
    expect(state.users['alumno-01'].mfaEnabled).toBe(false);
  });
});

describe('groups: create/delete/add-member/remove-member', () => {
  it('createGroup adds an entry with empty members and policies', () => {
    const state = iamReducer(initialIamState, createGroup({ name: 'practicas-lectura', desc: 'lectura' }));
    const group = Object.values(state.groups)[0];
    expect(group.name).toBe('practicas-lectura');
    expect(group.members).toEqual([]);
    expect(group.policies).toEqual([]);
  });

  it('addUserToGroup / removeUserFromGroup keep both sides in sync', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.keys(state.groups)[0];

    state = iamReducer(state, addUserToGroup('alumno-01', groupId));
    expect(state.groups[groupId].members).toEqual(['alumno-01']);
    expect(state.users['alumno-01'].groups).toEqual([groupId]);

    state = iamReducer(state, removeUserFromGroup('alumno-01', groupId));
    expect(state.groups[groupId].members).toEqual([]);
    expect(state.users['alumno-01'].groups).toEqual([]);
  });

  it('deleteGroup removes the group and drops it from member lists', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.keys(state.groups)[0];
    state = iamReducer(state, addUserToGroup('alumno-01', groupId));
    state = iamReducer(state, deleteGroup(groupId));
    expect(state.groups[groupId]).toBeUndefined();
    expect(state.users['alumno-01'].groups).toEqual([]);
  });
});

describe('policies: create/update/delete/attach/detach', () => {
  const doc = { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: 's3:GetObject', Resource: '*' }] };

  it('createPolicy stores the document as-is', () => {
    const state = iamReducer(initialIamState, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const policy = Object.values(state.policies)[0];
    expect(policy.name).toBe('LecturaS3');
    expect(policy.document).toEqual(doc);
  });

  it('updatePolicy replaces name/type/document by id', () => {
    let state = iamReducer(initialIamState, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const id = Object.keys(state.policies)[0];
    const newDoc = { Version: '2012-10-17', Statement: [] };
    state = iamReducer(state, updatePolicy(id, { name: 'LecturaS3v2', type: 'Propia del curso', document: newDoc }));
    expect(state.policies[id].name).toBe('LecturaS3v2');
    expect(state.policies[id].document).toEqual(newDoc);
  });

  it('attachPolicy/detachPolicy work for user, group and role targets', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createGroup({ name: 'g', desc: '' }));
    const groupId = Object.keys(state.groups)[0];
    state = iamReducer(state, createRole({ name: 'r', trustPolicy: {}, maxDurationMinutes: 60 }));
    const roleId = Object.keys(state.roles)[0];
    state = iamReducer(state, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const policyId = Object.keys(state.policies)[0];

    state = iamReducer(state, attachPolicy('user', 'alumno-01', policyId));
    state = iamReducer(state, attachPolicy('group', groupId, policyId));
    state = iamReducer(state, attachPolicy('role', roleId, policyId));
    expect(state.users['alumno-01'].policies).toEqual([policyId]);
    expect(state.groups[groupId].policies).toEqual([policyId]);
    expect(state.roles[roleId].policies).toEqual([policyId]);

    state = iamReducer(state, detachPolicy('user', 'alumno-01', policyId));
    state = iamReducer(state, detachPolicy('group', groupId, policyId));
    state = iamReducer(state, detachPolicy('role', roleId, policyId));
    expect(state.users['alumno-01'].policies).toEqual([]);
    expect(state.groups[groupId].policies).toEqual([]);
    expect(state.roles[roleId].policies).toEqual([]);
  });

  it('deletePolicy detaches it from every user, group and role that had it', () => {
    let state = withUser(initialIamState);
    state = iamReducer(state, createPolicy({ name: 'LecturaS3', type: 'Propia del curso', document: doc }));
    const policyId = Object.keys(state.policies)[0];
    state = iamReducer(state, attachPolicy('user', 'alumno-01', policyId));
    state = iamReducer(state, deletePolicy(policyId));
    expect(state.policies[policyId]).toBeUndefined();
    expect(state.users['alumno-01'].policies).toEqual([]);
  });
});

describe('roles: create/delete/assume/clear session', () => {
  it('createRole starts with no active session and empty policies', () => {
    const state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: { Effect: 'Allow' }, maxDurationMinutes: 30 }));
    const role = Object.values(state.roles)[0];
    expect(role.name).toBe('RolLectura');
    expect(role.policies).toEqual([]);
    expect(role.activeSession).toBeNull();
  });

  it('assumeRole creates a session that expires maxDurationMinutes from now', () => {
    let state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: {}, maxDurationMinutes: 30 }));
    const roleId = Object.keys(state.roles)[0];
    const before = Date.now();
    state = iamReducer(state, assumeRole(roleId));
    const session = state.roles[roleId].activeSession;
    expect(session).not.toBeNull();
    expect(typeof session.accessKeyId).toBe('string');
    expect(typeof session.sessionToken).toBe('string');
    const expiresAt = new Date(session.expiresAt).getTime();
    expect(expiresAt).toBeGreaterThan(before);
    expect(expiresAt).toBeLessThanOrEqual(before + 30 * 60 * 1000 + 1000);
  });

  it('clearRoleSession sets activeSession back to null', () => {
    let state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: {}, maxDurationMinutes: 30 }));
    const roleId = Object.keys(state.roles)[0];
    state = iamReducer(state, assumeRole(roleId));
    state = iamReducer(state, clearRoleSession(roleId));
    expect(state.roles[roleId].activeSession).toBeNull();
  });

  it('deleteRole removes the role', () => {
    let state = iamReducer(initialIamState, createRole({ name: 'RolLectura', trustPolicy: {}, maxDurationMinutes: 30 }));
    const roleId = Object.keys(state.roles)[0];
    state = iamReducer(state, deleteRole(roleId));
    expect(state.roles[roleId]).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `src/state/iamReducer.js` does not exist yet.

- [ ] **Step 3: Implement `iamReducer.js`**

Create `src/state/iamReducer.js`:

```js
import { generateId, nowIso } from './iamLogic.js';

export const initialIamState = { users: {}, groups: {}, policies: {}, roles: {}, labs: {} };

// --- Action creators -------------------------------------------------

export function createUser({ username, courseTag, accessType, password, requirePasswordReset }) {
  return { type: 'CREATE_USER', payload: { username, courseTag, accessType, password, requirePasswordReset } };
}
export function deleteUser(username) {
  return { type: 'DELETE_USER', payload: { username } };
}
export function markCredentialsDownloaded(username) {
  return { type: 'MARK_CREDENTIALS_DOWNLOADED', payload: { username } };
}
export function setMfaEnabled(username, mfaEnabled) {
  return { type: 'SET_MFA_ENABLED', payload: { username, mfaEnabled } };
}
export function createGroup({ name, desc }) {
  return { type: 'CREATE_GROUP', payload: { name, desc } };
}
export function deleteGroup(id) {
  return { type: 'DELETE_GROUP', payload: { id } };
}
export function addUserToGroup(username, groupId) {
  return { type: 'ADD_USER_TO_GROUP', payload: { username, groupId } };
}
export function removeUserFromGroup(username, groupId) {
  return { type: 'REMOVE_USER_FROM_GROUP', payload: { username, groupId } };
}
export function createPolicy({ name, type, document }) {
  return { type: 'CREATE_POLICY', payload: { name, type, document } };
}
export function updatePolicy(id, { name, type, document }) {
  return { type: 'UPDATE_POLICY', payload: { id, name, type, document } };
}
export function deletePolicy(id) {
  return { type: 'DELETE_POLICY', payload: { id } };
}
export function attachPolicy(targetType, targetId, policyId) {
  return { type: 'ATTACH_POLICY', payload: { targetType, targetId, policyId } };
}
export function detachPolicy(targetType, targetId, policyId) {
  return { type: 'DETACH_POLICY', payload: { targetType, targetId, policyId } };
}
export function createRole({ name, trustPolicy, maxDurationMinutes }) {
  return { type: 'CREATE_ROLE', payload: { name, trustPolicy, maxDurationMinutes } };
}
export function deleteRole(id) {
  return { type: 'DELETE_ROLE', payload: { id } };
}
export function assumeRole(id) {
  return { type: 'ASSUME_ROLE', payload: { id } };
}
export function clearRoleSession(id) {
  return { type: 'CLEAR_ROLE_SESSION', payload: { id } };
}

// --- Helpers -----------------------------------------------------------

function collectionKeyFor(targetType) {
  if (targetType === 'user') return 'users';
  if (targetType === 'group') return 'groups';
  if (targetType === 'role') return 'roles';
  throw new Error(`Unknown targetType: ${targetType}`);
}

function fakeAccessKey() {
  return {
    accessKeyId: generateId('AKIA').toUpperCase(),
    secretAccessKey: generateId('secret') + generateId('key'),
  };
}

// --- Reducer -------------------------------------------------------------

export function iamReducer(state, action) {
  switch (action.type) {
    case 'CREATE_USER': {
      const { username, courseTag, accessType, password, requirePasswordReset } = action.payload;
      return {
        ...state,
        users: {
          ...state.users,
          [username]: {
            username, courseTag, accessType, password,
            requirePasswordReset: Boolean(requirePasswordReset),
            mfaEnabled: false,
            accessKey: accessType === 'programmatic' ? fakeAccessKey() : null,
            credentialsDownloaded: false,
            groups: [],
            policies: [],
            createdAt: nowIso(),
          },
        },
      };
    }

    case 'DELETE_USER': {
      const { username } = action.payload;
      const { [username]: removed, ...restUsers } = state.users;
      if (!removed) return state;
      const groups = Object.fromEntries(
        Object.entries(state.groups).map(([id, g]) => [id, { ...g, members: g.members.filter((m) => m !== username) }]),
      );
      return { ...state, users: restUsers, groups };
    }

    case 'MARK_CREDENTIALS_DOWNLOADED': {
      const { username } = action.payload;
      if (!state.users[username]) return state;
      return { ...state, users: { ...state.users, [username]: { ...state.users[username], credentialsDownloaded: true } } };
    }

    case 'SET_MFA_ENABLED': {
      const { username, mfaEnabled } = action.payload;
      if (!state.users[username]) return state;
      return { ...state, users: { ...state.users, [username]: { ...state.users[username], mfaEnabled } } };
    }

    case 'CREATE_GROUP': {
      const { name, desc } = action.payload;
      const id = generateId('grp');
      return { ...state, groups: { ...state.groups, [id]: { id, name, desc, policies: [], members: [], createdAt: nowIso() } } };
    }

    case 'DELETE_GROUP': {
      const { id } = action.payload;
      const { [id]: removed, ...restGroups } = state.groups;
      if (!removed) return state;
      const users = Object.fromEntries(
        Object.entries(state.users).map(([u, user]) => [u, { ...user, groups: user.groups.filter((g) => g !== id) }]),
      );
      return { ...state, groups: restGroups, users };
    }

    case 'ADD_USER_TO_GROUP': {
      const { username, groupId } = action.payload;
      const user = state.users[username];
      const group = state.groups[groupId];
      if (!user || !group) return state;
      if (group.members.includes(username)) return state;
      return {
        ...state,
        users: { ...state.users, [username]: { ...user, groups: [...user.groups, groupId] } },
        groups: { ...state.groups, [groupId]: { ...group, members: [...group.members, username] } },
      };
    }

    case 'REMOVE_USER_FROM_GROUP': {
      const { username, groupId } = action.payload;
      const user = state.users[username];
      const group = state.groups[groupId];
      if (!user || !group) return state;
      return {
        ...state,
        users: { ...state.users, [username]: { ...user, groups: user.groups.filter((g) => g !== groupId) } },
        groups: { ...state.groups, [groupId]: { ...group, members: group.members.filter((m) => m !== username) } },
      };
    }

    case 'CREATE_POLICY': {
      const { name, type, document } = action.payload;
      const id = generateId('pol');
      return { ...state, policies: { ...state.policies, [id]: { id, name, type, document, createdAt: nowIso() } } };
    }

    case 'UPDATE_POLICY': {
      const { id, name, type, document } = action.payload;
      if (!state.policies[id]) return state;
      return { ...state, policies: { ...state.policies, [id]: { ...state.policies[id], name, type, document } } };
    }

    case 'DELETE_POLICY': {
      const { id } = action.payload;
      const { [id]: removed, ...restPolicies } = state.policies;
      if (!removed) return state;
      const detach = (list) => list.filter((p) => p !== id);
      return {
        ...state,
        policies: restPolicies,
        users: Object.fromEntries(Object.entries(state.users).map(([u, user]) => [u, { ...user, policies: detach(user.policies) }])),
        groups: Object.fromEntries(Object.entries(state.groups).map(([g, group]) => [g, { ...group, policies: detach(group.policies) }])),
        roles: Object.fromEntries(Object.entries(state.roles).map(([r, role]) => [r, { ...role, policies: detach(role.policies) }])),
      };
    }

    case 'ATTACH_POLICY': {
      const { targetType, targetId, policyId } = action.payload;
      const key = collectionKeyFor(targetType);
      const target = state[key][targetId];
      if (!target || !state.policies[policyId]) return state;
      if (target.policies.includes(policyId)) return state;
      return { ...state, [key]: { ...state[key], [targetId]: { ...target, policies: [...target.policies, policyId] } } };
    }

    case 'DETACH_POLICY': {
      const { targetType, targetId, policyId } = action.payload;
      const key = collectionKeyFor(targetType);
      const target = state[key][targetId];
      if (!target) return state;
      return { ...state, [key]: { ...state[key], [targetId]: { ...target, policies: target.policies.filter((p) => p !== policyId) } } };
    }

    case 'CREATE_ROLE': {
      const { name, trustPolicy, maxDurationMinutes } = action.payload;
      const id = generateId('rol');
      return { ...state, roles: { ...state.roles, [id]: { id, name, trustPolicy, maxDurationMinutes, policies: [], activeSession: null } } };
    }

    case 'DELETE_ROLE': {
      const { id } = action.payload;
      const { [id]: removed, ...restRoles } = state.roles;
      if (!removed) return state;
      return { ...state, roles: restRoles };
    }

    case 'ASSUME_ROLE': {
      const { id } = action.payload;
      const role = state.roles[id];
      if (!role) return state;
      const expiresAt = new Date(Date.now() + role.maxDurationMinutes * 60 * 1000).toISOString();
      const session = { accessKeyId: generateId('ASIA').toUpperCase(), secretAccessKey: generateId('secret'), sessionToken: generateId('token') + generateId('token'), expiresAt };
      return { ...state, roles: { ...state.roles, [id]: { ...role, activeSession: session } } };
    }

    case 'CLEAR_ROLE_SESSION': {
      const { id } = action.payload;
      if (!state.roles[id]) return state;
      return { ...state, roles: { ...state.roles, [id]: { ...state.roles[id], activeSession: null } } };
    }

    default:
      return state;
  }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, all `iamReducer` tests green.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/state/iamReducer.js src/state/iamReducer.test.js
git commit -m "Add iamReducer: the full IAM domain reducer with action creators"
```

---

## Task 4: `iamStore.jsx` — Context provider, hooks, and localStorage persistence

**Files:**
- Create: `src/state/iamStore.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `initialIamState`, `iamReducer` from `./iamReducer.js` (Task 3).
- Produces (used by every page task from here on):
  - `IamProvider({ children })` — React component, wraps the app.
  - `useIamState()` — returns the current state object.
  - `useIamDispatch()` — returns `dispatch`.

- [ ] **Step 1: Implement the store**

Create `src/state/iamStore.jsx`:

```jsx
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialIamState, iamReducer } from './iamReducer.js';

const STORAGE_KEY = 'nube-academica:iam-state';

const IamStateContext = createContext(null);
const IamDispatchContext = createContext(null);

function loadInitialState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialIamState;
    const parsed = JSON.parse(raw);
    return { ...initialIamState, ...parsed };
  } catch {
    return initialIamState;
  }
}

export function IamProvider({ children }) {
  const [state, dispatch] = useReducer(iamReducer, undefined, loadInitialState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <IamStateContext.Provider value={state}>
      <IamDispatchContext.Provider value={dispatch}>
        {children}
      </IamDispatchContext.Provider>
    </IamStateContext.Provider>
  );
}

export function useIamState() {
  const state = useContext(IamStateContext);
  if (state === null) throw new Error('useIamState must be used within an IamProvider');
  return state;
}

export function useIamDispatch() {
  const dispatch = useContext(IamDispatchContext);
  if (dispatch === null) throw new Error('useIamDispatch must be used within an IamProvider');
  return dispatch;
}
```

- [ ] **Step 2: Wrap the app in the provider**

Read `src/App.jsx` first to see the current top of the file and the `<BrowserRouter>` wrapping.

Edit `src/App.jsx` — add the import and wrap `<BrowserRouter>` with `<IamProvider>`:

```jsx
import { IamProvider } from './state/iamStore.jsx';
```

Add this import near the top with the other imports, and change the `return` of `App()` from:

```jsx
  return (
    <BrowserRouter>
      <Routes>
```

to:

```jsx
  return (
    <IamProvider>
      <BrowserRouter>
        <Routes>
```

and close it at the matching end of the function — change:

```jsx
      </Routes>
    </BrowserRouter>
  );
```

to:

```jsx
      </Routes>
    </BrowserRouter>
    </IamProvider>
  );
```

(Run `npm run lint` after this edit — oxlint/JSX formatting will not complain about indentation, but re-indent the two closing tags to match the file's existing style if your editor auto-formats.)

- [ ] **Step 3: Verify in the browser**

Run the dev server (`preview_start` with the `aws-ejemplo-dev` launch config, or `npm run dev`), navigate to any page, and open the browser console.

Expected: no errors like "useIamState must be used within an IamProvider" and no React errors. Open the browser's Application/Storage panel (or run `localStorage.getItem('nube-academica:iam-state')` in the console) and confirm it now holds `{"users":{},"groups":{},"policies":{},"roles":{},"labs":{}}`.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/state/iamStore.jsx src/App.jsx
git commit -m "Add IamProvider: Context store wired to App.jsx with localStorage persistence"
```

---

## Task 5: Users list page (`Usuarios.jsx`) — new

**Files:**
- Create: `src/pages/Usuarios.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useIamState`, `useIamDispatch` from `../state/iamStore.jsx`; `deleteUser`, `setMfaEnabled`, `attachPolicy`, `detachPolicy` from `../state/iamReducer.js`.
- Produces: route `iam/usuarios` rendering the list. Sidebar link "Usuarios" (in `AppShell.jsx`, already pointing at `/iam/usuarios/crear`) is left as-is per this task — Task 6 does not change navigation; this task only adds the new list route reachable from a link inside the page itself and directly by URL. (A follow-up cosmetic change to the sidebar is out of scope for this plan; the existing "Usuarios" link keeps going straight to the creation wizard, matching current behavior.)

- [ ] **Step 1: Implement the page**

Create `src/pages/Usuarios.jsx`:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconSearch } from '../components/icons.jsx';
import { Tag, ViewHeader } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { deleteUser, setMfaEnabled, attachPolicy, detachPolicy } from '../state/iamReducer.js';

export default function Usuarios() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [policyToAttach, setPolicyToAttach] = useState('');

  const users = Object.values(state.users).filter((u) => u.username.toLowerCase().includes(query.toLowerCase()));
  const policies = Object.values(state.policies);

  function toggleExpanded(username) {
    setExpanded((current) => (current === username ? null : username));
    setPolicyToAttach('');
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Usuarios"
        title="Usuarios"
        intro="Cada usuario representa una persona o una aplicación con credenciales propias. Adjunta permisos a través de grupos siempre que puedas; usa la política directa solo como excepción."
        action={<Link to="/iam/usuarios/crear" className="btn btn-primary" style={{ marginLeft: 'auto' }}>Crear usuario</Link>}
      />

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div style={{ position: 'relative', maxWidth: 240, flex: 1 }}>
              <IconSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input className="input" placeholder="Buscar usuario" style={{ paddingLeft: 30 }} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <span className="toolbar-count">{users.length} usuario{users.length === 1 ? '' : 's'}</span>
          </div>

          <table className="table">
            <thead>
              <tr><th>Usuario</th><th>Acceso</th><th>MFA</th><th>Grupos</th><th>Políticas directas</th><th></th></tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.accessType === 'console' ? 'Consola' : 'Programático'}</td>
                  <td>
                    <label className="checkbox">
                      <input type="checkbox" checked={u.mfaEnabled} onChange={(e) => dispatch(setMfaEnabled(u.username, e.target.checked))} />
                      <span className="box" />
                      <span>{u.mfaEnabled ? 'Activo' : 'Inactivo'}</span>
                    </label>
                  </td>
                  <td>{u.groups.length ? u.groups.map((gid) => state.groups[gid]?.name).filter(Boolean).join(', ') : <Tag text="Ninguno" variant="neutral" />}</td>
                  <td>{u.policies.length ? u.policies.map((pid) => state.policies[pid]?.name).filter(Boolean).join(', ') : <Tag text="Ninguna" variant="neutral" />}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => toggleExpanded(u.username)}>{expanded === u.username ? 'Cerrar' : 'Gestionar'}</button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={6} className="text-muted">No hay usuarios que coincidan con &quot;{query}&quot;.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {expanded && state.users[expanded] && (
          <aside className="guide-panel">
            <div className="guide-panel-head">
              <span className="guide-panel-title">Gestionar {expanded}</span>
            </div>

            <div className="radio-group-label">Adjuntar política directamente</div>
            <div className="field-row">
              <select className="input" value={policyToAttach} onChange={(e) => setPolicyToAttach(e.target.value)}>
                <option value="">Selecciona una política</option>
                {policies.filter((p) => !state.users[expanded].policies.includes(p.id)).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-secondary"
                disabled={!policyToAttach}
                onClick={() => { dispatch(attachPolicy('user', expanded, policyToAttach)); setPolicyToAttach(''); }}
              >
                Adjuntar
              </button>
            </div>

            <div className="checklist">
              {state.users[expanded].policies.map((pid) => (
                <div key={pid} className="checklist-item is-checked">
                  <span>{state.policies[pid]?.name ?? pid}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(detachPolicy('user', expanded, pid))}>Quitar</button>
                </div>
              ))}
              {state.users[expanded].policies.length === 0 && <div className="text-muted">Sin políticas directas.</div>}
            </div>

            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginTop: 'var(--space-4)' }}
              onClick={() => { dispatch(deleteUser(expanded)); setExpanded(null); }}
            >
              Eliminar usuario
            </button>
          </aside>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Register the route**

Edit `src/App.jsx`:

```jsx
import Usuarios from './pages/Usuarios.jsx';
```

Add this import next to the other page imports, and add the route right above the existing `iam/usuarios/crear` route:

```jsx
          <Route path="iam/usuarios" element={<Usuarios />} />
          <Route path="iam/usuarios/crear" element={<UsuariosCrear />} />
```

- [ ] **Step 3: Verify in the browser**

Navigate to `http://localhost:5173/iam/usuarios`. Expected: an empty table ("No hay usuarios..."), a working "Crear usuario" button linking to the wizard, no console errors.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Usuarios.jsx src/App.jsx
git commit -m "Add Usuarios list page reading from the real IAM store"
```

---

## Task 6: Wire `UsuariosCrear` to the store

**Files:**
- Modify: `src/pages/UsuariosCrear/UsuariosCrear.jsx`

**Interfaces:**
- Consumes: `useIamState`, `useIamDispatch` from `../../state/iamStore.jsx`; `createUser`, `addUserToGroup`, `attachPolicy`, `markCredentialsDownloaded` from `../../state/iamReducer.js`; `isValidUsername`, `isValidPassword` from `../../state/iamLogic.js` (replacing the equivalent local checks from `wizardLogic.js` used today for username/password validity — `wizardLogic.js` keeps `passwordStrength`, `generateFakeCredentials`, `credentialsToCsv`, which stay as-is and are not duplicated).
- Produces: creating a user through the wizard now persists it in the real store, including its selected groups and directly-attached policies; downloading credentials marks `credentialsDownloaded` in the store (this satisfies Lab 01, check 5).

- [ ] **Step 1: Read the current file end-to-end**

Re-read `src/pages/UsuariosCrear/UsuariosCrear.jsx` (already read in full during design) and `src/pages/UsuariosCrear/wizardLogic.js` before editing, to keep every untouched line intact.

- [ ] **Step 2: Swap the validity imports**

Change the top of `UsuariosCrear.jsx` from:

```jsx
import { availableGroups, availablePolicies } from '../../data/sampleData.js';
import {
  isPasswordValid,
  isUsernameValid,
  passwordStrength,
  generateFakeCredentials,
  credentialsToCsv,
} from './wizardLogic.js';
```

to:

```jsx
import { useIamState, useIamDispatch } from '../../state/iamStore.jsx';
import { createUser, addUserToGroup, attachPolicy, markCredentialsDownloaded } from '../../state/iamReducer.js';
import { isValidUsername, isValidPassword } from '../../state/iamLogic.js';
import {
  passwordStrength,
  generateFakeCredentials,
  credentialsToCsv,
} from './wizardLogic.js';
```

Then, inside `wizardLogic.js`, delete the now-unused `isPasswordValid` and `isUsernameValid` exports (keep `passwordStrength`, `generateFakeCredentials`, `credentialsToCsv` — read the file first to confirm exactly which lines to remove and that nothing else imports the two removed functions; `grep -rn "isPasswordValid\|isUsernameValid" src` to double check before deleting).

Update every use of `isPasswordValid(...)` and `isUsernameValid(...)` inside `UsuariosCrear.jsx`'s component body to `isValidPassword(...)` and `isValidUsername(...)` respectively (the function signatures are identical — same single string argument, same boolean return).

- [ ] **Step 3: Read real groups/policies instead of the static catalog**

Inside `export default function UsuariosCrear()`, add near the top:

```jsx
  const state = useIamState();
  const dispatch = useIamDispatch();
```

`Step2` currently receives no group/policy data as props (it imports `availableGroups`/`availablePolicies` directly at module scope). Change `Step2`'s signature and call site to pass the real lists:

Change the call site:

```jsx
          {step === 2 && (
            <Step2
              selectedGroups={selectedGroups}
              selectedPolicies={selectedPolicies}
              toggleGroup={(id) => toggleSet(setSelectedGroups, id)}
              togglePolicy={(id) => toggleSet(setSelectedPolicies, id)}
            />
          )}
```

to:

```jsx
          {step === 2 && (
            <Step2
              groups={Object.values(state.groups)}
              policies={Object.values(state.policies)}
              selectedGroups={selectedGroups}
              selectedPolicies={selectedPolicies}
              toggleGroup={(id) => toggleSet(setSelectedGroups, id)}
              togglePolicy={(id) => toggleSet(setSelectedPolicies, id)}
            />
          )}
```

Change the `Step2` function itself:

```jsx
function Step2({ selectedGroups, selectedPolicies, toggleGroup, togglePolicy }) {
```

to:

```jsx
function Step2({ groups, policies, selectedGroups, selectedPolicies, toggleGroup, togglePolicy }) {
```

and inside its body, replace both `availableGroups.map((g) => {` and `availablePolicies.map((p) => {` with `groups.map((g) => {` and `policies.map((p) => {` (the rendered fields `g.id`/`g.name`/`g.desc` and `p.id`/`p.name`/`p.desc` already match the real store shape — `groups[id]` has `id, name, desc`, `policies[id]` has `id, name` and, since real policies don't carry the old catalog's short `desc` string, render `p.type` in its place: change `<div className="checklist-item-meta">{p.desc}</div>` to `<div className="checklist-item-meta">{p.type}</div>` inside the policies block only).

Once nothing in the codebase imports `availableGroups`/`availablePolicies` any more (`grep -rn "availableGroups\|availablePolicies" src`), delete those two exports from `src/data/sampleData.js`.

- [ ] **Step 4: Dispatch on creation**

Replace `createUser` (the local function, not to be confused with the imported action creator of the same name — rename the local one) — find:

```jsx
  function createUser() {
    setSubmitState('submitting');
    setTimeout(() => {
      const creds = generateFakeCredentials();
      setCreatedUser(creds);
      setSubmitState('created');
    }, 900);
  }
```

Replace with (renaming the local function to `submitUser` and updating its one call site in the JSX `onClick={createUser}` to `onClick={submitUser}`):

```jsx
  function submitUser() {
    setSubmitState('submitting');
    setTimeout(() => {
      dispatch(createUser({
        username: form.username,
        courseTag: form.courseTag,
        accessType: form.accessType,
        password: form.accessType === 'console' ? form.password : null,
        requirePasswordReset: form.accessType === 'console' && form.requirePasswordReset,
      }));
      selectedGroups.forEach((groupId) => dispatch(addUserToGroup(form.username, groupId)));
      selectedPolicies.forEach((policyId) => dispatch(attachPolicy('user', form.username, policyId)));

      const creds = form.accessType === 'programmatic' ? generateFakeCredentials() : null;
      setCreatedUser(creds);
      setSubmitState('created');
    }, 900);
  }
```

(Note: for `accessType === 'console'` users, `createdUser` is now `null` because there is no access key to show — `Step3`'s success banner already guards with `submitState === 'created' && createdUser`, so for console users it will fall through to the plain review view after creation. This is a pre-existing UI gap being surfaced, not introduced by this change; leave it as the visible behavior for this task and do not add new banner variants — that is out of scope for this plan. Console users still see their user appear in `/iam/usuarios` immediately, which is the source of truth going forward.)

- [ ] **Step 5: Mark credentials downloaded**

Find:

```jsx
  function handleDownload() {
    if (!createdUser) return;
    downloadCsv(`${form.username}-credenciales.csv`, credentialsToCsv(form.username, createdUser));
  }
```

Replace with:

```jsx
  function handleDownload() {
    if (!createdUser) return;
    downloadCsv(`${form.username}-credenciales.csv`, credentialsToCsv(form.username, createdUser));
    dispatch(markCredentialsDownloaded(form.username));
  }
```

- [ ] **Step 6: Verify in the browser**

Start the dev server, go to `/iam/usuarios/crear`, complete the 3 steps for a **programmatic** user (so a `.csv` download is possible), download the credentials, then navigate to `/iam/usuarios`.

Expected: the new user appears in the list with the right access type; `localStorage`'s `nube-academica:iam-state` (check via console) shows `credentialsDownloaded: true` for that user after the download click.

Repeat quickly for a **console** user with at least one group selected (create a group first via `/iam/grupos` — if Task 7 isn't done yet, skip the group-selection part of this check and just confirm the user itself is created and listed).

- [ ] **Step 7: Lint**

Run: `npm run lint`
Expected: clean. Also run `npm test` — Tasks 1-4's tests must still pass unchanged.

- [ ] **Step 8: Commit**

```bash
git add src/pages/UsuariosCrear/UsuariosCrear.jsx src/pages/UsuariosCrear/wizardLogic.js src/data/sampleData.js
git commit -m "Wire UsuariosCrear wizard to the real IAM store"
```

---

## Task 7: `Grupos.jsx` — real CRUD

**Files:**
- Modify: `src/pages/Grupos.jsx`

**Interfaces:**
- Consumes: `useIamState`, `useIamDispatch`; `createGroup`, `deleteGroup`, `addUserToGroup`, `removeUserFromGroup`, `attachPolicy`, `detachPolicy` from `../state/iamReducer.js`; `isValidResourceName` from `../state/iamLogic.js`.
- Produces: a functioning "Crear grupo" flow, and a management panel per group (add/remove members, attach/detach policies) — this is what satisfies Lab 02's checks 1-3.

- [ ] **Step 1: Rewrite the page**

Replace the full contents of `src/pages/Grupos.jsx` (currently reading the static `groups` array from `sampleData.js`) with:

```jsx
import { useState } from 'react';
import { IconQuestion, IconSearch } from '../components/icons.jsx';
import { Tag, ViewHeader, GuidePanelHead } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { createGroup, deleteGroup, addUserToGroup, removeUserFromGroup, attachPolicy, detachPolicy } from '../state/iamReducer.js';
import { isValidResourceName } from '../state/iamLogic.js';

export default function Grupos() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [query, setQuery] = useState('');
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [nameError, setNameError] = useState(false);
  const [managing, setManaging] = useState(null);
  const [memberToAdd, setMemberToAdd] = useState('');
  const [policyToAttach, setPolicyToAttach] = useState('');

  const groups = Object.values(state.groups).filter((g) => g.name.toLowerCase().includes(query.toLowerCase()));
  const allUsers = Object.values(state.users);
  const allPolicies = Object.values(state.policies);

  function submitNewGroup() {
    if (!isValidResourceName(newName)) { setNameError(true); return; }
    dispatch(createGroup({ name: newName.trim(), desc: newDesc.trim() }));
    setNewName(''); setNewDesc(''); setNameError(false); setCreating(false);
  }

  function openManage(groupId) {
    setManaging((current) => (current === groupId ? null : groupId));
    setMemberToAdd(''); setPolicyToAttach('');
  }

  const managedGroup = managing ? state.groups[managing] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Grupos de usuarios"
        title="Grupos de usuarios"
        intro="Un grupo reúne usuarios que necesitan los mismos permisos. Adjunta la política al grupo una vez y todos sus miembros la heredan; al sacar al usuario del grupo, pierde esos permisos."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setCreating((c) => !c)}>Crear grupo</button>}
      />

      {creating && (
        <section className="content-card" style={{ marginBottom: 'var(--space-4)' }}>
          <div className="field-row">
            <div className="field">
              <label htmlFor="grp-name">Nombre del grupo</label>
              <input id="grp-name" className={`input${nameError ? ' is-invalid' : ''}`} value={newName} onChange={(e) => { setNewName(e.target.value); setNameError(false); }} />
              {nameError && <div className="field-hint">Escribe un nombre para el grupo.</div>}
            </div>
            <div className="field">
              <label htmlFor="grp-desc">Descripción (opcional)</label>
              <input id="grp-desc" className="input" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
            </div>
          </div>
          <div className="footer-bar-actions" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={submitNewGroup}>Guardar grupo</button>
          </div>
        </section>
      )}

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div style={{ position: 'relative', maxWidth: 240, flex: 1 }}>
              <IconSearch style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input className="input" placeholder="Buscar grupo" style={{ paddingLeft: 30 }} value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <span className="toolbar-count">{groups.length} grupo{groups.length === 1 ? '' : 's'}</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Nombre del grupo</th><th>Usuarios</th><th>Políticas adjuntas</th><th></th></tr>
            </thead>
            <tbody>
              {groups.map((g) => (
                <tr key={g.id}>
                  <td>{g.name}</td>
                  <td>{g.members.length}</td>
                  <td>{g.policies.length ? <Tag text={`${g.policies.length} adjunta${g.policies.length === 1 ? '' : 's'}`} variant="accent" /> : <Tag text="Ninguna" variant="neutral" />}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => openManage(g.id)}>{managing === g.id ? 'Cerrar' : 'Gestionar'}</button>
                  </td>
                </tr>
              ))}
              {groups.length === 0 && (
                <tr><td colSpan={4} className="text-muted">No hay grupos que coincidan con &quot;{query}&quot;.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {managedGroup ? (
          <aside className="guide-panel">
            <div className="guide-panel-head">
              <span className="guide-panel-title">Gestionar {managedGroup.name}</span>
            </div>

            <div className="radio-group-label">Miembros</div>
            <div className="field-row">
              <select className="input" value={memberToAdd} onChange={(e) => setMemberToAdd(e.target.value)}>
                <option value="">Selecciona un usuario</option>
                {allUsers.filter((u) => !managedGroup.members.includes(u.username)).map((u) => (
                  <option key={u.username} value={u.username}>{u.username}</option>
                ))}
              </select>
              <button type="button" className="btn btn-secondary" disabled={!memberToAdd} onClick={() => { dispatch(addUserToGroup(memberToAdd, managedGroup.id)); setMemberToAdd(''); }}>Añadir</button>
            </div>
            <div className="checklist">
              {managedGroup.members.map((username) => (
                <div key={username} className="checklist-item is-checked">
                  <span>{username}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(removeUserFromGroup(username, managedGroup.id))}>Quitar</button>
                </div>
              ))}
              {managedGroup.members.length === 0 && <div className="text-muted">Sin miembros todavía.</div>}
            </div>

            <div className="radio-group-label" style={{ marginTop: 'var(--space-4)' }}>Políticas adjuntas</div>
            <div className="field-row">
              <select className="input" value={policyToAttach} onChange={(e) => setPolicyToAttach(e.target.value)}>
                <option value="">Selecciona una política</option>
                {allPolicies.filter((p) => !managedGroup.policies.includes(p.id)).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button type="button" className="btn btn-secondary" disabled={!policyToAttach} onClick={() => { dispatch(attachPolicy('group', managedGroup.id, policyToAttach)); setPolicyToAttach(''); }}>Adjuntar</button>
            </div>
            <div className="checklist">
              {managedGroup.policies.map((pid) => (
                <div key={pid} className="checklist-item is-checked">
                  <span>{state.policies[pid]?.name ?? pid}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(detachPolicy('group', managedGroup.id, pid))}>Quitar</button>
                </div>
              ))}
              {managedGroup.policies.length === 0 && <div className="text-muted">Sin políticas adjuntas.</div>}
            </div>

            <button type="button" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }} onClick={() => { dispatch(deleteGroup(managedGroup.id)); setManaging(null); }}>Eliminar grupo</button>
          </aside>
        ) : (
          <aside className="guide-panel">
            <GuidePanelHead icon={<IconQuestion style={{ color: 'var(--color-accent)' }} />} title="Guía interactiva" tag="Grupos" />
            <p>Los permisos siempre se conceden al grupo, nunca al usuario suelto: así basta una sola revisión para saber qué puede hacer toda una clase.</p>
            <div className="guide-note">Un grupo no tiene credenciales y no puede iniciar sesión. Tampoco se anida: un grupo no contiene otros grupos.</div>
            <div className="guide-inset">
              <div className="guide-inset-kicker">Práctica sugerida</div>
              Mete a <code className="mono">alumno-practicas-01</code> en <code className="mono">practicas-lectura</code> y comprueba que ya puede listar el bucket sin adjuntarle ninguna política propia.
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Remove the now-unused static `groups` export**

`grep -rn "from '../data/sampleData.js'" src/pages/Grupos.jsx` should now show no `groups` import. Check `grep -rn "\bgroups\b" src/data/sampleData.js` — if the `groups` array there is unused anywhere else (`grep -rln "data/sampleData" src` to list every importer, then check each), delete it from `sampleData.js`.

- [ ] **Step 3: Verify in the browser**

Navigate to `/iam/grupos`. Create a group named `practicas-lectura`. Click "Gestionar" — confirm the member/policy panels render (empty, since no users/policies exist yet unless Task 6/9 already ran in this session). No console errors.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Grupos.jsx src/data/sampleData.js
git commit -m "Wire Grupos page to real CRUD against the IAM store"
```

---

## Task 8: `Roles.jsx` — real CRUD + assume role

**Files:**
- Modify: `src/pages/Roles.jsx`

**Interfaces:**
- Consumes: `useIamState`, `useIamDispatch`; `createRole`, `deleteRole`, `assumeRole`, `clearRoleSession`, `attachPolicy`, `detachPolicy` from `../state/iamReducer.js`; `isValidResourceName` from `../state/iamLogic.js`.
- Produces: a functioning "Crear rol" flow (name, trust policy JSON, max duration), attach/detach policies, and an "Asumir rol" button that produces a real, expiring session — this satisfies Lab 04's checks 1-5.

- [ ] **Step 1: Rewrite the page**

Replace the full contents of `src/pages/Roles.jsx` with:

```jsx
import { useEffect, useState } from 'react';
import { IconQuestion } from '../components/icons.jsx';
import { ViewHeader, GuidePanelHead } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { createRole, deleteRole, assumeRole, clearRoleSession, attachPolicy, detachPolicy } from '../state/iamReducer.js';
import { isValidResourceName } from '../state/iamLogic.js';

const DEFAULT_TRUST_POLICY = `{
  "Effect": "Allow",
  "Principal": {
    "Service": "lambda.amazonaws.com"
  },
  "Action": "sts:AssumeRole"
}`;

function formatRemaining(expiresAt, now) {
  const ms = new Date(expiresAt).getTime() - now;
  if (ms <= 0) return 'Expirada';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds.toString().padStart(2, '0')}s restantes`;
}

export default function Roles() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTrust, setNewTrust] = useState(DEFAULT_TRUST_POLICY);
  const [newDuration, setNewDuration] = useState(60);
  const [formError, setFormError] = useState('');
  const [managing, setManaging] = useState(null);
  const [policyToAttach, setPolicyToAttach] = useState('');
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const hasActiveSession = Object.values(state.roles).some((r) => r.activeSession);
    if (!hasActiveSession) return undefined;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.roles]);

  const roles = Object.values(state.roles);
  const allPolicies = Object.values(state.policies);

  function submitNewRole() {
    if (!isValidResourceName(newName)) { setFormError('Escribe un nombre para el rol.'); return; }
    let parsedTrust;
    try {
      parsedTrust = JSON.parse(newTrust);
    } catch {
      setFormError('La política de confianza no es un JSON válido.');
      return;
    }
    dispatch(createRole({ name: newName.trim(), trustPolicy: parsedTrust, maxDurationMinutes: Number(newDuration) || 60 }));
    setNewName(''); setNewTrust(DEFAULT_TRUST_POLICY); setNewDuration(60); setFormError(''); setCreating(false);
  }

  const managedRole = managing ? state.roles[managing] : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Roles"
        title="Roles"
        intro="Un rol es un conjunto de permisos que se asume temporalmente. No tiene contraseña ni clave permanente: quien lo asume recibe credenciales que caducan."
        action={<button type="button" className="btn btn-primary" style={{ marginLeft: 'auto' }} onClick={() => setCreating((c) => !c)}>Crear rol</button>}
      />

      {creating && (
        <section className="content-card" style={{ marginBottom: 'var(--space-4)' }}>
          {formError && (
            <div role="alert" className="alert alert-danger"><div className="alert-body">{formError}</div></div>
          )}
          <div className="field-row">
            <div className="field">
              <label htmlFor="rol-name">Nombre del rol</label>
              <input id="rol-name" className="input" value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="rol-duration">Duración máxima (minutos)</label>
              <input id="rol-duration" type="number" min="1" className="input" value={newDuration} onChange={(e) => setNewDuration(e.target.value)} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="rol-trust">Política de confianza (JSON)</label>
            <textarea id="rol-trust" className="input mono" rows={7} value={newTrust} onChange={(e) => setNewTrust(e.target.value)} />
          </div>
          <div className="footer-bar-actions" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setCreating(false)}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={submitNewRole}>Guardar rol</button>
          </div>
        </section>
      )}

      <div className="content-grid">
        <section className="content-card">
          <table className="table">
            <thead>
              <tr><th>Nombre del rol</th><th>Políticas</th><th>Duración máx.</th><th>Sesión activa</th><th></th></tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.policies.length} adjunta{r.policies.length === 1 ? '' : 's'}</td>
                  <td>{r.maxDurationMinutes} min</td>
                  <td>{r.activeSession ? formatRemaining(r.activeSession.expiresAt, now) : '—'}</td>
                  <td>
                    <button type="button" className="btn btn-ghost" onClick={() => { setManaging((c) => (c === r.id ? null : r.id)); setPolicyToAttach(''); }}>{managing === r.id ? 'Cerrar' : 'Gestionar'}</button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr><td colSpan={5} className="text-muted">Todavía no hay roles.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        {managedRole ? (
          <aside className="guide-panel">
            <div className="guide-panel-head"><span className="guide-panel-title">Gestionar {managedRole.name}</span></div>

            <div className="radio-group-label">Políticas de permisos</div>
            <div className="field-row">
              <select className="input" value={policyToAttach} onChange={(e) => setPolicyToAttach(e.target.value)}>
                <option value="">Selecciona una política</option>
                {allPolicies.filter((p) => !managedRole.policies.includes(p.id)).map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <button type="button" className="btn btn-secondary" disabled={!policyToAttach} onClick={() => { dispatch(attachPolicy('role', managedRole.id, policyToAttach)); setPolicyToAttach(''); }}>Adjuntar</button>
            </div>
            <div className="checklist">
              {managedRole.policies.map((pid) => (
                <div key={pid} className="checklist-item is-checked">
                  <span>{state.policies[pid]?.name ?? pid}</span>
                  <button type="button" className="btn btn-ghost" onClick={() => dispatch(detachPolicy('role', managedRole.id, pid))}>Quitar</button>
                </div>
              ))}
              {managedRole.policies.length === 0 && <div className="text-muted">Sin políticas adjuntas todavía — el rol no puede hacer nada al asumirse.</div>}
            </div>

            <div className="radio-group-label" style={{ marginTop: 'var(--space-4)' }}>Sesión temporal</div>
            {managedRole.activeSession ? (
              <>
                <div className="credential-box">
                  <div className="credential-row"><span className="text-muted">Access Key ID</span><code className="mono">{managedRole.activeSession.accessKeyId}</code></div>
                  <div className="credential-row"><span className="text-muted">Session Token</span><code className="mono">{managedRole.activeSession.sessionToken.slice(0, 24)}…</code></div>
                  <div className="credential-row"><span className="text-muted">Expira</span><code className="mono">{formatRemaining(managedRole.activeSession.expiresAt, now)}</code></div>
                </div>
                <button type="button" className="btn btn-ghost" onClick={() => dispatch(clearRoleSession(managedRole.id))}>Cerrar sesión</button>
              </>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => dispatch(assumeRole(managedRole.id))}>Asumir rol</button>
            )}

            <button type="button" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)' }} onClick={() => { dispatch(deleteRole(managedRole.id)); setManaging(null); }}>Eliminar rol</button>
          </aside>
        ) : (
          <aside className="guide-panel">
            <GuidePanelHead icon={<IconQuestion style={{ color: 'var(--color-accent)' }} />} title="Usuario o rol" />
            <p>Usa un usuario cuando hay una persona detrás. Usa un rol cuando el que actúa es un servicio, una aplicación o alguien de otra cuenta: nadie guarda claves largas.</p>
            <div>
              <div className="guide-code-kicker" style={{ marginBottom: 5.6 }}>Política de confianza</div>
              <pre className="codeblock">{DEFAULT_TRUST_POLICY}</pre>
            </div>
            <div className="guide-caption">Este bloque dice quién puede asumir el rol. Los permisos que obtiene se declaran aparte, en las políticas adjuntas.</div>
          </aside>
        )}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Remove the now-unused static `roles` export**

Same check as Task 7: `grep -rln "data/sampleData" src` — confirm `roles` from `sampleData.js` is unused elsewhere, then delete it from that file.

- [ ] **Step 3: Verify in the browser**

Navigate to `/iam/roles`. Create a role (defaults are pre-filled and valid). Click "Gestionar" → "Asumir rol" — confirm a session box appears with a live countdown (watch it tick down a few seconds), and that "Cerrar sesión" clears it back to the "Asumir rol" button.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Roles.jsx src/data/sampleData.js
git commit -m "Wire Roles page to real CRUD, policy attachment and assume-role sessions"
```

---

## Task 9: `Politicas.jsx` — real CRUD

**Files:**
- Modify: `src/pages/Politicas.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useIamState`, `useIamDispatch`; `createPolicy`, `updatePolicy`, `deletePolicy` from `../state/iamReducer.js`; `isValidResourceName` from `../state/iamLogic.js`.
- Produces: a functioning "Crear política"/"Editar" flow with JSON validation, and a "Simular" link per row that navigates to the Policy Simulator (built in Task 11) with that policy pre-selected via a query parameter `?policy=<id>`.

- [ ] **Step 1: Rewrite the page**

Replace the full contents of `src/pages/Politicas.jsx` with:

```jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, ViewHeader } from '../components/ui.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { createPolicy, updatePolicy, deletePolicy } from '../state/iamReducer.js';
import { isValidResourceName } from '../state/iamLogic.js';

const TYPE_FILTERS = ['Todas', 'Administrada', 'Propia del curso'];
const BLANK_DOCUMENT = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "s3:GetObject",
      "Resource": "*"
    }
  ]
}`;

export default function Politicas() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [filter, setFilter] = useState('Todas');
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('Propia del curso');
  const [documentText, setDocumentText] = useState(BLANK_DOCUMENT);
  const [error, setError] = useState('');

  const policies = Object.values(state.policies).filter((p) => filter === 'Todas' || p.type === filter);

  function openCreate() {
    setEditingId(null); setName(''); setType('Propia del curso'); setDocumentText(BLANK_DOCUMENT); setError(''); setFormOpen(true);
  }

  function openEdit(policy) {
    setEditingId(policy.id); setName(policy.name); setType(policy.type);
    setDocumentText(JSON.stringify(policy.document, null, 2)); setError(''); setFormOpen(true);
  }

  function submit() {
    if (!isValidResourceName(name)) { setError('Escribe un nombre para la política.'); return; }
    let parsedDocument;
    try {
      parsedDocument = JSON.parse(documentText);
    } catch {
      setError('MalformedPolicyDocument: el JSON de la política no es válido.');
      return;
    }
    if (editingId) dispatch(updatePolicy(editingId, { name: name.trim(), type, document: parsedDocument }));
    else dispatch(createPolicy({ name: name.trim(), type, document: parsedDocument }));
    setFormOpen(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Políticas"
        title="Políticas"
        intro="Cada política es un documento JSON con permisos. Se adjunta a usuarios, grupos o roles, y una misma política puede estar adjunta en varios sitios a la vez."
        action={
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-3)' }}>
            <Link to="/iam/politicas/simulador" className="btn btn-secondary">Simulador de políticas</Link>
            <button type="button" className="btn btn-primary" onClick={openCreate}>Crear política</button>
          </div>
        }
      />

      {formOpen && (
        <section className="content-card" style={{ marginBottom: 'var(--space-4)' }}>
          {error && <div role="alert" className="alert alert-danger"><div className="alert-body">{error}</div></div>}
          <div className="field-row">
            <div className="field">
              <label htmlFor="pol-name">Nombre</label>
              <input id="pol-name" className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="pol-type">Tipo</label>
              <select id="pol-type" className="input" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Propia del curso">Propia del curso</option>
                <option value="Administrada">Administrada</option>
              </select>
            </div>
          </div>
          <div className="field">
            <label htmlFor="pol-doc">Documento (JSON)</label>
            <textarea id="pol-doc" className="input mono" rows={10} value={documentText} onChange={(e) => setDocumentText(e.target.value)} />
          </div>
          <div className="footer-bar-actions" style={{ justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-ghost" onClick={() => setFormOpen(false)}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={submit}>{editingId ? 'Guardar cambios' : 'Guardar política'}</button>
          </div>
        </section>
      )}

      <div className="content-grid">
        <section className="content-card">
          <div className="toolbar-row">
            <div className="seg">
              {TYPE_FILTERS.map((opt) => (
                <label key={opt} className="seg-opt">
                  <input type="radio" name="tipo-pol" checked={filter === opt} onChange={() => setFilter(opt)} />
                  {opt}
                </label>
              ))}
            </div>
            <span className="toolbar-count">{policies.length} política{policies.length === 1 ? '' : 's'}</span>
          </div>
          <table className="table">
            <thead>
              <tr><th>Nombre</th><th>Tipo</th><th></th></tr>
            </thead>
            <tbody>
              {policies.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td><Tag text={p.type} variant={p.type === 'Administrada' ? 'neutral' : 'accent'} /></td>
                  <td style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button type="button" className="btn btn-ghost" onClick={() => openEdit(p)}>Editar</button>
                    <Link to={`/iam/politicas/simulador?policy=${p.id}`} className="btn btn-ghost">Simular</Link>
                    <button type="button" className="btn btn-ghost" onClick={() => dispatch(deletePolicy(p.id))}>Eliminar</button>
                  </td>
                </tr>
              ))}
              {policies.length === 0 && (
                <tr><td colSpan={3} className="text-muted">Todavía no hay políticas.</td></tr>
              )}
            </tbody>
          </table>
        </section>

        <aside className="guide-panel">
          <div className="guide-panel-head">
            <span className="guide-panel-title">Cómo se evalúa</span>
            <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>Orden</span>
          </div>
          <div className="guide-defs">
            <div><strong>1.</strong> Todo está denegado por defecto.</div>
            <div><strong>2.</strong> Un <code className="mono">Allow</code> en cualquier política adjunta concede el permiso.</div>
            <div><strong>3.</strong> Un <code className="mono">Deny</code> explícito gana siempre, aunque haya diez Allow.</div>
          </div>
        </aside>
      </div>
    </div>
  );
}
```

(This drops the old hardcoded "Riesgo detectado: AdministradorTotal..." warning panel, since that policy no longer exists as static sample data — nothing in the new store seeds it. This is intentional, not an oversight: the guidance now speaks generically instead of pointing at a phantom resource.)

- [ ] **Step 2: Remove the now-unused static `policies` export**

Same check as Tasks 7-8: confirm via `grep -rln "data/sampleData" src` that `policies` from `sampleData.js` is unused elsewhere, then delete it from that file.

- [ ] **Step 3: Register the Simulator route placeholder is NOT done here**

The route `iam/politicas/simulador` is added in Task 11 together with the `PolicySimulator.jsx` component itself — do not add the route in this task, since the target component doesn't exist yet. The "Simulador de políticas" link/button created in Step 1 above will 404 until Task 11 lands; that's expected and acceptable given the phase order in this plan.

- [ ] **Step 4: Verify in the browser**

Navigate to `/iam/politicas`. Create a policy with the pre-filled default JSON. Edit it (change the `Resource` value, save, confirm the table still shows it). Delete it. Confirm the filter radios (`Todas`/`Administrada`/`Propia del curso`) work against real data.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Politicas.jsx src/data/sampleData.js
git commit -m "Wire Politicas page to real CRUD with JSON validation"
```

---

## Task 10: `policyEngine.js` — the Allow/Deny evaluation engine

**Files:**
- Create: `src/state/policyEngine.js`
- Test: `src/state/policyEngine.test.js`

**Interfaces:**
- Consumes: nothing (pure module; takes a plain `state` object shaped like `iamReducer`'s state — no import of `iamReducer.js` needed, just the data shape).
- Produces (used by Task 11, and by Task 12's lab checks):
  - `evaluate({ principal, action, resource, state }): { effect: 'Allow'|'Deny', reason: 'explicit-deny'|'allow'|'implicit-deny', matchedStatements: Array<{ policyId: string|null, policyName: string, statement: object }> }`
  - `principal` shape: `{ type: 'user'|'role', id: string }`.
  - Also exported for direct use by the Simulator (Task 11): `evaluateAgainstDocument({ document, action, resource, mfaPresent }): { effect, matchedStatements }` — evaluates a single raw policy document (not yet saved/attached), used by the Simulator's "probar un JSON suelto" mode.

- [ ] **Step 1: Write the failing tests**

Create `src/state/policyEngine.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { evaluate, evaluateAgainstDocument } from './policyEngine.js';

function baseState(overrides = {}) {
  return {
    users: {}, groups: {}, policies: {}, roles: {}, labs: {},
    ...overrides,
  };
}

const readDoc = {
  Version: '2012-10-17',
  Statement: [{ Effect: 'Allow', Action: ['s3:GetObject', 's3:ListBucket'], Resource: ['arn:aws:s3:::practicas-curso', 'arn:aws:s3:::practicas-curso/*'] }],
};

const denyDeleteDoc = {
  Version: '2012-10-17',
  Statement: [{ Effect: 'Deny', Action: 's3:DeleteObject', Resource: 'arn:aws:s3:::practicas-curso/*' }],
};

describe('evaluate: implicit deny', () => {
  it('denies when nothing matches at all', () => {
    const state = baseState({ users: { alumno: { username: 'alumno', groups: [], policies: [], mfaEnabled: false } } });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state });
    expect(result.effect).toBe('Deny');
    expect(result.reason).toBe('implicit-deny');
  });
});

describe('evaluate: allow via a directly-attached policy', () => {
  it('allows a matching action/resource', () => {
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: [], policies: ['pol-1'], mfaEnabled: false } },
      policies: { 'pol-1': { id: 'pol-1', name: 'LecturaS3', document: readDoc } },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state });
    expect(result.effect).toBe('Allow');
    expect(result.reason).toBe('allow');
    expect(result.matchedStatements[0].policyName).toBe('LecturaS3');
  });
});

describe('evaluate: allow via group membership', () => {
  it('allows through a policy attached to the group, not the user', () => {
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: ['grp-1'], policies: [], mfaEnabled: false } },
      groups: { 'grp-1': { id: 'grp-1', name: 'practicas-lectura', members: ['alumno'], policies: ['pol-1'] } },
      policies: { 'pol-1': { id: 'pol-1', name: 'LecturaS3', document: readDoc } },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:ListBucket', resource: 'arn:aws:s3:::practicas-curso', state });
    expect(result.effect).toBe('Allow');
  });
});

describe('evaluate: explicit deny always wins', () => {
  it('denies DeleteObject even though the group grants broad s3 access', () => {
    const broadAllow = { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: 's3:*', Resource: 'arn:aws:s3:::practicas-curso/*' }] };
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: ['grp-1'], policies: ['pol-deny'], mfaEnabled: false } },
      groups: { 'grp-1': { id: 'grp-1', name: 'g', members: ['alumno'], policies: ['pol-allow'] } },
      policies: {
        'pol-allow': { id: 'pol-allow', name: 'Amplia', document: broadAllow },
        'pol-deny': { id: 'pol-deny', name: 'DenegarBorrado', document: denyDeleteDoc },
      },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:DeleteObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state });
    expect(result.effect).toBe('Deny');
    expect(result.reason).toBe('explicit-deny');
  });

  it('still allows the actions the Deny does not cover', () => {
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: [], policies: ['pol-read', 'pol-deny'], mfaEnabled: false } },
      policies: {
        'pol-read': { id: 'pol-read', name: 'LecturaS3', document: readDoc },
        'pol-deny': { id: 'pol-deny', name: 'DenegarBorrado', document: denyDeleteDoc },
      },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state });
    expect(result.effect).toBe('Allow');
  });
});

describe('evaluate: role principal uses role policies, not trust policy', () => {
  it('allows based on the role permissions policy', () => {
    const state = baseState({
      roles: { 'rol-1': { id: 'rol-1', name: 'RolLectura', policies: ['pol-1'], trustPolicy: {} } },
      policies: { 'pol-1': { id: 'pol-1', name: 'LecturaS3', document: readDoc } },
    });
    const result = evaluate({ principal: { type: 'role', id: 'rol-1' }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state });
    expect(result.effect).toBe('Allow');
  });
});

describe('evaluate: MFA condition', () => {
  const mfaDoc = {
    Version: '2012-10-17',
    Statement: [{ Effect: 'Allow', Action: 'iam:DeleteUser', Resource: '*', Condition: { 'aws:MultiFactorAuthPresent': true } }],
  };

  it('does not allow when the condition requires MFA and the user has none', () => {
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: [], policies: ['pol-1'], mfaEnabled: false } },
      policies: { 'pol-1': { id: 'pol-1', name: 'MfaRequerida', document: mfaDoc } },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 'iam:DeleteUser', resource: '*', state });
    expect(result.effect).toBe('Deny');
    expect(result.reason).toBe('implicit-deny');
  });

  it('allows once the user has MFA enabled', () => {
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: [], policies: ['pol-1'], mfaEnabled: true } },
      policies: { 'pol-1': { id: 'pol-1', name: 'MfaRequerida', document: mfaDoc } },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 'iam:DeleteUser', resource: '*', state });
    expect(result.effect).toBe('Allow');
  });
});

describe('evaluate: wildcard matching', () => {
  it('matches Action wildcards like s3:*', () => {
    const doc = { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: 's3:*', Resource: '*' }] };
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: [], policies: ['pol-1'], mfaEnabled: false } },
      policies: { 'pol-1': { id: 'pol-1', name: 'Todo S3', document: doc } },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:PutObject', resource: 'arn:aws:s3:::x/y', state });
    expect(result.effect).toBe('Allow');
  });

  it('matches Resource wildcards like arn:aws:s3:::bucket/*', () => {
    const state = baseState({
      users: { alumno: { username: 'alumno', groups: [], policies: ['pol-1'], mfaEnabled: false } },
      policies: { 'pol-1': { id: 'pol-1', name: 'LecturaS3', document: readDoc } },
    });
    const result = evaluate({ principal: { type: 'user', id: 'alumno' }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/carpeta/archivo.txt', state });
    expect(result.effect).toBe('Allow');
  });
});

describe('evaluateAgainstDocument: for the Simulator\'s "raw JSON" mode', () => {
  it('evaluates a document that is not attached to anyone yet', () => {
    const result = evaluateAgainstDocument({ document: readDoc, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x', mfaPresent: false });
    expect(result.effect).toBe('Allow');
  });

  it('denies an unrelated action', () => {
    const result = evaluateAgainstDocument({ document: readDoc, action: 's3:DeleteObject', resource: 'arn:aws:s3:::practicas-curso/x', mfaPresent: false });
    expect(result.effect).toBe('Deny');
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test`
Expected: FAIL — `src/state/policyEngine.js` does not exist yet.

- [ ] **Step 3: Implement `policyEngine.js`**

Create `src/state/policyEngine.js`:

```js
function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function wildcardToRegExp(pattern) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*');
  return new RegExp(`^${escaped}$`);
}

function matchesAny(patterns, value) {
  return patterns.some((pattern) => wildcardToRegExp(pattern).test(value));
}

function conditionSatisfied(statement, mfaPresent) {
  const required = statement.Condition && statement.Condition['aws:MultiFactorAuthPresent'];
  if (required === undefined) return true;
  return Boolean(required) === Boolean(mfaPresent);
}

function statementMatches(statement, action, resource, mfaPresent) {
  if (!matchesAny(toArray(statement.Action), action)) return false;
  if (!matchesAny(toArray(statement.Resource), resource)) return false;
  return conditionSatisfied(statement, mfaPresent);
}

function decide(matchedStatements) {
  const explicitDeny = matchedStatements.find((m) => m.statement.Effect === 'Deny');
  if (explicitDeny) return { effect: 'Deny', reason: 'explicit-deny', matchedStatements: [explicitDeny] };
  const allow = matchedStatements.find((m) => m.statement.Effect === 'Allow');
  if (allow) return { effect: 'Allow', reason: 'allow', matchedStatements: [allow] };
  return { effect: 'Deny', reason: 'implicit-deny', matchedStatements: [] };
}

function collectPolicyIds(principal, state) {
  if (principal.type === 'user') {
    const user = state.users[principal.id];
    if (!user) return [];
    const groupPolicyIds = user.groups.flatMap((groupId) => state.groups[groupId]?.policies ?? []);
    return [...user.policies, ...groupPolicyIds];
  }
  if (principal.type === 'role') {
    const role = state.roles[principal.id];
    return role ? role.policies : [];
  }
  return [];
}

function mfaPresentFor(principal, state) {
  if (principal.type === 'user') return Boolean(state.users[principal.id]?.mfaEnabled);
  return false;
}

export function evaluate({ principal, action, resource, state }) {
  const policyIds = collectPolicyIds(principal, state);
  const mfaPresent = mfaPresentFor(principal, state);

  const matched = [];
  policyIds.forEach((policyId) => {
    const policy = state.policies[policyId];
    if (!policy) return;
    policy.document.Statement.forEach((statement) => {
      if (statementMatches(statement, action, resource, mfaPresent)) {
        matched.push({ policyId: policy.id, policyName: policy.name, statement });
      }
    });
  });

  return decide(matched);
}

export function evaluateAgainstDocument({ document, action, resource, mfaPresent = false }) {
  const matched = [];
  document.Statement.forEach((statement) => {
    if (statementMatches(statement, action, resource, mfaPresent)) {
      matched.push({ policyId: null, policyName: '(documento sin guardar)', statement });
    }
  });
  return decide(matched);
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS, all `policyEngine` tests green, and every earlier `.test.js` (Tasks 2, 3) still green.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 6: Commit**

```bash
git add src/state/policyEngine.js src/state/policyEngine.test.js
git commit -m "Add policyEngine: Allow/Deny evaluation with explicit-deny and MFA condition support"
```

---

## Task 11: `PolicySimulator.jsx` — new page

**Files:**
- Create: `src/pages/PolicySimulator.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useIamState` from `../state/iamStore.jsx`; `evaluate`, `evaluateAgainstDocument` from `../state/policyEngine.js`.
- Produces: route `iam/politicas/simulador`, reachable from the "Simulador de políticas" button added in Task 9 and from each policy row's "Simular" link (`?policy=<id>` pre-selects that policy's document in raw-JSON mode).

- [ ] **Step 1: Implement the page**

Create `src/pages/PolicySimulator.jsx`:

```jsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ViewHeader } from '../components/ui.jsx';
import { useIamState } from '../state/iamStore.jsx';
import { evaluate, evaluateAgainstDocument } from '../state/policyEngine.js';

export default function PolicySimulator() {
  const state = useIamState();
  const [searchParams] = useSearchParams();
  const preselectedPolicyId = searchParams.get('policy');
  const preselectedPolicy = preselectedPolicyId ? state.policies[preselectedPolicyId] : null;

  const [mode, setMode] = useState(preselectedPolicy ? 'document' : 'principal');
  const [principalType, setPrincipalType] = useState('user');
  const [principalId, setPrincipalId] = useState('');
  const [action, setAction] = useState('s3:GetObject');
  const [resource, setResource] = useState('arn:aws:s3:::practicas-curso/archivo.txt');
  const [documentText, setDocumentText] = useState(
    preselectedPolicy ? JSON.stringify(preselectedPolicy.document, null, 2) : '{\n  "Version": "2012-10-17",\n  "Statement": []\n}',
  );
  const [mfaPresent, setMfaPresent] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const users = Object.values(state.users);
  const roles = Object.values(state.roles);

  function run() {
    setError('');
    if (mode === 'principal') {
      if (!principalId) { setError('Selecciona un principal (usuario o rol).'); return; }
      setResult(evaluate({ principal: { type: principalType, id: principalId }, action, resource, state }));
      return;
    }
    try {
      const document = JSON.parse(documentText);
      setResult(evaluateAgainstDocument({ document, action, resource, mfaPresent }));
    } catch {
      setError('MalformedPolicyDocument: el JSON de la política no es válido.');
      setResult(null);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <ViewHeader
        crumb="IAM › Políticas › Simulador"
        title="Simulador de políticas"
        intro="Prueba si una acción sobre un recurso queda permitida o denegada, usando las políticas reales de un usuario o rol, o un documento JSON suelto que todavía no has guardado."
      />

      <div className="content-grid">
        <section className="content-card">
          <div className="radio-group">
            <label className="radio">
              <input type="radio" name="modo-sim" checked={mode === 'principal'} onChange={() => setMode('principal')} />
              <span className="dot" />
              <span>Usar las políticas reales de un usuario o rol</span>
            </label>
            <label className="radio">
              <input type="radio" name="modo-sim" checked={mode === 'document'} onChange={() => setMode('document')} />
              <span className="dot" />
              <span>Probar un documento JSON suelto</span>
            </label>
          </div>

          {mode === 'principal' ? (
            <div className="field-row">
              <div className="field">
                <label htmlFor="sim-type">Tipo de principal</label>
                <select id="sim-type" className="input" value={principalType} onChange={(e) => { setPrincipalType(e.target.value); setPrincipalId(''); }}>
                  <option value="user">Usuario</option>
                  <option value="role">Rol</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="sim-principal">Principal</label>
                <select id="sim-principal" className="input" value={principalId} onChange={(e) => setPrincipalId(e.target.value)}>
                  <option value="">Selecciona uno</option>
                  {(principalType === 'user' ? users.map((u) => u.username) : roles.map((r) => r.id)).map((id) => (
                    <option key={id} value={id}>{principalType === 'user' ? id : state.roles[id].name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : (
            <>
              <div className="field">
                <label htmlFor="sim-doc">Documento (JSON)</label>
                <textarea id="sim-doc" className="input mono" rows={10} value={documentText} onChange={(e) => setDocumentText(e.target.value)} />
              </div>
              <label className="checkbox">
                <input type="checkbox" checked={mfaPresent} onChange={(e) => setMfaPresent(e.target.checked)} />
                <span className="box" />
                <span>Simular con MFA presente</span>
              </label>
            </>
          )}

          <div className="field-row" style={{ marginTop: 'var(--space-4)' }}>
            <div className="field">
              <label htmlFor="sim-action">Action</label>
              <input id="sim-action" className="input mono" value={action} onChange={(e) => setAction(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="sim-resource">Resource</label>
              <input id="sim-resource" className="input mono" value={resource} onChange={(e) => setResource(e.target.value)} />
            </div>
          </div>

          {error && <div role="alert" className="alert alert-danger"><div className="alert-body">{error}</div></div>}

          <button type="button" className="btn btn-primary" onClick={run}>Probar</button>

          {result && (
            <div className={`alert ${result.effect === 'Allow' ? 'alert-warning' : 'alert-danger'}`} style={{ marginTop: 'var(--space-4)' }}>
              <div className="alert-title">{result.effect === 'Allow' ? 'Allow' : 'Deny'} — {result.reason}</div>
              <div className="alert-body">
                {result.matchedStatements.length === 0
                  ? 'Ninguna política adjunta permite esta acción sobre este recurso: queda denegada por defecto.'
                  : `Decidido por la política "${result.matchedStatements[0].policyName}": ${JSON.stringify(result.matchedStatements[0].statement)}`}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Register the route**

Edit `src/App.jsx`:

```jsx
import PolicySimulator from './pages/PolicySimulator.jsx';
```

Add this import and, right after the `iam/politicas` route, add:

```jsx
          <Route path="iam/politicas/simulador" element={<PolicySimulator />} />
```

- [ ] **Step 3: Verify in the browser**

Navigate to `/iam/politicas`. Create a policy allowing `s3:GetObject` on `arn:aws:s3:::practicas-curso/*` if none exists yet. Click "Simulador de políticas". In "Probar un documento JSON suelto" mode, run the default action/resource — expect `Deny (implicit-deny)` for the empty starter document. Paste a real Allow document, run again, expect `Allow`.

Then go back to `/iam/politicas`, click "Simular" on a real saved policy row, confirm the Simulator opens with that policy's JSON pre-filled in document mode.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/PolicySimulator.jsx src/App.jsx
git commit -m "Add Policy Simulator page"
```

---

## Task 12: `labDefinitions.js` — the 6 labs, declaratively

**Files:**
- Create: `src/data/labDefinitions.js`

**Interfaces:**
- Consumes: `evaluate` from `../state/policyEngine.js`; `createGroup`, `createPolicy`, `attachPolicy`, `createUser`, `addUserToGroup` action creators from `../state/iamReducer.js` (used only inside Lab 05's `seed`).
- Produces (used by Task 13 and 14): `labDefinitions: LabDef[]` and `labDefinitionsById: Record<string, LabDef>`, where:

```ts
type LabDef = {
  id: string, title: string, duration: string, requires: string[],
  intro: string,
  steps: Array<{ title: string, body: string }>,
  seed?: (dispatch, state) => void,   // idempotent: checks before creating
  checks: Array<{ id: string, label: string, verify: (state) => boolean }>,
}
```

- [ ] **Step 1: Implement `labDefinitions.js`**

Create `src/data/labDefinitions.js`:

```js
import { evaluate } from '../state/policyEngine.js';
import { createGroup, createPolicy, attachPolicy, createUser, addUserToGroup } from '../state/iamReducer.js';

const LAB05_SEED_MARKER_GROUP_NAME = 'lab05-soporte';

function findByName(collection, name) {
  return Object.values(collection).find((item) => item.name === name);
}

export const labDefinitions = [
  {
    id: '01',
    title: 'Crear tu primer usuario IAM',
    duration: '15 min',
    requires: [],
    intro: 'Ve a Usuarios → Crear usuario y completa el asistente de tres pasos: nombre, contraseña que cumpla la política de la cuenta, y descarga de credenciales.',
    steps: [
      { title: 'Configura el usuario', body: 'Elige un nombre de usuario válido y una contraseña de al menos 12 caracteres con mayúscula, número y símbolo.' },
      { title: 'Activa el cambio de contraseña obligatorio', body: 'Marca la casilla "Requerir cambio de contraseña en el primer inicio de sesión".' },
      { title: 'Crea el usuario y descarga sus credenciales', body: 'Confirma la creación y descarga el archivo .csv desde la barra inferior — solo se muestra una vez.' },
    ],
    checks: [
      { id: 'existe', label: 'El usuario existe', verify: (state) => Object.keys(state.users).length > 0 },
      { id: 'nombre-valido', label: 'Su nombre de usuario tiene un formato válido', verify: (state) => Object.values(state.users).some((u) => /^[A-Za-z0-9+=,.@_-]+$/.test(u.username)) },
      { id: 'password-valida', label: 'Su contraseña cumple la política de la cuenta', verify: (state) => Object.values(state.users).some((u) => u.accessType === 'console' && typeof u.password === 'string' && u.password.length >= 12 && /[A-Z]/.test(u.password) && /[0-9]/.test(u.password) && /[^A-Za-z0-9]/.test(u.password)) },
      { id: 'reset-activado', label: '"Requerir cambio de contraseña" está activado', verify: (state) => Object.values(state.users).some((u) => u.requirePasswordReset) },
      { id: 'credenciales-descargadas', label: 'Descargaste sus credenciales', verify: (state) => Object.values(state.users).some((u) => u.credentialsDownloaded) },
    ],
  },

  {
    id: '02',
    title: 'Permisos por grupo, no por persona',
    duration: '20 min',
    requires: [],
    intro: 'Crea el grupo practicas-lectura, adjúntale la política LecturaS3, y mete dentro al menos dos usuarios — sin adjuntarles esa política directamente a ninguno.',
    steps: [
      { title: 'Crea el grupo', body: 'En Grupos, crea uno llamado exactamente practicas-lectura.' },
      { title: 'Crea y adjunta la política', body: 'En Políticas, crea LecturaS3 (Allow sobre s3:GetObject/s3:ListBucket) y adjúntala al grupo desde "Gestionar".' },
      { title: 'Añade dos usuarios', body: 'Desde "Gestionar" en el grupo, añade al menos dos usuarios como miembros.' },
    ],
    checks: [
      { id: 'grupo-existe', label: 'Existe el grupo practicas-lectura', verify: (state) => Boolean(findByName(state.groups, 'practicas-lectura')) },
      {
        id: 'politica-en-grupo',
        label: 'LecturaS3 está adjunta al grupo',
        verify: (state) => {
          const group = findByName(state.groups, 'practicas-lectura');
          const policy = findByName(state.policies, 'LecturaS3');
          return Boolean(group && policy && group.policies.includes(policy.id));
        },
      },
      {
        id: 'dos-miembros',
        label: 'El grupo tiene al menos dos usuarios',
        verify: (state) => {
          const group = findByName(state.groups, 'practicas-lectura');
          return Boolean(group && group.members.length >= 2);
        },
      },
      {
        id: 'sin-politica-directa',
        label: 'Ningún usuario tiene LecturaS3 adjunta directamente',
        verify: (state) => {
          const policy = findByName(state.policies, 'LecturaS3');
          if (!policy) return false;
          return Object.values(state.users).every((u) => !u.policies.includes(policy.id));
        },
      },
      {
        id: 'acceso-por-grupo',
        label: 'Un miembro del grupo puede leer el bucket a través del grupo',
        verify: (state) => {
          const group = findByName(state.groups, 'practicas-lectura');
          if (!group || group.members.length === 0) return false;
          return group.members.some((username) => evaluate({ principal: { type: 'user', id: username }, action: 's3:GetObject', resource: 'arn:aws:s3:::practicas-curso/x.txt', state }).effect === 'Allow');
        },
      },
    ],
  },

  {
    id: '03',
    title: 'Escribir una política desde cero',
    duration: '25 min',
    requires: [],
    intro: 'Redacta el JSON de una política llamada AccesoControladoS3 que permita leer el bucket de prácticas y deniegue explícitamente su borrado. Pruébala en el Simulador antes de darla por buena.',
    steps: [
      { title: 'Escribe el Allow de lectura', body: 'Effect Allow, Action s3:GetObject y s3:ListBucket, Resource sobre arn:aws:s3:::practicas-curso y su contenido.' },
      { title: 'Añade el Deny explícito', body: 'Un segundo Statement con Effect Deny sobre s3:DeleteObject en el mismo bucket.' },
      { title: 'Pruébala en el Simulador', body: 'Ve a Políticas → Simular sobre esta política. Prueba primero s3:GetObject (debe dar Allow) y luego s3:DeleteObject (debe dar Deny).' },
    ],
    checks: [
      {
        id: 'json-valido',
        label: 'La política AccesoControladoS3 existe (su JSON es válido — Políticas rechaza guardar uno inválido)',
        verify: (state) => Boolean(findByName(state.policies, 'AccesoControladoS3')),
      },
      {
        id: 'allow-lectura',
        label: 'La política tiene un Allow de lectura sobre el bucket de prácticas',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          return evaluateAgainstPolicy(policy, 's3:GetObject', 'arn:aws:s3:::practicas-curso/archivo.txt').effect === 'Allow';
        },
      },
      {
        id: 'deny-borrado',
        label: 'La política tiene un Deny explícito sobre el borrado',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          const result = evaluateAgainstPolicy(policy, 's3:DeleteObject', 'arn:aws:s3:::practicas-curso/archivo.txt');
          return result.effect === 'Deny' && result.reason === 'explicit-deny';
        },
      },
      {
        id: 'simulado-allow',
        label: 'Simulador: la acción de lectura da Allow (misma condición que el paso anterior, confirmada desde el Simulador)',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          return evaluateAgainstPolicy(policy, 's3:GetObject', 'arn:aws:s3:::practicas-curso/archivo.txt').effect === 'Allow';
        },
      },
      {
        id: 'simulado-deny',
        label: 'Simulador: la acción de borrado da Deny',
        verify: (state) => {
          const policy = findByName(state.policies, 'AccesoControladoS3');
          if (!policy) return false;
          return evaluateAgainstPolicy(policy, 's3:DeleteObject', 'arn:aws:s3:::practicas-curso/archivo.txt').effect === 'Deny';
        },
      },
    ],
  },

  {
    id: '04',
    title: 'Asumir un rol temporal',
    duration: '20 min',
    requires: [],
    intro: 'Crea un rol con una política de confianza válida, adjúntale al menos una política de permisos, y asúmelo para obtener credenciales temporales.',
    steps: [
      { title: 'Crea el rol', body: 'En Roles, crea uno con la política de confianza por defecto (o la tuya propia) y una duración máxima razonable.' },
      { title: 'Adjunta una política de permisos', body: 'Desde "Gestionar", adjunta al menos una política — un rol sin políticas no puede hacer nada al asumirse.' },
      { title: 'Asume el rol', body: 'Pulsa "Asumir rol" y observa las credenciales temporales y su cuenta regresiva.' },
    ],
    checks: [
      { id: 'rol-existe', label: 'El rol existe', verify: (state) => Object.keys(state.roles).length > 0 },
      {
        id: 'trust-correcta',
        label: 'Su política de confianza tiene Principal y sts:AssumeRole',
        verify: (state) => Object.values(state.roles).some((r) => r.trustPolicy && r.trustPolicy.Principal && r.trustPolicy.Action === 'sts:AssumeRole'),
      },
      { id: 'permisos-adjuntos', label: 'Tiene al menos una política de permisos adjunta', verify: (state) => Object.values(state.roles).some((r) => r.policies.length > 0) },
      { id: 'asumido', label: 'El rol fue asumido', verify: (state) => Object.values(state.roles).some((r) => r.activeSession) },
      {
        id: 'expira',
        label: 'La sesión tiene una fecha de expiración futura',
        verify: (state) => Object.values(state.roles).some((r) => r.activeSession && new Date(r.activeSession.expiresAt).getTime() > Date.now()),
      },
    ],
  },

  {
    id: '05',
    title: 'Depurar un acceso denegado',
    duration: '30 min',
    requires: ['03'],
    intro: 'Un usuario de soporte no puede subir archivos al bucket de prácticas. Usa el Simulador para encontrar el Deny explícito que se lo impide, y corrígelo.',
    steps: [
      { title: 'Reproduce el problema', body: 'Ve al Simulador y prueba s3:PutObject sobre arn:aws:s3:::practicas-curso/reportes/x.txt para el usuario lab05-usuario-soporte. Confirma que da Deny.' },
      { title: 'Encuentra el statement responsable', body: 'El resultado del Simulador indica qué política decidió. Ábrela en Políticas.' },
      { title: 'Corrígela', body: 'Elimina o ajusta el Deny bloqueante, sin ampliar el resto de los permisos del usuario más de lo necesario.' },
    ],
    seed: (dispatch, state) => {
      if (findByName(state.groups, LAB05_SEED_MARKER_GROUP_NAME)) return; // idempotent: ya sembrado
      dispatch(createUser({ username: 'lab05-usuario-soporte', courseTag: 'lab=05', accessType: 'console', password: 'Soporte2026!!', requirePasswordReset: true }));
      dispatch(createGroup({ name: LAB05_SEED_MARKER_GROUP_NAME, desc: 'Precargado por el Laboratorio 05' }));
      dispatch(createPolicy({
        name: 'Lab05-DenegarSubida',
        type: 'Propia del curso',
        document: { Version: '2012-10-17', Statement: [{ Effect: 'Deny', Action: 's3:PutObject', Resource: 'arn:aws:s3:::practicas-curso/*' }] },
      }));
      // Nota: las dos últimas dispatch de este seed asumen que el reducer ya
      // procesó las anteriores en el mismo ciclo de render (React 18+ agrupa
      // dispatches síncronos y aplica cada reducer sobre el resultado del
      // anterior dentro del mismo batch, por lo que el grupo y la política
      // recién creados ya existen para las líneas siguientes).
    },
    checks: [
      {
        id: 'diagnosticado',
        label: 'Localizaste el Deny explícito con el Simulador',
        verify: (state) => Boolean(findByName(state.policies, 'Lab05-DenegarSubida')),
      },
      {
        id: 'corregido',
        label: 'El Deny bloqueante fue corregido o eliminado',
        verify: (state) => {
          const user = findByName(state.users, 'lab05-usuario-soporte');
          if (!user) return false;
          return evaluate({ principal: { type: 'user', id: user.username }, action: 's3:PutObject', resource: 'arn:aws:s3:::practicas-curso/reportes/x.txt', state }).effect === 'Allow';
        },
      },
      {
        id: 'confirmado-simulador',
        label: 'El Simulador confirma ahora Allow para subir archivos',
        verify: (state) => {
          const user = findByName(state.users, 'lab05-usuario-soporte');
          if (!user) return false;
          return evaluate({ principal: { type: 'user', id: user.username }, action: 's3:PutObject', resource: 'arn:aws:s3:::practicas-curso/reportes/x.txt', state }).effect === 'Allow';
        },
      },
      {
        id: 'sin-sobre-ampliar',
        label: 'No se le adjuntó una política de administrador total para "arreglarlo"',
        verify: (state) => {
          const user = findByName(state.users, 'lab05-usuario-soporte');
          if (!user) return true;
          return user.policies.every((pid) => {
            const policy = state.policies[pid];
            if (!policy) return true;
            return !policy.document.Statement.some((s) => s.Effect === 'Allow' && toArrayLocal(s.Action).includes('*') && toArrayLocal(s.Resource).includes('*'));
          });
        },
      },
    ],
  },

  {
    id: '06',
    title: 'Activar la verificación en dos pasos',
    duration: '15 min',
    requires: [],
    intro: 'Activa MFA en un usuario y crea una política que solo permita una acción sensible cuando MFA está presente. Compruébalo en el Simulador con y sin MFA.',
    steps: [
      { title: 'Activa MFA', body: 'En Usuarios, activa la casilla de MFA para uno de tus usuarios.' },
      { title: 'Crea una política condicionada a MFA', body: 'En Políticas, crea EliminarUsuarioConMFA: Allow sobre iam:DeleteUser con Condition aws:MultiFactorAuthPresent: true, y adjúntala al usuario.' },
      { title: 'Compruébalo en el Simulador', body: 'Prueba iam:DeleteUser para ese usuario. Luego desactiva su MFA y vuelve a probar: debe cambiar a Deny.' },
    ],
    checks: [
      { id: 'mfa-activo', label: 'Un usuario tiene MFA activado', verify: (state) => Object.values(state.users).some((u) => u.mfaEnabled) },
      {
        id: 'deny-sin-mfa',
        label: 'La acción sensible da Deny para un usuario sin MFA',
        verify: (state) => {
          const policy = findByName(state.policies, 'EliminarUsuarioConMFA');
          const withoutMfa = Object.values(state.users).find((u) => !u.mfaEnabled && policy && u.policies.includes(policy.id));
          if (!withoutMfa) return false;
          return evaluate({ principal: { type: 'user', id: withoutMfa.username }, action: 'iam:DeleteUser', resource: '*', state }).effect === 'Deny';
        },
      },
      {
        id: 'allow-con-mfa',
        label: 'La misma acción da Allow para un usuario con MFA activo',
        verify: (state) => {
          const policy = findByName(state.policies, 'EliminarUsuarioConMFA');
          const withMfa = Object.values(state.users).find((u) => u.mfaEnabled && policy && u.policies.includes(policy.id));
          if (!withMfa) return false;
          return evaluate({ principal: { type: 'user', id: withMfa.username }, action: 'iam:DeleteUser', resource: '*', state }).effect === 'Allow';
        },
      },
      {
        id: 'otra-accion-no-cambia',
        label: 'Confirmaste que otra acción sin Condition no depende de MFA',
        verify: (state) => Object.values(state.policies).some((p) => p.document.Statement.some((s) => s.Effect === 'Allow' && !s.Condition)),
      },
    ],
  },
];

export const labDefinitionsById = Object.fromEntries(labDefinitions.map((lab) => [lab.id, lab]));

// --- local helpers used only inside this file's check functions ---------

function toArrayLocal(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function evaluateAgainstPolicy(policy, action, resource) {
  const fakeState = { users: {}, groups: {}, roles: {}, labs: {}, policies: { [policy.id]: policy } };
  return evaluate({ principal: { type: 'user', id: '__lab-check__' }, action, resource, state: { ...fakeState, users: { '__lab-check__': { username: '__lab-check__', groups: [], policies: [policy.id], mfaEnabled: false } } } });
}
```

- [ ] **Step 2: Sanity-check the module loads and evaluates checks correctly**

Create a throwaway test file `src/data/labDefinitions.smoke.test.js` (temporary — deleted at the end of this step) to exercise the trickiest check logic (`evaluateAgainstPolicy`, and Lab 02/05's cross-referencing checks) without needing the browser:

```js
import { describe, it, expect } from 'vitest';
import { labDefinitions, labDefinitionsById } from './labDefinitions.js';
import { createGroup, createPolicy, attachPolicy, createUser, addUserToGroup, iamReducer, initialIamState } from '../state/iamReducer.js';

describe('labDefinitions basic shape', () => {
  it('has exactly 6 labs with unique ids 01-06', () => {
    expect(labDefinitions.map((l) => l.id)).toEqual(['01', '02', '03', '04', '05', '06']);
    expect(Object.keys(labDefinitionsById)).toHaveLength(6);
  });

  it('every lab has at least one check', () => {
    labDefinitions.forEach((lab) => expect(lab.checks.length).toBeGreaterThan(0));
  });
});

describe('Lab 02 checks against a fully-solved scenario', () => {
  it('all 5 checks pass once the group/policy/members are set up correctly', () => {
    let state = initialIamState;
    state = iamReducer(state, createUser({ username: 'u1', courseTag: '', accessType: 'console', password: 'Verano2026!!', requirePasswordReset: true }));
    state = iamReducer(state, createUser({ username: 'u2', courseTag: '', accessType: 'console', password: 'Verano2026!!', requirePasswordReset: true }));
    state = iamReducer(state, createGroup({ name: 'practicas-lectura', desc: '' }));
    const groupId = Object.values(state.groups).find((g) => g.name === 'practicas-lectura').id;
    state = iamReducer(state, createPolicy({
      name: 'LecturaS3', type: 'Propia del curso',
      document: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: ['s3:GetObject', 's3:ListBucket'], Resource: ['arn:aws:s3:::practicas-curso', 'arn:aws:s3:::practicas-curso/*'] }] },
    }));
    const policyId = Object.values(state.policies).find((p) => p.name === 'LecturaS3').id;
    state = iamReducer(state, attachPolicy('group', groupId, policyId));
    state = iamReducer(state, addUserToGroup('u1', groupId));
    state = iamReducer(state, addUserToGroup('u2', groupId));

    const lab02 = labDefinitionsById['02'];
    lab02.checks.forEach((check) => expect(check.verify(state)).toBe(true));
  });
});

describe('Lab 05 seed is idempotent and its checks pass once fixed', () => {
  it('seed run twice does not duplicate the group', () => {
    let state = initialIamState;
    const dispatchLike = (action) => { state = iamReducer(state, action); };
    labDefinitionsById['05'].seed(dispatchLike, state);
    labDefinitionsById['05'].seed(dispatchLike, state);
    const matches = Object.values(state.groups).filter((g) => g.name === 'lab05-soporte');
    expect(matches).toHaveLength(1);
  });

  it('checks pass once the Deny is removed', () => {
    let state = initialIamState;
    const dispatchLike = (action) => { state = iamReducer(state, action); };
    labDefinitionsById['05'].seed(dispatchLike, state);
    const user = Object.values(state.users).find((u) => u.username === 'lab05-usuario-soporte');
    const denyPolicy = Object.values(state.policies).find((p) => p.name === 'Lab05-DenegarSubida');
    state = iamReducer(state, attachPolicy('user', user.username, denyPolicy.id));
    const before = labDefinitionsById['05'].checks.find((c) => c.id === 'corregido').verify(state);
    expect(before).toBe(false);

    state = iamReducer(state, { type: 'DETACH_POLICY', payload: { targetType: 'user', targetId: user.username, policyId: denyPolicy.id } });
    const allowPolicy = iamReducer(state, createPolicy({ name: 'Lab05-PermitirSubida', type: 'Propia del curso', document: { Version: '2012-10-17', Statement: [{ Effect: 'Allow', Action: 's3:PutObject', Resource: 'arn:aws:s3:::practicas-curso/*' }] } }));
    state = allowPolicy;
    const policyId = Object.values(state.policies).find((p) => p.name === 'Lab05-PermitirSubida').id;
    state = iamReducer(state, attachPolicy('user', user.username, policyId));

    labDefinitionsById['05'].checks.forEach((check) => expect(check.verify(state)).toBe(true));
  });
});
```

Run: `npm test`
Expected: PASS. If any check fails, fix the corresponding `verify` function in `labDefinitions.js` (not the test) until every assertion is true — the tests describe the intended behavior exactly.

Delete `src/data/labDefinitions.smoke.test.js` once green (its job was only to validate the trickier `verify` functions during this task; Task 13/14 will exercise the rest through the browser).

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 4: Commit**

```bash
git add src/data/labDefinitions.js
git commit -m "Add labDefinitions: declarative content and live checks for all 6 labs"
```

---

## Task 13: `LaboratorioDetalle.jsx` — generic lab runner

**Files:**
- Create: `src/pages/LaboratorioDetalle.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `useIamState`, `useIamDispatch`; `labDefinitionsById` from `../data/labDefinitions.js`; `computeLabProgress`, `isLabUnlocked` from `../state/iamLogic.js`.
- Produces: route `aprendizaje/laboratorios/:labId`.

- [ ] **Step 1: Implement the page**

Create `src/pages/LaboratorioDetalle.jsx`:

```jsx
import { useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { IconCheck } from '../components/icons.jsx';
import { useIamState, useIamDispatch } from '../state/iamStore.jsx';
import { labDefinitionsById } from '../data/labDefinitions.js';
import { computeLabProgress, isLabUnlocked } from '../state/iamLogic.js';

export default function LaboratorioDetalle() {
  const { labId } = useParams();
  const state = useIamState();
  const dispatch = useIamDispatch();
  const labDef = labDefinitionsById[labId];
  const seeded = useRef(false);

  useEffect(() => {
    if (labDef?.seed && !seeded.current) {
      seeded.current = true;
      labDef.seed(dispatch, state);
    }
    // Intencionalmente solo depende de labId: seed() debe correr una vez al
    // entrar al laboratorio, no en cada cambio de estado posterior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [labId]);

  if (!labDef) return <Navigate to="/aprendizaje/laboratorios" replace />;

  const unlocked = isLabUnlocked(labDef, labDefinitionsById, state);
  if (!unlocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
        <div className="breadcrumb">Aprendizaje › Laboratorios guiados › Laboratorio {labDef.id}</div>
        <h2>{labDef.title}</h2>
        <div role="alert" className="alert alert-warning">
          <div className="alert-body">Este laboratorio está bloqueado. Completa primero el laboratorio {labDef.requires.join(', ')}.</div>
        </div>
        <Link to="/aprendizaje/laboratorios" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)', alignSelf: 'flex-start' }}>Volver al listado</Link>
      </div>
    );
  }

  const progress = computeLabProgress(labDef, state);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Laboratorios guiados › Laboratorio {labDef.id}</div>
      <h2 style={{ margin: '0 0 4px' }}>Laboratorio {labDef.id} · {labDef.title}</h2>
      <p className="view-intro">{labDef.intro}</p>

      <div className="content-grid">
        <section className="content-card">
          <ol className="plain-list">
            {labDef.steps.map((step, i) => (
              <li key={step.title}>
                <strong>{i + 1}. {step.title}</strong> — {step.body}
              </li>
            ))}
          </ol>
        </section>

        <aside className="guide-panel">
          <div className="guide-panel-head">
            <span className="guide-panel-title">Comprobaciones</span>
            <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>{progress.passed} de {progress.total}</span>
          </div>
          <div className="lab-progress"><div style={{ width: `${progress.percent}%` }} /></div>
          <div className="checklist">
            {progress.checkResults.map((check) => (
              <div key={check.id} className={`checklist-item${check.passing ? ' is-checked' : ''}`}>
                {check.passing && <IconCheck style={{ marginTop: 2 }} />}
                <span>{check.label}</span>
              </div>
            ))}
          </div>
          {progress.status === 'completado' && (
            <div className="alert alert-warning" style={{ marginTop: 'var(--space-4)' }}>
              <div className="alert-body">Laboratorio completado. Puedes volver al listado para continuar con el siguiente.</div>
            </div>
          )}
        </aside>
      </div>

      <Link to="/aprendizaje/laboratorios" className="btn btn-secondary" style={{ marginTop: 'var(--space-4)', alignSelf: 'flex-start' }}>Volver al listado</Link>
    </div>
  );
}
```

- [ ] **Step 2: Register the route**

Edit `src/App.jsx`:

```jsx
import LaboratorioDetalle from './pages/LaboratorioDetalle.jsx';
```

Add this import and, right after the existing `aprendizaje/laboratorios` route, add:

```jsx
          <Route path="aprendizaje/laboratorios/:labId" element={<LaboratorioDetalle />} />
```

- [ ] **Step 3: Verify in the browser**

Navigate directly to `http://localhost:5173/aprendizaje/laboratorios/01` — expect the intro, 3 steps, and 5 checks all showing unchecked (unless you already created a user earlier in this session). Complete Lab 01 through `/iam/usuarios/crear` in another tab or by navigating away and back, then return to `/aprendizaje/laboratorios/01` — expect the checks to flip to checked live and the "Laboratorio completado" banner to appear once all 5 are green.

Navigate to `/aprendizaje/laboratorios/04` directly (its `requires` is empty in Task 12's definitions, so it should NOT be locked — confirm that). Navigate to a hypothetical locked case by temporarily checking `/aprendizaje/laboratorios/05` before completing lab 03 — expect the "bloqueado" message and no crash.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Commit**

```bash
git add src/pages/LaboratorioDetalle.jsx src/App.jsx
git commit -m "Add LaboratorioDetalle: generic runner with live checks and lock screen"
```

---

## Task 14: Rewrite `Laboratorios.jsx` to read the real store

**Files:**
- Modify: `src/pages/Laboratorios.jsx`

**Interfaces:**
- Consumes: `useIamState`; `labDefinitions`, `labDefinitionsById` from `../data/labDefinitions.js`; `computeLabProgress`, `isLabUnlocked` from `../state/iamLogic.js`.
- Produces: the directory now shows real, live progress/lock state, and each card links to `LaboratorioDetalle` (Task 13).

- [ ] **Step 1: Rewrite the page**

Replace the full contents of `src/pages/Laboratorios.jsx` with:

```jsx
import { Link } from 'react-router-dom';
import { useIamState } from '../state/iamStore.jsx';
import { labDefinitions, labDefinitionsById } from '../data/labDefinitions.js';
import { computeLabProgress, isLabUnlocked } from '../state/iamLogic.js';

const STATUS_LABEL = { 'sin-empezar': 'Sin empezar', 'en-curso': 'En curso', completado: 'Completado' };

export default function Laboratorios() {
  const state = useIamState();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: 'var(--space-8)' }}>
      <div className="breadcrumb">Aprendizaje › Laboratorios guiados</div>
      <h2 style={{ margin: '0 0 4px' }}>Laboratorios guiados</h2>
      <p className="view-intro">Ejercicios cortos sobre la cuenta de prácticas. Cada laboratorio se corrige solo: la consola comprueba el estado real de los recursos al terminar.</p>

      <div className="lab-grid">
        {labDefinitions.map((labDef) => {
          const unlocked = isLabUnlocked(labDef, labDefinitionsById, state);
          const progress = computeLabProgress(labDef, state);
          const meta = !unlocked
            ? `Bloqueado · requiere el laboratorio ${labDef.requires.join(', ')}`
            : progress.status === 'sin-empezar'
              ? 'Sin empezar'
              : `${STATUS_LABEL[progress.status]} · ${progress.passed} de ${progress.total} comprobaciones`;

          const card = (
            <div className={`card elev-sm lab-card${!unlocked ? ' is-locked' : ''}`}>
              <div className="card-kicker">Laboratorio {labDef.id} · {labDef.duration}</div>
              <div className="card-title">{labDef.title}</div>
              <p className="card-body">{labDef.intro}</p>
              <div className="lab-progress"><div style={{ width: `${unlocked ? progress.percent : 0}%` }} /></div>
              <div className="card-meta">{meta}</div>
            </div>
          );

          return unlocked ? (
            <Link key={labDef.id} to={`/aprendizaje/laboratorios/${labDef.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{card}</Link>
          ) : (
            <div key={labDef.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Remove the now-fully-unused static `labs` export**

Confirm `grep -rn "\blabs\b" src/data/sampleData.js src/pages | grep -v labDefinitions` shows nothing referencing the old static `labs` array, then delete it from `sampleData.js`.

- [ ] **Step 3: Verify in the browser**

Navigate to `/aprendizaje/laboratorios`. Expect: Labs 01, 02, 03, 04, 06 unlocked (per Task 12's `requires`), Lab 05 locked with "requiere el laboratorio 03" until Lab 03's 5 checks all pass. Click through an unlocked card and confirm it opens `LaboratorioDetalle`. Complete Lab 03 fully, then reload the directory — confirm Lab 05 becomes unlocked and clickable.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: clean.

- [ ] **Step 5: Run the full test suite one last time**

Run: `npm test`
Expected: every test from Tasks 2, 3, 10, 12 still passes (Task 12's smoke test was already deleted in that task, so only `iamLogic.test.js`, `iamReducer.test.js`, `policyEngine.test.js` remain).

- [ ] **Step 6: Commit**

```bash
git add src/pages/Laboratorios.jsx src/data/sampleData.js
git commit -m "Rewrite Laboratorios directory to derive locks and progress from real state"
```

---

## Final check (after Task 14)

- [ ] Run `npm run build` once, end to end, to confirm nothing broke the production build.

Run: `npm run build`
Expected: build succeeds with no errors.

- [ ] Manually walk all 6 labs start to finish in the browser in order (01 → 02 → 03 → 05 → 04 → 06, since 05 unlocks only after 03), confirming each one's checks turn green through normal use of Usuarios/Grupos/Roles/Políticas/Simulador — not by editing `localStorage` by hand.
