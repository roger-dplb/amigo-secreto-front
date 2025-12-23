import { BrowserRouter,Routes, Route } from "react-router-dom";
import Groups from "../pages/Groups";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/groups" element={<Groups />} />
      </Routes>
    </BrowserRouter>
  );
}