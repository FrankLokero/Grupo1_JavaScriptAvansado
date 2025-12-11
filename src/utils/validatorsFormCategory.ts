import { FormCategoryErrors, Category } from "../types/category";

export const validateFormCategory = (formData: Category): FormCategoryErrors => {
  const nuevosErrores: FormCategoryErrors = {};

  if (!formData.codigo.trim()) {
    nuevosErrores.codigo = "el codigo es obligatorio";
  }


  if (!formData.categoria.trim()) {
    nuevosErrores.categoria = "La categoria es obligatoria";
  }

  return nuevosErrores;
};
// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizeCategoriaData = (formData: Category): Category => ({
  codigo: formData.codigo.trim().toUpperCase(),
  categoria: formData.categoria.trim(),
});
