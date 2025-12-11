import { FormEvent, useCallback, useState } from "react";
import { validateFormVenta } from "../utils/validatorsFormVenta";
import {
  FormVentaErrors,
  Venta,
  UseVentaFormReturn,
} from "../types/venta";

const initialFormData: Venta = {
  codigo: "",
  nombre: "",
  apellido: "",
  producto: "",
  precio: "",
  cantidad: "",
};
export const useVentaForm = (): UseVentaFormReturn => {
  //1. Estado principal del formulario
  const [formData, setFormData] = useState<Venta>(initialFormData);
  // 2. Estado para manejar envío y validación
  const [errores, setErrores] = useState<FormVentaErrors>({});
  const [enviado, setEnviado] = useState<boolean>(false);
  const [enviando, setEnviando] = useState<boolean>(false);

  //3. Handler genérico para cambios en los inputs
  const handleChange = useCallback(
    (campo: keyof Venta, valor: string | boolean) => {
      setFormData((prevState) => ({
        ...prevState,
        [campo]: valor,
      }));
      // Limpiar error del campo cuando el usuario empiece a escribir
      if (errores[campo]) {
        setErrores((prev) => ({
          ...prev,
          [campo]: "",
        }));
      }
    },
    [errores]
  );

  //4. Validación del formulario
  const validateForm = useCallback((): boolean => {
    const nuevosErrores = validateFormVenta(formData);
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }, [formData]);

  //5. Handler para el envío del formulario
  const handleSubmit = useCallback(
    async (event: FormEvent): Promise<void> => {
      event.preventDefault();
      if (!validateForm()) {
        return;
      }
      setEnviando(true);
      // Simular envío de datos
      try {
        console.log("Datos de la Venta:", formData);
        // Simular retardo de red
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEnviado(true);
        // Resetear formulario después de envío exitoso
        setTimeout(() => {
          setFormData(initialFormData);
          setEnviado(false);
        }, 3000);
      } catch (error) {
        console.error("Error al enviar el formulario:", error);
        setErrores({
          submit: "Error al enviar el formulario. Inténtalo de nuevo.",
        });
      } finally {
        setEnviando(false);
      }
    },
    [formData, validateForm]
  );
  //6. Handler para resetear el formulario
  const handleReset = useCallback((): void => {
    setFormData(initialFormData);
    setErrores({});
    setEnviado(false);
  }, []);

  return {
    // Estados
    formData,
    errores,
    enviado,
    enviando,
    // Handlers
    handleChange,
    handleSubmit,
    handleReset,
    validateForm,
  };
};