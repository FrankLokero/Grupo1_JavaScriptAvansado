import { FormEvent } from "react";

export interface Post {
  codigo: int;
  nombre: string;
  apellido: string;
  privilegio: string;
}

export interface FormPostErrors {
  codigo?: int;
  nombre?: string;
  apellido?: string;
  privilegio?: string;
  [key: string]: string | undefined;
}

export interface UsePostFormReturn {
  // Estado
  formData: Post;
  errores: PostFormErrors;
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Post, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}