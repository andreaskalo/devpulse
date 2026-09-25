import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import AuthBrand from "../components/AuthBrand.jsx";
import AuthInput from "../components/AuthInput.jsx";
import AuthSubmitButton from "../components/AuthSubmitButton.jsx";
import AuthFooterLink from "../components/AuthFooterLink.jsx";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const result = await login(identifier, password);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setSuccess("Login successful.");
      setIdentifier("");
      setPassword("");

      navigate("/dashboard", { replace: true });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthBrand />
        <section className=" text-center mt-4 ">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to continue to DevPulse
          </p>
        </section>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="flex flex-col space-y-4">
            <AuthInput
              label="Username or email"
              id="identifier"
              type="text"
              name="identifier"
              value={identifier}
              onChange={(e) => {
                setIdentifier(e.currentTarget.value);
              }}
              placeholder="Username/e-mail"
            />

            <AuthInput
              label="Password"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              placeholder="Password"
            />
          </div>

          <AuthSubmitButton
            isLoading={isLoading}
            processingText="Logging in..."
            actionText="Login"
          />

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
        </form>

        <AuthFooterLink
          text="Don't have an account?"
          to="/register"
          linkText="Register"
        />
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;
