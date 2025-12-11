import { FormPersonErrors, Person } from "../types/person";

export const validateFormPerson = (formData: Person): FormPersonErrors => {
  const nuevosErrores: FormPersonErrors = {};

  if (!formData.codigo.trim()) {
    nuevosErrores.codigo = "El código es obligatorio";
  } else if (formData.codigo.length < 3) {
    nuevosErrores.codigo = "El código debe tener al menos 3 caracteres";
  }

  if (!formData.nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio";
  } else if (formData.nombre.length < 2) {
    nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  if (!formData.apellido.trim()) {
    nuevosErrores.apellido = "El apellido es obligatorio";
  }

  if (!formData.genero.trim()) {
    nuevosErrores.genero = "El genero es obligatorio";
  }

  if (!formData.correo.trim()) {
    nuevosErrores.correo = "El correo es obligatorio";
  }

  if (!formData.privilegio.trim()) {
    nuevosErrores.privilegio = "El privilegio es obligatorio";
  }

  return nuevosErrores;
};

// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizePersonData = (formData: Person): Person => ({
  codigo: formData.codigo.trim().toUpperCase(),
  nombre: formData.nombre.trim(),
  apellido: formData.nombre.trim(),
  genero: formData.nombre.trim(),
  correo: formData.nombre.trim(),
  privilegio: formData.nombre.trim(),
});