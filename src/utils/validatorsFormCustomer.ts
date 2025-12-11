import { FormCustomerErrors, Customer } from "../types/customer";

export const validateFormCustomer = (formData: Customer): FormCustomerErrors => {
  const nuevosErrores: FormCustomerErrors = {};

  if (!formData.dni.trim()) {
    nuevosErrores.dni = "El dni es obligatorio";
  }

  if (!formData.nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio";
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

  return nuevosErrores;
};

// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizeCustomerData = (formData: Customer): Customer => ({
  dni: formData.dni.trim().toUpperCase(),
  nombre: formData.nombre.trim(),
  apellido: formData.nombre.trim(),
  genero: formData.nombre.trim(),
  correo: formData.nombre.trim(),
});