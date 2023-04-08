import CustomerLogin from "./Customer/CustomerLogin";
import AdminLogin from "./Admin/AdminLogin";

function Login () {
    return (
        <div>
            <CustomerLogin></CustomerLogin>
            <AdminLogin></AdminLogin>
        </div>
    )
};

export default Login;