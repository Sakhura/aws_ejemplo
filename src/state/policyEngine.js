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
