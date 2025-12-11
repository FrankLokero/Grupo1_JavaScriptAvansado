import { FormProductErrors, Product } from "../types/product";

export const validateFormProduct = (formData: Product): FormProductErrors => {
  const nuevosErrores: FormProductErrors = {};

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

  if (!formData.precio.trim()) {
    nuevosErrores.precio = "El precio es obligatorio";
  } 


  if (!formData.descripcion.trim()) {
    nuevosErrores.descripcion = "La descripcion es obligatoria";
  }

  return nuevosErrores;
};

// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizeProductoData = (formData: Product): Product => ({
  codigo: formData.codigo.trim().toUpperCase(),
  nombre: formData.nombre.trim(),
  precio: formData.precio.trim(),
  descripcion: formData.descripcion.trim(),
  activo: formData.activo,
});
