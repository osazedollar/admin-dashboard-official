import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Providers from "./pages/provider/Providers";
import Users from "./pages/user/Users";
import AddUser from "./pages/user/AddUser";
import AccountActivity from "./pages/user/AccountActivity";
import AddProvider from "./pages/provider/AddProvider";
import Content from "./pages/content/overProduct"
import ContentViewTrend from "./pages/content/overTrend"
import Auth from "./pages/auth/SignIn"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/auth/signin" element={<Auth />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/add" element={<AddProvider />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add" element={<AddUser />} />
        <Route path="/users/activity" element={<AccountActivity />} />
        <Route path="/content" element={<Content/>} />
        <Route path="/content/view-trend" element={<ContentViewTrend/>} />
      </Routes>
    </BrowserRouter>
  );
}
