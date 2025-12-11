import { FormEvent } from "react";

export interface Category {
  codigo: int;
  categoria: string;
}

export interface FormCategoryErrors {
  codigo?: int;
  categoria?: string;
  [key: string]: string | undefined;
}

export interface UseCategoryFormReturn {
  // Estado
  formData: Category;
  errores: CategoryFormErrors;
  enviado: boolean;
  enviando: boolean;

  // Handlers
  handleChange: (field: keyof Category, value: string | boolean) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  handleReset: () => void;
  validateForm: () => boolean;
}