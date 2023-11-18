import RegisterForm from "../forms/Register";
import AuthLayout from "../layout/AuthLayout";

export default function Register() {
  console.log("register is running");
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
