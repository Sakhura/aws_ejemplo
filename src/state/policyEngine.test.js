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
