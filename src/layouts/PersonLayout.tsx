import { Outlet } from "react-router-dom";

function PersonLayout() {
  return (
    <div>
      <h2>Bievenidos Modulo Persona</h2>
      <Outlet />
    </div>
  );
}
export default PersonLayout;
