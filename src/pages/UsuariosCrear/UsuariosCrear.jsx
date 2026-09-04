import { useState } from 'react';
import { IconWarning, IconInfo, IconQuestion, IconCheck, IconDownload, IconSpinner } from '../../components/icons.jsx';
import { useIamState, useIamDispatch } from '../../state/iamStore.jsx';
import { createUser, addUserToGroup, attachPolicy, markCredentialsDownloaded } from '../../state/iamReducer.js';
import { isValidUsername, isValidPassword } from '../../state/iamLogic.js';
import {
  passwordStrength,
  generateFakeCredentials,
  credentialsToCsv,
} from './wizardLogic.js';

const STEPS = [
  { n: 1, title: 'Configurar detalles', sub: 'Nombre y contraseña', currentSub: 'Paso actual · nombre y contraseña' },
  { n: 2, title: 'Establecer permisos', sub: 'Grupos y políticas IAM', currentSub: 'Paso actual · grupos y políticas IAM' },
  { n: 3, title: 'Revisar y crear', sub: 'Resumen antes de confirmar', currentSub: 'Paso actual · resumen antes de confirmar' },
];

const INITIAL_FORM = {
  username: 'alumno-practicas-01',
  courseTag: 'curso=cloud-2026',
  accessType: 'console',
  password: 'verano2026',
  passwordConfirm: 'verano2026',
  requirePasswordReset: true,
};

