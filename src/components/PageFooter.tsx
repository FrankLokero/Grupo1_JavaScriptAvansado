import "../index.css";

const PageFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 fw-light fixed-bottom w-100">
      &copy; {new Date().getFullYear()} <b>Control de Inventario</b>. Todos los derechos reservados.
    </footer>
  );
};

export default PageFooter;
