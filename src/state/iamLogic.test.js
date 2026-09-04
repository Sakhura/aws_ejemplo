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
