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
import Modulo2Clase4 from './pages/CursoAws/Modulo2Clase4.jsx';
import Modulo2Clase5 from './pages/CursoAws/Modulo2Clase5.jsx';
import Modulo2Clase6 from './pages/CursoAws/Modulo2Clase6.jsx';
import Modulo3Overview from './pages/CursoAws/Modulo3Overview.jsx';
import Modulo3Clase1 from './pages/CursoAws/Modulo3Clase1.jsx';
import Modulo3Clase2 from './pages/CursoAws/Modulo3Clase2.jsx';
import Modulo3Clase3 from './pages/CursoAws/Modulo3Clase3.jsx';
import Modulo3Clase4 from './pages/CursoAws/Modulo3Clase4.jsx';
import Modulo3Clase5 from './pages/CursoAws/Modulo3Clase5.jsx';
import Modulo3Clase6 from './pages/CursoAws/Modulo3Clase6.jsx';
import Modulo3Clase7 from './pages/CursoAws/Modulo3Clase7.jsx';
import Modulo4Overview from './pages/CursoAws/Modulo4Overview.jsx';
import Modulo4Clase1 from './pages/CursoAws/Modulo4Clase1.jsx';
import Modulo4Clase2 from './pages/CursoAws/Modulo4Clase2.jsx';
import Modulo4Clase3 from './pages/CursoAws/Modulo4Clase3.jsx';
import Modulo4Clase4 from './pages/CursoAws/Modulo4Clase4.jsx';
import Modulo4Clase5 from './pages/CursoAws/Modulo4Clase5.jsx';
import Modulo5Overview from './pages/CursoAws/Modulo5Overview.jsx';
import Modulo5Clase1 from './pages/CursoAws/Modulo5Clase1.jsx';
import Modulo5Clase2 from './pages/CursoAws/Modulo5Clase2.jsx';
import Modulo5Clase3 from './pages/CursoAws/Modulo5Clase3.jsx';
import Modulo5Clase4 from './pages/CursoAws/Modulo5Clase4.jsx';
import Modulo5Clase5 from './pages/CursoAws/Modulo5Clase5.jsx';
import Modulo5Clase6 from './pages/CursoAws/Modulo5Clase6.jsx';
import Modulo5Clase7 from './pages/CursoAws/Modulo5Clase7.jsx';
import Modulo5Clase8 from './pages/CursoAws/Modulo5Clase8.jsx';
import Modulo6Overview from './pages/CursoAws/Modulo6Overview.jsx';
import Modulo6Clase1 from './pages/CursoAws/Modulo6Clase1.jsx';
import Modulo6Clase2 from './pages/CursoAws/Modulo6Clase2.jsx';
import Modulo6Clase3 from './pages/CursoAws/Modulo6Clase3.jsx';
import Modulo6Clase4 from './pages/CursoAws/Modulo6Clase4.jsx';
import Modulo6Clase5 from './pages/CursoAws/Modulo6Clase5.jsx';
import Modulo6Clase6 from './pages/CursoAws/Modulo6Clase6.jsx';
import Modulo6Clase7 from './pages/CursoAws/Modulo6Clase7.jsx';
import Modulo6Clase8 from './pages/CursoAws/Modulo6Clase8.jsx';
import Modulo7Overview from './pages/CursoAws/Modulo7Overview.jsx';
import Modulo7Clase1 from './pages/CursoAws/Modulo7Clase1.jsx';
import Modulo7Clase2 from './pages/CursoAws/Modulo7Clase2.jsx';
import Modulo7Clase3 from './pages/CursoAws/Modulo7Clase3.jsx';
import Modulo7Clase4 from './pages/CursoAws/Modulo7Clase4.jsx';
import Modulo7Clase5 from './pages/CursoAws/Modulo7Clase5.jsx';
import Modulo7Clase6 from './pages/CursoAws/Modulo7Clase6.jsx';
import Modulo7Clase7 from './pages/CursoAws/Modulo7Clase7.jsx';
import Modulo7Clase8 from './pages/CursoAws/Modulo7Clase8.jsx';
import Modulo8Overview from './pages/CursoAws/Modulo8Overview.jsx';
import Modulo8Clase1 from './pages/CursoAws/Modulo8Clase1.jsx';
import Modulo8Clase2 from './pages/CursoAws/Modulo8Clase2.jsx';
import Modulo8Clase3 from './pages/CursoAws/Modulo8Clase3.jsx';
import Modulo8Clase4 from './pages/CursoAws/Modulo8Clase4.jsx';
import Modulo8Clase5 from './pages/CursoAws/Modulo8Clase5.jsx';
import Modulo8Clase6 from './pages/CursoAws/Modulo8Clase6.jsx';
import Modulo8Clase7 from './pages/CursoAws/Modulo8Clase7.jsx';
import Modulo8Clase8 from './pages/CursoAws/Modulo8Clase8.jsx';
import Modulo9Overview from './pages/CursoAws/Modulo9Overview.jsx';
import Modulo9Clase1 from './pages/CursoAws/Modulo9Clase1.jsx';
import Modulo9Clase2 from './pages/CursoAws/Modulo9Clase2.jsx';
import Modulo9Clase3 from './pages/CursoAws/Modulo9Clase3.jsx';
import Modulo9Clase4 from './pages/CursoAws/Modulo9Clase4.jsx';
import Modulo9Clase5 from './pages/CursoAws/Modulo9Clase5.jsx';
import Modulo9Clase6 from './pages/CursoAws/Modulo9Clase6.jsx';
import Modulo9Clase7 from './pages/CursoAws/Modulo9Clase7.jsx';
import Modulo9Clase8 from './pages/CursoAws/Modulo9Clase8.jsx';
import Modulo10Overview from './pages/CursoAws/Modulo10Overview.jsx';
import Modulo10Clase1 from './pages/CursoAws/Modulo10Clase1.jsx';
import Modulo10Clase2 from './pages/CursoAws/Modulo10Clase2.jsx';
import Modulo10Clase3 from './pages/CursoAws/Modulo10Clase3.jsx';
import Modulo10Clase4 from './pages/CursoAws/Modulo10Clase4.jsx';
import Modulo10Clase5 from './pages/CursoAws/Modulo10Clase5.jsx';
import Modulo10Clase6 from './pages/CursoAws/Modulo10Clase6.jsx';
import Modulo10Clase7 from './pages/CursoAws/Modulo10Clase7.jsx';
import Modulo10Clase8 from './pages/CursoAws/Modulo10Clase8.jsx';
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
          <Route path="aprendizaje/aws-desde-cero/modulo-2/clase-4" element={<Modulo2Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-2/clase-5" element={<Modulo2Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-2/clase-6" element={<Modulo2Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3" element={<Modulo3Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-1" element={<Modulo3Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-2" element={<Modulo3Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-3" element={<Modulo3Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-4" element={<Modulo3Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-5" element={<Modulo3Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-6" element={<Modulo3Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-3/clase-7" element={<Modulo3Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-4" element={<Modulo4Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-4/clase-1" element={<Modulo4Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-4/clase-2" element={<Modulo4Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-4/clase-3" element={<Modulo4Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-4/clase-4" element={<Modulo4Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-4/clase-5" element={<Modulo4Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5" element={<Modulo5Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-1" element={<Modulo5Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-2" element={<Modulo5Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-3" element={<Modulo5Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-4" element={<Modulo5Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-5" element={<Modulo5Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-6" element={<Modulo5Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-7" element={<Modulo5Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-5/clase-8" element={<Modulo5Clase8 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6" element={<Modulo6Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-1" element={<Modulo6Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-2" element={<Modulo6Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-3" element={<Modulo6Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-4" element={<Modulo6Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-5" element={<Modulo6Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-6" element={<Modulo6Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-7" element={<Modulo6Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-6/clase-8" element={<Modulo6Clase8 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7" element={<Modulo7Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-1" element={<Modulo7Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-2" element={<Modulo7Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-3" element={<Modulo7Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-4" element={<Modulo7Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-5" element={<Modulo7Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-6" element={<Modulo7Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-7" element={<Modulo7Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-7/clase-8" element={<Modulo7Clase8 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8" element={<Modulo8Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-1" element={<Modulo8Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-2" element={<Modulo8Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-3" element={<Modulo8Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-4" element={<Modulo8Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-5" element={<Modulo8Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-6" element={<Modulo8Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-7" element={<Modulo8Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-8/clase-8" element={<Modulo8Clase8 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9" element={<Modulo9Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-1" element={<Modulo9Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-2" element={<Modulo9Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-3" element={<Modulo9Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-4" element={<Modulo9Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-5" element={<Modulo9Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-6" element={<Modulo9Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-7" element={<Modulo9Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-9/clase-8" element={<Modulo9Clase8 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10" element={<Modulo10Overview />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-1" element={<Modulo10Clase1 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-2" element={<Modulo10Clase2 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-3" element={<Modulo10Clase3 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-4" element={<Modulo10Clase4 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-5" element={<Modulo10Clase5 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-6" element={<Modulo10Clase6 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-7" element={<Modulo10Clase7 />} />
          <Route path="aprendizaje/aws-desde-cero/modulo-10/clase-8" element={<Modulo10Clase8 />} />
          <Route path="aprendizaje/laboratorios" element={<Laboratorios />} />
          <Route path="aprendizaje/errores" element={<Errores />} />
          <Route path="aprendizaje/glosario" element={<Glosario />} />
          <Route path="*" element={<Navigate to="/iam/usuarios/crear" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
