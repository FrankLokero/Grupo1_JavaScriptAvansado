import { FormEvent, useCallback, useState, useEffect } from "react";
import { validateFormPerson } from "../utils/validatorsFormPerson";
import { FormPersonErrors, Person, UsePersonFormReturn } from "../types/person";

const initialFormData: Person = {
  codigo: "",
  nombre: "",
  apellido: "",
  genero: "",
  correo: "",
  privilegio: "",
};

// Aceptamos un parámetro opcional 'idToEdit'
export const usePersonForm = (idToEdit?: string): UsePersonFormReturn => {
  const [formData, setFormData] = useState<Person>(initialFormData);
  const [errores, setErrores] = useState<FormPersonErrors>({});
  const [enviado, setEnviado] = useState<boolean>(false);
  const [enviando, setEnviando] = useState<boolean>(false);

  // 1. EFECTO: Si hay un ID, cargamos los datos de esa persona para editarlos
  useEffect(() => {
    if (idToEdit) {
      fetch(`http://localhost:3001/personas/${idToEdit}`)
        .then((res) => {
          if (!res.ok) throw new Error("No se encontró la persona");
          return res.json();
        })
        .then((data) => {
          setFormData(data); // Rellenamos el formulario con los datos existentes
        })
        .catch((err) => console.error(err));
    } else {
      setFormData(initialFormData); // Si no hay ID, limpiamos el form
    }
  }, [idToEdit]);

  const handleChange = useCallback(
    (campo: keyof Person, valor: string | boolean) => {
      setFormData((prevState) => ({
        ...prevState,
        [campo]: valor,
      }));
      if (errores[campo]) {
        setErrores((prev) => ({
          ...prev,
          [campo]: "",
        }));
      }
    },
    [errores]
  );

  const validateForm = useCallback((): boolean => {
    const nuevosErrores = validateFormPerson(formData);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (event: FormEvent): Promise<void> => {
      event.preventDefault();
      if (!validateForm()) return;
      
      setEnviando(true);

      try {
        // 2. LÓGICA INTELIGENTE: Decidir si es POST o PUT
        const method = idToEdit ? "PUT" : "POST";
        const url = idToEdit 
          ? `http://localhost:3001/personas/${idToEdit}` 
          : "http://localhost:3001/personas";

        const response = await fetch(url, {
          method: method, // <--- Aquí cambia la magia
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Error en la respuesta del servidor");

        setEnviado(true);

        // Si es nuevo, reseteamos. Si es edición, mantenemos los datos un momento.
        if (!idToEdit) {
          setTimeout(() => {
             setFormData(initialFormData);
             setEnviado(false);
          }, 2000);
        }

      } catch (error) {
        console.error("Error al enviar:", error);
        setErrores({ submit: "Error al guardar en la base de datos." });
      } finally {
        setEnviando(false);
      }
    },
    [formData, validateForm, idToEdit] // <--- Importante incluir idToEdit aquí
  );

  const handleReset = useCallback((): void => {
    setFormData(initialFormData);
    setErrores({});
    setEnviado(false);
  }, []);

  return {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
    validateForm,
  };
};