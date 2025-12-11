// src/hooks/useLoginForm.ts
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importante para redirigir
import { FormLoginErrors, LoginData, UseLoginFormReturn } from "../types/login";

const initialFormData: LoginData = {
  usuario: "",
  contraseña: "",
};

export const useLoginForm = (): UseLoginFormReturn => {
  const [formData, setFormData] = useState<LoginData>(initialFormData);
  const [errores, setErrores] = useState<FormLoginErrors>({});
  const [enviando, setEnviando] = useState<boolean>(false);
  
  const navigate = useNavigate(); // Hook para movernos de página

  const handleChange = (campo: keyof LoginData, valor: string) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: "" }));
  };

  const validateForm = (): boolean => {
    const nuevosErrores: FormLoginErrors = {};
    if (!formData.usuario.trim()) nuevosErrores.usuario = "El usuario es requerido";
    if (!formData.contraseña.trim()) nuevosErrores.contraseña = "La contraseña es requerida";
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    if (!validateForm()) return;

    setEnviando(true);
    setErrores({}); // Limpiar errores previos

    try {
      // 1. Consultar a json-server filtrando por usuario y contraseña
      // OJO: Esto busca en el array "usuarios" de db.json
      const response = await fetch(
        `http://localhost:3001/usuarios?usuario=${formData.usuario}&contraseña=${formData.contraseña}`
      );

      if (!response.ok) throw new Error("Error al conectar con el servidor");

      const usuariosEncontrados = await response.json();

      // 2. Verificar si devolvió algo
      if (usuariosEncontrados.length > 0) {
        // ¡LOGIN EXITOSO!
        const usuarioLogueado = usuariosEncontrados[0];
        
        // Guardamos al usuario en localStorage para saber que está logueado
        localStorage.setItem("usuario", JSON.stringify(usuarioLogueado));

        // Redirigimos al Dashboard (o a la raíz)
        navigate("/"); 
      } else {
        // LOGIN FALLIDO
        setErrores({ submit: "Usuario o contraseña incorrectos." });
      }

    } catch (error) {
      console.error("Error Login:", error);
      setErrores({ submit: "Error de conexión. Intente más tarde." });
    } finally {
      setEnviando(false);
    }
  };

  return { formData, errores, enviando, handleChange, handleSubmit };
};