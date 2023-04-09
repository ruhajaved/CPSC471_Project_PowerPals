import "./App.css";
import { AdminProvider } from "./Context/AdminContext";
import { CustomerProvider } from "./Context/CustomerContext";
import Main from "./Main";

function App() {
  return (
    <AdminProvider>
      <CustomerProvider>
        <Main />
      </CustomerProvider>
    </AdminProvider>
  );
}

export default App;