function downloadCsv(filename, content) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function UsuariosCrear() {
  const state = useIamState();
  const dispatch = useIamDispatch();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({ password: true, passwordConfirm: false });
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState(new Set());
  const [selectedPolicies, setSelectedPolicies] = useState(new Set());
  const [submitState, setSubmitState] = useState('idle');
  const [createdUser, setCreatedUser] = useState(null);

  const passValid = isValidPassword(form.password);
  const mismatch = form.password !== form.passwordConfirm;
  const userValid = isValidUsername(form.username);
  const strength = passwordStrength(form.password);

  const showPasswordError = form.accessType === 'console' && (touched.password || attemptedSubmit) && !passValid;
  const showMismatchError = form.accessType === 'console' && (touched.passwordConfirm || attemptedSubmit) && form.passwordConfirm !== '' && mismatch;
  const showAnyPasswordAlert = showPasswordError || showMismatchError;

  const step1Valid = userValid && (form.accessType === 'programmatic' || (passValid && !mismatch));

  function updateField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function resetWizard() {
    setStep(1);
    setForm(INITIAL_FORM);
    setTouched({ password: true, passwordConfirm: false });
    setAttemptedSubmit(false);
    setSelectedGroups(new Set());
    setSelectedPolicies(new Set());
    setSubmitState('idle');
    setCreatedUser(null);
  }

  function goNext() {
    if (step === 1) {
      setAttemptedSubmit(true);
      if (!step1Valid) return;
      setAttemptedSubmit(false);
      setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
  }

  function goPrev() {
    if (step > 1 && submitState !== 'submitting') setStep((s) => s - 1);
  }

  function toggleSet(setter, id) {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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

  function handleDownload() {
    if (submitState !== 'created') return;
    const csvContent = createdUser
      ? credentialsToCsv(form.username, createdUser)
      : `Usuario,Nota\n${form.username},"Contraseña establecida por el usuario al crear la cuenta; no se vuelve a mostrar aquí."\n`;
    downloadCsv(`${form.username}-credenciales.csv`, csvContent);
    dispatch(markCredentialsDownloaded(form.username));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="breadcrumb">IAM › Usuarios › Crear nuevo usuario</div>
      <h2 style={{ margin: '0 0 4px' }}>Crear nuevo usuario</h2>
      <p className="view-intro" style={{ maxWidth: '62ch' }}>
        Un usuario IAM representa a una persona o una aplicación que necesita acceso a la cuenta. Completa los tres pasos para definir sus credenciales y sus permisos.
      </p>

      <ol className="step-rail">
        {STEPS.map((s) => {
          const isCurrent = s.n === step;
          const isDone = s.n < step;
          return (
            <li
              key={s.n}
              className={`step-card${isCurrent ? ' is-current' : ''}${isDone ? ' is-done' : ''}`}
              onClick={() => { if (isDone && submitState !== 'submitting') setStep(s.n); }}
            >
              <span className="step-numeral">{isDone ? <IconCheck style={{ width: 12, height: 12 }} /> : s.n}</span>
              <span>
                <span className="step-title">{s.title}</span>
                <span className="step-sub">{isCurrent ? s.currentSub : s.sub}</span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="content-grid">
        <section className="content-card form-card">
          {step === 1 && (
            <Step1
              form={form}
              updateField={updateField}
              touched={touched}
              setTouched={setTouched}
              showPasswordError={showPasswordError}
              showMismatchError={showMismatchError}
              showAnyPasswordAlert={showAnyPasswordAlert}
              userValid={userValid}
              attemptedSubmit={attemptedSubmit}
              strength={strength}
            />
          )}
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
          {step === 3 && (
            <Step3
              form={form}
              selectedGroups={selectedGroups}
              selectedPolicies={selectedPolicies}
              submitState={submitState}
              createdUser={createdUser}
            />
          )}
        </section>

        <GuidePanel step={step} />
      </div>

      <footer className="footer-bar">
        <button
          type="button"
          className="btn btn-secondary"
          disabled={submitState !== 'created'}
          onClick={handleDownload}
        >
          <IconDownload />
          Descargar credenciales de acceso (.csv)
        </button>
        <span className="footer-bar-note">Las claves solo se muestran una vez. Guarda el archivo en un lugar seguro.</span>
        <div className="footer-bar-actions">
          <button type="button" className="btn btn-ghost" onClick={resetWizard} disabled={submitState === 'submitting'}>Cancelar</button>
          <button type="button" className="btn btn-secondary" onClick={goPrev} disabled={step === 1 || submitState === 'submitting'}>Anterior</button>
          {step < 3 && (
            <button type="button" className="btn btn-primary" onClick={goNext}>
              {step === 1 ? 'Siguiente: establecer permisos' : 'Siguiente: revisar y crear'}
            </button>
          )}
          {step === 3 && submitState !== 'created' && (
            <button type="button" className="btn btn-primary" onClick={submitUser} disabled={submitState === 'submitting'}>
              {submitState === 'submitting' ? (<><IconSpinner /> Creando…</>) : 'Crear usuario'}
            </button>
          )}
          {step === 3 && submitState === 'created' && (
            <button type="button" className="btn btn-primary" onClick={resetWizard}>Crear otro usuario</button>
          )}
        </div>
      </footer>
    </div>
  );
}

function Step1({ form, updateField, setTouched, showPasswordError, showMismatchError, showAnyPasswordAlert, userValid, attemptedSubmit, strength }) {
  return (
    <>
      {showAnyPasswordAlert && (
        <div role="alert" className="alert alert-danger">
          <IconWarning style={{ color: 'var(--color-danger-icon)', flex: 'none', marginTop: 2 }} />
          <div>
            {showPasswordError && (
              <>
                <div className="alert-title">Contraseña demasiado débil: debe incluir mayúsculas y números</div>
                <div className="alert-body">Mínimo 12 caracteres, al menos una mayúscula, un número y un símbolo. La consola rechaza la creación del usuario hasta que la contraseña cumpla la política de la cuenta.</div>
              </>
            )}
            {showMismatchError && (
              <div className="alert-body" style={{ marginTop: showPasswordError ? 8 : 2 }}>Las contraseñas no coinciden. Revisa ambos campos.</div>
            )}
          </div>
        </div>
      )}

      {attemptedSubmit && !userValid && (
        <div role="alert" className="alert alert-danger">
          <IconWarning style={{ color: 'var(--color-danger-icon)', flex: 'none', marginTop: 2 }} />
          <div>
            <div className="alert-title">Nombre de usuario no válido</div>
            <div className="alert-body">Escribe un nombre sin espacios, usando solo letras, números y los signos + = , . @ _ -</div>
          </div>
        </div>
      )}

      <div className="field-row">
        <div className="field">
          <label htmlFor="nombre">Nombre de usuario</label>
          <input
            className={`input${attemptedSubmit && !userValid ? ' is-invalid' : ''}`}
            id="nombre"
            value={form.username}
            onChange={(e) => updateField('username', e.target.value)}
          />
          <div className="field-hint">Sin espacios. Se permiten letras, números y los signos + = , . @ _ -</div>
        </div>
        <div className="field">
          <label htmlFor="etiqueta">Etiqueta de curso (opcional)</label>
          <input
            className="input"
            id="etiqueta"
            value={form.courseTag}
            onChange={(e) => updateField('courseTag', e.target.value)}
          />
          <div className="field-hint">Las etiquetas ayudan a identificar quién creó cada recurso.</div>
        </div>
      </div>

      <div>
        <div className="radio-group-label">Tipo de acceso</div>
        <div className="radio-group">
          <label className="radio">
            <input
              type="radio"
              name="acceso"
              checked={form.accessType === 'console'}
              onChange={() => updateField('accessType', 'console')}
            />
            <span className="dot" />
            <span>Acceso a la consola de administración <span className="radio-tail">— el usuario inicia sesión con contraseña</span></span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="acceso"
              checked={form.accessType === 'programmatic'}
              onChange={() => updateField('accessType', 'programmatic')}
            />
            <span className="dot" />
            <span>Acceso programático <span className="radio-tail">— clave de acceso para la CLI y el SDK</span></span>
          </label>
        </div>
      </div>

      {form.accessType === 'console' ? (
        <div className="field-row">
          <div className="field">
            <label htmlFor="pass">Contraseña de la consola</label>
            <input
              className={`input${showPasswordError ? ' is-invalid' : ''}`}
              id="pass"
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            />
            <div className="strength-meter">
              <span className="strength-track">
                <span className="strength-fill" style={{ width: `${strength.width}%`, backgroundColor: strength.color }} />
              </span>
              {strength.label && <span className="strength-label" style={{ color: strength.color }}>{strength.label}</span>}
            </div>
          </div>
          <div className="field">
            <label htmlFor="pass2">Confirmar contraseña</label>
            <input
              className={`input${showMismatchError ? ' is-invalid' : ''}`}
              id="pass2"
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => updateField('passwordConfirm', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, passwordConfirm: true }))}
            />
            <div className="field-hint">Ambos campos deben coincidir exactamente.</div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">
          <IconInfo style={{ color: 'var(--color-warning-icon)', flex: 'none', marginTop: 2 }} />
          <div className="alert-body" style={{ marginTop: 0 }}>
            Con acceso programático no se define contraseña. Al crear el usuario se genera un par de claves (ID de clave de acceso y clave secreta) para la CLI y el SDK; la clave secreta solo se muestra una vez.
          </div>
        </div>
      )}

      {form.accessType === 'console' && form.requirePasswordReset && (
        <div className="alert alert-warning">
          <IconInfo style={{ color: 'var(--color-warning-icon)', flex: 'none', marginTop: 2 }} />
          <div className="alert-body" style={{ marginTop: 0 }}>
            Aviso: has marcado <strong style={{ fontWeight: 600 }}>Requerir cambio de contraseña en el primer inicio de sesión</strong>. El usuario necesitará el permiso <code className="mono">iam:ChangePassword</code> para poder cambiarla.
          </div>
        </div>
      )}

      {form.accessType === 'console' && (
        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.requirePasswordReset}
            onChange={(e) => updateField('requirePasswordReset', e.target.checked)}
          />
          <span className="box"><IconCheck /></span>
          <span>Requerir cambio de contraseña en el primer inicio de sesión</span>
        </label>
      )}
    </>
  );
}

function Step2({ groups, policies, selectedGroups, selectedPolicies, toggleGroup, togglePolicy }) {
  const nothingSelected = selectedGroups.size === 0 && selectedPolicies.size === 0;
  return (
    <>
      <div>
        <div className="radio-group-label">Grupos</div>
        <div className="checklist">
          {groups.map((g) => {
            const checked = selectedGroups.has(g.id);
            return (
              <label key={g.id} className={`checklist-item${checked ? ' is-checked' : ''}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleGroup(g.id)} style={{ marginTop: 2 }} />
                <span>
                  <div className="checklist-item-name">{g.name}</div>
                  <div className="checklist-item-meta">{g.desc}</div>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div>
        <div className="radio-group-label">Políticas adjuntas directamente (opcional)</div>
        <div className="checklist">
          {policies.map((p) => {
            const checked = selectedPolicies.has(p.id);
            return (
              <label key={p.id} className={`checklist-item${checked ? ' is-checked' : ''}`}>
                <input type="checkbox" checked={checked} onChange={() => togglePolicy(p.id)} style={{ marginTop: 2 }} />
                <span>
                  <div className="checklist-item-name">{p.name}</div>
                  <div className="checklist-item-meta">{p.type}</div>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {nothingSelected && (
        <div className="alert alert-warning">
          <IconInfo style={{ color: 'var(--color-warning-icon)', flex: 'none', marginTop: 2 }} />
          <div className="alert-body" style={{ marginTop: 0 }}>
            Sin permisos asignados: el usuario no podrá hacer nada hasta que actives al menos un grupo o política. Esto es válido para seguir el laboratorio de mínimo privilegio.
          </div>
        </div>
      )}
    </>
  );
}

function Step3({ form, selectedGroups, selectedPolicies, submitState, createdUser }) {
  const groupNames = [...selectedGroups];
  const policyNames = [...selectedPolicies];

  if (submitState === 'created') {
    return (
      <div className="success-banner">
        <IconCheck style={{ color: 'var(--color-accent)', flex: 'none', marginTop: 3, width: 18, height: 18 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', width: '100%' }}>
          <div>
            <div className="alert-title" style={{ color: 'var(--color-accent-200)' }}>Usuario {form.username} creado</div>
            <div className="alert-body" style={{ margin: '4px 0 0' }}>
              {createdUser
                ? 'Estas credenciales son ficticias, existen solo dentro de este simulador y se muestran una única vez. Descárgalas ahora desde la barra inferior.'
                : 'El usuario ya puede iniciar sesión con la contraseña que definiste. Descarga la constancia de creación desde la barra inferior.'}
            </div>
          </div>
          {createdUser && (
            <div className="credential-box">
              <div className="credential-row"><span className="text-muted">ID de clave de acceso</span><code className="mono">{createdUser.accessKeyId}</code></div>
              <div className="credential-row"><span className="text-muted">Clave de acceso secreta</span><code className="mono">{createdUser.secretAccessKey}</code></div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="review-grid">
        <div className="review-item">
          <div className="review-label">Nombre de usuario</div>
          <div className="review-value">{form.username}</div>
        </div>
        <div className="review-item">
          <div className="review-label">Etiqueta de curso</div>
          <div className="review-value">{form.courseTag || '—'}</div>
        </div>
        <div className="review-item">
          <div className="review-label">Tipo de acceso</div>
          <div className="review-value">{form.accessType === 'console' ? 'Consola de administración' : 'Programático (CLI / SDK)'}</div>
        </div>
        <div className="review-item">
          <div className="review-label">Cambio de contraseña obligatorio</div>
          <div className="review-value">{form.accessType === 'console' ? (form.requirePasswordReset ? 'Sí' : 'No') : 'No aplica'}</div>
        </div>
        <div className="review-item">
          <div className="review-label">Grupos</div>
          <div className="review-value">{groupNames.length ? groupNames.join(', ') : 'Ninguno'}</div>
        </div>
        <div className="review-item">
          <div className="review-label">Políticas directas</div>
          <div className="review-value">{policyNames.length ? policyNames.join(', ') : 'Ninguna'}</div>
        </div>
      </div>
      <div className="alert alert-warning">
        <IconInfo style={{ color: 'var(--color-warning-icon)', flex: 'none', marginTop: 2 }} />
        <div className="alert-body" style={{ marginTop: 0 }}>
          Revisa el resumen antes de confirmar. Al crear el usuario se generan credenciales de ejemplo que solo existen dentro de este simulador.
        </div>
      </div>
    </>
  );
}

function GuidePanel({ step }) {
  if (step === 1) {
    return (
      <aside className="guide-panel">
        <div className="guide-panel-head">
          <IconQuestion style={{ color: 'var(--color-accent)' }} />
          <span className="guide-panel-title">Guía interactiva</span>
          <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>Paso 1</span>
        </div>
        <div>
          <h5>¿Qué es una política IAM?</h5>
          <p>Una política IAM es un documento JSON que declara qué acciones se permiten o se deniegan sobre qué recursos. No se asigna poder al usuario: se le adjunta una política, y todo lo que no esté permitido explícitamente queda denegado por defecto.</p>
        </div>
        <div className="guide-defs">
          <div><strong>Effect</strong> — permitir (Allow) o denegar (Deny).</div>
          <div><strong>Action</strong> — la operación del servicio, como leer un objeto.</div>
          <div><strong>Resource</strong> — sobre qué recurso concreto se aplica.</div>
        </div>
        <div>
          <div className="guide-code-head">
            <span className="guide-code-kicker">Ejemplo · solo lectura</span>
            <span className="guide-code-file">politica-lectura.json</span>
          </div>
          <pre className="codeblock">{`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "LecturaDeArchivos",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::practicas-curso",
        "arn:aws:s3:::practicas-curso/*"
      ]
    }
  ]
}`}</pre>
        </div>
        <div className="guide-caption">Esta política deja leer los archivos del bucket de prácticas, pero no borrarlos ni subir nada nuevo.</div>
      </aside>
    );
  }

  if (step === 2) {
    return (
      <aside className="guide-panel">
        <div className="guide-panel-head">
          <IconQuestion style={{ color: 'var(--color-accent)' }} />
          <span className="guide-panel-title">Guía interactiva</span>
          <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>Paso 2</span>
        </div>
        <div>
          <h5>Grupo o política directa</h5>
          <p>Prefiere meter al usuario en un grupo: si mañana cambia de rol, basta con cambiarlo de grupo. Adjuntar una política directamente al usuario es la excepción, no la costumbre.</p>
        </div>
        <div className="guide-note">Un usuario puede pertenecer a varios grupos a la vez, y recibe la suma de todos los permisos que conceden.</div>
        <div className="guide-inset">
          <div className="guide-inset-kicker">Práctica sugerida</div>
          Activa solo <code className="mono">practicas-lectura</code> y comprueba en el laboratorio que el usuario puede leer el bucket pero no borrarlo.
        </div>
      </aside>
    );
  }

  return (
    <aside className="guide-panel">
      <div className="guide-panel-head">
        <IconQuestion style={{ color: 'var(--color-accent)' }} />
        <span className="guide-panel-title">Guía interactiva</span>
        <span className="tag tag-outline" style={{ marginLeft: 'auto' }}>Paso 3</span>
      </div>
      <div>
        <h5>Mínimo privilegio</h5>
        <p>Antes de confirmar, pregúntate qué necesita hacer este usuario realmente. Cada grupo o política de más es una superficie de riesgo que alguien tendrá que auditar después.</p>
      </div>
      <div className="guide-note">Una vez creado el usuario, sus credenciales se muestran una sola vez. Si las pierdes, tendrás que generar unas nuevas.</div>
    </aside>
  );
}
