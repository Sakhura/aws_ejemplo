export function passwordCriteria(password) {
  return {
    length: password.length >= 12,
    upper: /[A-Z]/.test(password),
    digit: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  };
}

export function passwordScore(password) {
  const c = passwordCriteria(password);
  return Number(c.length) + Number(c.upper) + Number(c.digit) + Number(c.symbol);
}

export function isPasswordValid(password) {
  return passwordScore(password) === 4;
}

export function passwordStrength(password) {
  if (!password) return { label: '', width: 0, color: 'var(--color-danger-border)' };
  const score = passwordScore(password);
  if (score <= 2) return { label: 'Débil', width: 28, color: 'var(--color-danger-border)' };
  if (score === 3) return { label: 'Media', width: 66, color: 'var(--color-warning-base)' };
  return { label: 'Fuerte', width: 100, color: 'var(--color-accent)' };
}

const USERNAME_PATTERN = /^[A-Za-z0-9+=,.@_-]+$/;

export function isUsernameValid(username) {
  const trimmed = username.trim();
  return trimmed.length > 0 && USERNAME_PATTERN.test(trimmed);
}

function randomToken(len) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let out = '';
  for (let i = 0; i < len; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function generateFakeCredentials() {
  return {
    accessKeyId: `AKIAEJEMPLO${randomToken(8).toUpperCase()}`,
    secretAccessKey: randomToken(32),
  };
}

export function credentialsToCsv(username, credentials) {
  const header = 'Usuario,ID de clave de acceso,Clave de acceso secreta\n';
  const row = `${username},${credentials.accessKeyId},${credentials.secretAccessKey}\n`;
  return header + row;
}
