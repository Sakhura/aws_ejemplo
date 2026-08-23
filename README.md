# Nube Académica — Simulador IAM (uso educativo)

Aviso importante: esta aplicación es una **maqueta educativa** pensada para que estudiantes practiquen conceptos de gestión de identidades y accesos (IAM). No está afiliada a Amazon Web Services ni a ningún proveedor de nube real, no reproduce su marca, y ninguna acción de la interfaz se comunica con una nube real: todos los datos (usuarios, grupos, roles, políticas, proveedores) son de ejemplo y viven solo en el estado del navegador.

## Cómo ejecutarla

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

## Qué incluye

Ocho vistas, accesibles desde el menú lateral:

- **Gestión de acceso**: Usuarios (asistente de creación en 3 pasos), Grupos de usuarios, Roles, Políticas, Proveedores de identidad.
- **Aprendizaje**: Laboratorios guiados, Errores frecuentes, Glosario.

El asistente "Crear nuevo usuario" incluye validación real de contraseña (longitud, mayúscula, número, símbolo), medidor de fortaleza, selección de grupos/políticas y generación de credenciales de ejemplo descargables en `.csv`.

## Sistema de diseño

La interfaz usa los tokens y componentes del sistema **Nocturne** (`src/styles/tokens.css`, `src/styles/layout.css`), portados desde el handoff de diseño original.
