import { FormVentaErrors, Venta } from "../types/venta";

export const validateFormVenta = (formData: Venta): FormVentaErrors => {
  const nuevosErrores: FormVentaErrors = {};

  if (!formData.codigo.trim()) {
    nuevosErrores.codigo = "El código es obligatorio";
  }

  if (!formData.nombre.trim()) {
    nuevosErrores.nombre = "El nombre es obligatorio";
  }

  if (!formData.apellido.trim()) {
    nuevosErrores.apellido = "El apellido es obligatorio";
  }

  if (!formData.producto.trim()) {
    nuevosErrores.producto = "El producto es obligatorio";
  } 

  if (!formData.precio.trim()) {
    nuevosErrores.precio = "El precio es obligatorio";
  }

  if (!formData.cantidad.trim()) {
    nuevosErrores.cantidad = "La cantidad es obligatorio";
  } 

  return nuevosErrores;
};

// Sanitizar es el proceso de limpiar, normalizar y estandarizar los datos de entrada
// antes de procesarlos o almacenarlos.
export const sanitizeVentaData = (formData: Venta): Venta => ({
  codigo: formData.codigo.trim().toUpperCase(),
  nombre: formData.nombre.trim(),
  apellido: formData.apellido.trim(),
  producto: formData.producto.trim(),
  precio: formData.precio.trim(),
  cantidad: formData.cantidad.trim(),
});