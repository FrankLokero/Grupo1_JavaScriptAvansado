import { FormSupplierErrors, Supplier } from "../types/supplier";

export const validateFormSupplier = (formData: Supplier): FormSupplierErrors => {
  const nuevosErrores: FormSupplierErrors = {};

  if (!formData.codigo.trim()) {
    nuevosErrores.codigo = "El codigo es obligatorio";
  }

  if (!formData.nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio";
  } 

  if (!formData.correo.trim()) {
    nuevosErrores.correo = "El correo es obligatorio";
  }

  return nuevosErrores;
};

// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizeSupplierData = (formData: Supplier): Supplier => ({
  codigo: formData.codigo.trim().toUpperCase(),
  nombre: formData.nombre.trim(),
  correo: formData.nombre.trim(),
});