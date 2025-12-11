import { FormLoginErrors, login } from "../types/login";

export const validateFormLogin = (formData: login): FormLoginErrors => {
  const nuevosErrores: FormLoginErrors = {};

  if (!formData.codigo.trim()) {
    nuevosErrores.codigo = "El código es obligatorio";
  }

  if (!formData.usuario.trim()) {
    nuevosErrores.usuario = "El nombre de usuario es obligatorio";
  }

  if (!formData.contraseña.trim()) {
    nuevosErrores.contraseña = "La contraseña es obligatoria";
  } 

  return nuevosErrores;
};

// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizeLoginData = (formData: login): login => ({
  codigo: formData.codigo.trim().toUpperCase(),
  usuario: formData.usuario.trim(),
  contraseña: formData.contraseña.trim(),
});