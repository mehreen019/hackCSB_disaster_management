import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/adminlogin";
import AuthorityLogin from "./pages/authoritylogin";
import AuthoritySignup from "./pages/authoritysignup";
import AdminSignup from "./pages/adminsignup";
import NotFound from "./pages/NotFound";
//import { useAuth } from "./context/AuthContext";
//import Footer from "./components/footer/Footer";
function App() {
 // const auth = useAuth();

  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin_user/login" element={<AdminLogin/>} />
        <Route path="/admin_user/signup" element={<AdminSignup />} />
        <Route path="/authority_user/login" element={<AuthorityLogin />} />
        <Route path="/authority_user/signup" element={<AuthoritySignup/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;