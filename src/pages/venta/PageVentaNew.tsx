import { useVentaForm } from "../../hooks/useVentaForm";
import { ChangeEvent } from "react";

const PageventaNew = () => {
  const {
    //estado
    formData,
    errores,
    enviado,
    enviando,
    //handlers
    handleChange,
    handleSubmit,
    handleReset,
  } = useVentaForm();
  //Handler genérico para cambios en los inputs
  const handleInputChange =
    (campo: keyof typeof formData) => (e: ChangeEvent<HTMLInputElement>) => {
      const valor =
        e.target.type === "checkbox" ? e.target.checked : e.target.value;
      handleChange(campo, valor);
    };

  return (
    <div>
      {/* Mensaje de éxito */}
      {enviado && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          <strong>¡Éxito!</strong> Venta guardado correctamente.
          <button
            type="button"
            className="btn-close"
            onClick={() => handleChange("enviado" as any, false)}
          ></button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="codigo">Codigo</label>
          <input
            value={formData.codigo}
            type="input"
            onChange={handleInputChange("codigo")}
            className={`form-control ${errores.codigo ? "is-invalid" : ""}`}
            id="codigo"
            placeholder="ingrese el Codigo del cliente"
            disabled={enviando}
          ></input>
          {errores.codigo && (
            <div className="invalid-feedback">{errores.codigo}</div>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="input"
            value={formData.nombre}
            onChange={handleInputChange("nombre")}
            className={`form-control ${errores.nombre ? "is-invalid" : ""}`}
            id="nombre"
            placeholder="ingrese el nombre del cliente"
            disabled={enviando}
          ></input>
          {errores.nombre && (
            <div className="invalid-feedback">{errores.nombre}</div>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="input"
            value={formData.apellido}
            onChange={handleInputChange("apellido")}
            className={`form-control ${errores.apellido ? "is-invalid" : ""}`}
            id="apellido"
            placeholder="ingrese el apellido del cliente"
            disabled={enviando}
          ></input>
          {errores.apellido && (
            <div className="invalid-feedback">{errores.apellido}</div>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="producto">Producto</label>
          <input
            type="input"
            value={formData.producto}
            onChange={handleInputChange("producto")}
            className={`form-control ${errores.producto ? "is-invalid" : ""}`}
            id="producto"
            placeholder="ingrese el nombre del producto"
            disabled={enviando}
          ></input>
          {errores.producto && (
            <div className="invalid-feedback">{errores.producto}</div>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="input"
            value={formData.precio}
            onChange={handleInputChange("precio")}
            className={`form-control ${errores.precio ? "is-invalid" : ""}`}
            id="precio"
            placeholder="ingrese el precio del producto"
            disabled={enviando}
          ></input>
          {errores.precio && (
            <div className="invalid-feedback">{errores.precio}</div>
          )}
        </div>


        <div className="form-group">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            type="input"
            value={formData.cantidad}
            onChange={handleInputChange("cantidad")}
            className={`form-control ${errores.cantidad ? "is-invalid" : ""}`}
            id="cantidad"
            placeholder="ingrese la cantidad del producto"
            disabled={enviando}
          ></input>
          {errores.cantidad && (
            <div className="invalid-feedback">{errores.cantidad}</div>
          )}
        </div>
        

        
        {/* Botones de acción */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            disabled={enviando}
            className="btn btn-primary flex-fill"
          >
            {enviando ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleReset}
            disabled={enviando}
          >
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageventaNew;