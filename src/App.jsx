import { Route, Routes } from "react-router-dom";
import { Index } from "./pages/login/Index";
import { Login } from "./pages/login/Login";
import { Index as DashboardIndex } from "./pages/dashboard/Index";
import { Companies } from "./pages/information/Companies";
import { PermiRol } from "./pages/permissions/PermiRol";
import { PermiRolRecord } from "./pages/permissions/PermiRolRecord";
import { PermiUser } from "./pages/permissions/PermiUser";
import { PermiUserRecord } from "./pages/permissions/PermiUserRecord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />}>
        **<Route index element={<Login />}></Route>
      </Route>
      <Route path="/home" element={<DashboardIndex />}>
        **<Route index element={<Companies />}></Route>
        <Route path="/home/role" element={<PermiRol />}></Route>
        <Route path="/home/rolerecord" element={<PermiRolRecord />}></Route>
        <Route path="/home/user" element={<PermiUser />}></Route>
        <Route path="/home/userrecord" element={<PermiUserRecord />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
