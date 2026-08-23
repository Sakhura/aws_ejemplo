import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import UsuariosCrear from './pages/UsuariosCrear/UsuariosCrear.jsx';
import Grupos from './pages/Grupos.jsx';
import Roles from './pages/Roles.jsx';
import Politicas from './pages/Politicas.jsx';
import Proveedores from './pages/Proveedores.jsx';
import Laboratorios from './pages/Laboratorios.jsx';
import Errores from './pages/Errores.jsx';
import Glosario from './pages/Glosario.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/iam/usuarios/crear" replace />} />
          <Route path="iam/usuarios/crear" element={<UsuariosCrear />} />
          <Route path="iam/grupos" element={<Grupos />} />
          <Route path="iam/roles" element={<Roles />} />
          <Route path="iam/politicas" element={<Politicas />} />
          <Route path="iam/proveedores" element={<Proveedores />} />
          <Route path="aprendizaje/laboratorios" element={<Laboratorios />} />
          <Route path="aprendizaje/errores" element={<Errores />} />
          <Route path="aprendizaje/glosario" element={<Glosario />} />
          <Route path="*" element={<Navigate to="/iam/usuarios/crear" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
