import { Outlet } from "react-router-dom";
import PageFooter from "../components/PageFooter";
import PageNav from "../components/PageNav";

function MainLayout() {
  return (
    <div className="container">
      <PageNav />
      <Outlet />
      <PageFooter />
    </div>
  );
}
export default MainLayout;
