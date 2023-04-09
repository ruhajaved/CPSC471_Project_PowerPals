import CustomerLogin from "./Customer/CustomerLogin";
import AdminLogin from "./Admin/AdminLogin";
import CustomerSignUp from "./Customer/CustomerSignUp";

function Login () {
    return (
        <div>
            <CustomerLogin></CustomerLogin>
            <AdminLogin></AdminLogin>
            <CustomerSignUp></CustomerSignUp>
        </div>
    )
};

export default Login;