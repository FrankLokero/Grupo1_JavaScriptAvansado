import { FormEvent } from "react";

export interface Supplier {
  codigo: int;
  nombre: string;
  correo: string;
}

export interface FormSupplierErrors {
  codigo?: int;
  nombre?: string;
  correo?: string;
  [key: string]: string | undefined;
}

export interface UseSupplierFormReturn {
  // Estado
  formData: Supplier;
  errores: SupplierFormErrors;
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Supplier, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}
