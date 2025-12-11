import { FormEvent, useCallback, useState } from "react";
import { validateFormCustomer } from "../utils/validatorsFormCustomer";
import {
  FormCustomerErrors,
  Customer,
  UseCustomerFormReturn,
} from "../types/customer";

const initialFormData: Customer = {
  dni: "",
  nombre: "",
  apellido: "",
  genero: "",
  correo: "",
};

export const useCustomerForm = (): UseCustomerFormReturn => {
  const [formData, setFormData] = useState<Customer>(initialFormData);
  const [errores, setErrores] = useState<FormCustomerErrors>({});
  const [enviado, setEnviado] = useState<boolean>(false);
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleChange = useCallback(
    (campo: keyof Customer, valor: string | boolean) => {
      setFormData((prevState) => ({
        ...prevState,
        [campo]: valor,
      }));
      if (errores[campo]) {
        setErrores((prev) => ({ ...prev, [campo]: "" }));
      }
    },
    [errores]
  );

  const validateForm = useCallback((): boolean => {
    const nuevosErrores = validateFormCustomer(formData);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (event: FormEvent): Promise<void> => {
      event.preventDefault();
      if (!validateForm()) return;

      setEnviando(true);

      try {
        // 🔥 PETICIÓN POST A CLIENTES
        const response = await fetch("http://localhost:3001/clientes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Error servidor");

        setEnviado(true);
        setTimeout(() => {
          setFormData(initialFormData);
          setEnviado(false);
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        setErrores({ submit: "No se pudo guardar el cliente." });
      } finally {
        setEnviando(false);
      }
    },
    [formData, validateForm]
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
