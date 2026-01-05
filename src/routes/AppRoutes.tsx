import { BrowserRouter,Routes, Route } from "react-router-dom";
import Groups from "../pages/Groups";
import GroupMemberPage from "../pages/GroupMember";
export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/groups" element={<Groups />} />
        <Route path ="/groupmember" element={<GroupMemberPage />} />
      </Routes>

    </BrowserRouter>
  );
}