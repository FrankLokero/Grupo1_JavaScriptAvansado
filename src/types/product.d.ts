export interface Product {
  id?: string;          // <--- IMPORTANTE: Agregado para poder editar/eliminar
  codigo: string;
  nombre: string;
  precio: number;       // <--- CORREGIDO: 'int' no existe, usamos 'number'
  descripcion: string;
  activo: boolean;
}

export interface stock {
  id: int;
  producto: string
  cantidad: int;
}

export interface FormProductErrors {
  codigo?: string;
  nombre?: string;
  precio?: string;
  descripcion?: string;
  activo?: string;
  [key: string]: string | undefined;
}

export interface UseProductFormReturn {
  // Estado
  formData: Product;
  errores: FormProductErrors;
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Product, value: string | boolean | number) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}