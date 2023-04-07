import logo from "./logo.svg";
import "./App.css";
import { AdminProvider } from "./Context/AdminContext";
import Main from "./Main";
import AdminLogin from "./Admin/AdminLogin";

function App() {
  return (
    <AdminProvider>
      <Main />
    </AdminProvider>
  );
}

export default App;
