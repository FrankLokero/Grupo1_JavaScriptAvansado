// src/types/login.ts
import { FormEvent } from "react";

export interface LoginData {
  usuario: string;
  contraseña: string;
}

export interface FormLoginErrors {
  usuario?: string;
  contraseña?: string;
  submit?: string; // Para errores generales como "Usuario no encontrado"
  [key: string]: string | undefined;
}

export interface UseLoginFormReturn {
  formData: LoginData;
  errores: FormLoginErrors;
  enviando: boolean;
  handleChange: (field: keyof LoginData, value: string) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
}