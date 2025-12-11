import { FormEvent } from "react";

export interface Person {
  id?: string; 
  codigo: string; 
  nombre: string;
  apellido: string;
  genero: string;
  correo: string;
  privilegio: string;
}

export interface FormPersonErrors {
  codigo?: number;
  nombre?: string;
  apellido?: string;
  genero?: string;
  correo?: string;
  privilegio?: string;
  [key: string]: string | number | undefined;
}

export interface UsePersonFormReturn {
  // Estado
  formData: Person;
  errores: FormPersonErrors; 
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Person, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}