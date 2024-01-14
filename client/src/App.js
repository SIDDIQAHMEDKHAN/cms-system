import Layout from "./components/Layout";
import { Routes as Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AllContact from "./pages/AllContact";
import CreateContact from "./pages/CreateContact";
import { AuthContextProvider } from "./context/AuthContext";
import { ToastContextProvider } from "./context/ToastContext";
import EditContact from "./pages/EditContact";

const App = () => {
  return (
    <ToastContextProvider>
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreateContact />} />
            <Route path="/mycontact" element={<AllContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </ToastContextProvider>
  );
};

export default App;
