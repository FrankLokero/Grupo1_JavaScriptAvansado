import { FormEvent, useCallback, useState } from "react";

// Definimos los tipos aquí mismo para evitar errores si no tienes el archivo types/sale.ts
export interface Sale {
  nro_comprobante: string;
  cliente: string;
  total: string;
  fecha?: string;
}

export interface FormSaleErrors {
  nro_comprobante?: string;
  cliente?: string;
  total?: string;
  submit?: string;
}

const initialFormData: Sale = {
  nro_comprobante: "",
  cliente: "",
  total: "",
};

export const useSaleForm = () => {
  const [formData, setFormData] = useState<Sale>(initialFormData);
  const [errores, setErrores] = useState<FormSaleErrors>({});
  const [enviado, setEnviado] = useState<boolean>(false);
  const [enviando, setEnviando] = useState<boolean>(false);

  const handleChange = useCallback(
    (campo: string, valor: string) => {
      setFormData((prev) => ({ ...prev, [campo]: valor }));
      if (errores[campo as keyof FormSaleErrors]) {
        setErrores((prev) => ({ ...prev, [campo]: "" }));
      }
    },
    [errores]
  );

  // Validación interna simple
  const validateForm = (): boolean => {
    const newErrors: FormSaleErrors = {};
    if (!formData.nro_comprobante)
      newErrors.nro_comprobante = "El Nro de comprobante es obligatorio";
    if (!formData.cliente) newErrors.cliente = "El cliente es obligatorio";
    if (!formData.total || parseFloat(formData.total) <= 0)
      newErrors.total = "Ingrese un monto válido";

    setErrores(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      if (!validateForm()) return;

      setEnviando(true);
      try {
        // 🔥 PETICIÓN POST A VENTAS
        const payload = { ...formData, fecha: new Date().toISOString() }; // Agregamos fecha automática

        const response = await fetch("http://localhost:3001/ventas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) throw new Error("Error servidor");

        setEnviado(true);
        setTimeout(() => {
          setFormData(initialFormData);
          setEnviado(false);
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
        setErrores({ submit: "No se pudo registrar la venta." });
      } finally {
        setEnviando(false);
      }
    },
    [formData]
  );

  const handleReset = () => {
    setFormData(initialFormData);
    setErrores({});
    setEnviado(false);
  };

  return {
    formData,
    errores,
    enviado,
    enviando,
    handleChange,
    handleSubmit,
    handleReset,
  };
};
