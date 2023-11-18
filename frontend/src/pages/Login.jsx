import LoginForm from "../forms/Login";
import AuthLayout from "../layout/AuthLayout";

export default function Login() {
  console.log("Login is running");
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
