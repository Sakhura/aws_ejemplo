import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell.jsx';
import UsuariosCrear from './pages/UsuariosCrear/UsuariosCrear.jsx';
import Grupos from './pages/Grupos.jsx';
import Roles from './pages/Roles.jsx';
import Politicas from './pages/Politicas.jsx';
import Proveedores from './pages/Proveedores.jsx';
import CursoIndex from './pages/CursoAws/CursoIndex.jsx';
import Clase1 from './pages/CursoAws/Clase1.jsx';
import Clase2 from './pages/CursoAws/Clase2.jsx';
import Clase3 from './pages/CursoAws/Clase3.jsx';
import Clase4 from './pages/CursoAws/Clase4.jsx';
import Clase5 from './pages/CursoAws/Clase5.jsx';
import Clase6 from './pages/CursoAws/Clase6.jsx';
import Modulo2Clase1 from './pages/CursoAws/Modulo2Clase1.jsx';
import Modulo2Clase2 from './pages/CursoAws/Modulo2Clase2.jsx';
import Modulo2Clase3 from './pages/CursoAws/Modulo2Clase3.jsx';
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
          <Route path="aprendizaje/aws-desde-cero" element={<CursoIndex />} />
          <Route path="aprendizaje/aws-desde-cero/clase-1" element={<Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/clase-2" element={<Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/clase-3" element={<Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/clase-4" element={<Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/clase-5" element={<Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/clase-6" element={<Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-2/clase-1" element={<Modulo2Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-2/clase-2" element={<Modulo2Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-2/clase-3" element={<Modulo2Clase3 />} />
          <Route path="aprendizaje/laboratorios" element={<Laboratorios />} />
          <Route path="aprendizaje/errores" element={<Errores />} />
          <Route path="aprendizaje/glosario" element={<Glosario />} />
          <Route path="*" element={<Navigate to="/iam/usuarios/crear" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
