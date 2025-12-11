import { FormEvent } from "react";

export interface Venta {
  codigo: int;
  nombre: string;
  apellido: string;
  producto: string;
  precio: int;
  cantidad: int;
}

export interface Pagos {
  monto: int;
  MetodoPago: int;
  cantidad: int;
}

export interface Metodopago {
  igv: int;
  descuentos: int;
  montoTotal: int;
}

export interface pagoFinal {
  precio: int;
  precioIGV: int;
  precioTotal: int;
}

export interface FormVentaErrors {
  codigo?: int;
  nombre?: string;
  apellido?: string;
  producto?: string;
  precio?: int;
  cantidad?: int;
  [key: string]: string | undefined;
}

export interface UseVentaFormReturn {
  // Estado
  formData: Venta;
  errores: VentaFormErrors;
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Venta, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}