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
