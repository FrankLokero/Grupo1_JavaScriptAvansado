export interface Customer {
  id?: string;       // <--- AGREGADO: El ID que genera json-server
  dni: string;       // <--- CORREGIDO: 'int' no existe, usamos string o number
  nombre: string;
  apellido: string;
  genero: string;
  correo: string;
}

export interface FormCustomerErrors {
  dni?: string;
  nombre?: string;
  apellido?: string;
  genero?: string;
  correo?: string;
  [key: string]: string | undefined;
}

export interface UseCustomerFormReturn {
  // Estado
  formData: Customer;
  errores: FormCustomerErrors;
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Customer, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}