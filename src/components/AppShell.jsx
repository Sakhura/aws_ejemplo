import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { IconMenu } from './icons.jsx';

const accesoItems = [
  { to: '/iam/usuarios/crear', label: 'Usuarios', match: '/iam/usuarios' },
  { to: '/iam/grupos', label: 'Grupos de usuarios' },
  { to: '/iam/roles', label: 'Roles' },
  { to: '/iam/politicas', label: 'Políticas' },
  { to: '/iam/proveedores', label: 'Proveedores de identidad' },
];

const aprendizajeItems = [
  { to: '/aprendizaje/aws-desde-cero', label: 'AWS desde cero' },
  { to: '/aprendizaje/laboratorios', label: 'Laboratorios guiados' },
  { to: '/aprendizaje/errores', label: 'Errores frecuentes' },
  { to: '/aprendizaje/glosario', label: 'Glosario' },
];

function NavItem({ item }) {
  const location = useLocation();
  const isActive = location.pathname.startsWith(item.match || item.to);
  return (
    <NavLink to={item.to} className={`navitem${isActive ? ' is-active' : ''}`}>
      {item.label}
    </NavLink>
  );
}

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <div className="disclaimer-bar">
        <strong>Entorno educativo simulado.</strong>
        <span>Esta consola es una maqueta de prácticas para estudiantes: no está afiliada a AWS ni a ningún proveedor real, y ninguna acción se comunica con una nube real.</span>
      </div>

      <header className="app-header">
        <button
          type="button"
          className="menu-toggle"
          aria-label="Abrir menú de navegación"
          onClick={() => setSidebarOpen((v) => !v)}
        >
          <IconMenu />
        </button>
        <div className="app-brand">
          <div className="app-brand-mark">N</div>
          <span className="app-brand-name">Nube Académica</span>
        </div>
        <nav className="app-nav">
          <span>Servicios</span>
          <span>Facturación</span>
          <span className="is-active">IAM</span>
          <span>Soporte</span>
        </nav>
        <div className="app-header-right">
          <span>Región: eu-oeste-1</span>
          <span className="app-header-divider" />
          <span>alumno@universidad.edu</span>
          <div className="app-avatar">AL</div>
        </div>
      </header>

      <div className="app-body">
        {sidebarOpen && (
          <div className="sidebar-scrim is-open" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`app-sidebar${sidebarOpen ? ' is-open' : ''}`}>
          <div>
            <div className="nav-section-label">Gestión de acceso</div>
            <div className="nav-list">
              {accesoItems.map((item) => (
                <NavItem key={item.to} item={item} />
              ))}
            </div>
          </div>
          <div>
            <div className="nav-section-label">Aprendizaje</div>
            <div className="nav-list">
              {aprendizajeItems.map((item) => (
                <NavItem key={item.to} item={item} />
              ))}
            </div>
          </div>
          <div className="sidebar-card">
            <div className="sidebar-card-label">Entorno de prácticas</div>
            <div className="sidebar-card-body">Los recursos creados aquí se eliminan cada 24 horas.</div>
          </div>
        </aside>

        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
