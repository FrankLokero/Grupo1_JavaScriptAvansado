import { FormEvent, useCallback, useState } from "react";
import { validateFormProduct } from "../utils/validatorsFormProduct";
import {
  FormProductErrors,
  Product,
  UseProductFormReturn,
} from "../types/product";

const initialFormData: Product = {
  codigo: "",
  nombre: "",
  precio: "",
  descripcion: "",
  activo: true,
};

export const useProductForm = (): UseProductFormReturn => {
  const [formData, setFormData] = useState<Product>(initialFormData);
  const [errores, setErrores] = useState<FormProductErrors>({});
  const [enviado, setEnviado] = useState<boolean>(false);
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleChange = useCallback(
    (campo: keyof Product, valor: string | boolean) => {
      setFormData((prevState) => ({ ...prevState, [campo]: valor }));
      if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: "" }));
    },
    [errores]
  );

  const validateForm = useCallback((): boolean => {
    const nuevosErrores = validateFormProduct(formData);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (event: FormEvent): Promise<void> => {
      event.preventDefault();
      if (!validateForm()) return;

      setEnviando(true);

      try {
        // 🔥 PETICIÓN POST A PRODUCTOS
        const response = await fetch("http://localhost:3001/productos", {
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
        setErrores({ submit: "No se pudo guardar el producto." });
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
