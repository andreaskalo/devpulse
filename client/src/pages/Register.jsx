import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout.jsx";
import AuthCard from "../components/AuthCard.jsx";
import AuthBrand from "../components/AuthBrand.jsx";
import AuthInput from "../components/AuthInput.jsx";
import AuthSubmitButton from "../components/AuthSubmitButton.jsx";
import AuthFooterLink from "../components/AuthFooterLink.jsx";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error?.message ?? "Registration failed.");
        return;
      }

      setSuccess(data.message);
      navigate("/login", { replace: true });
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout>
      <AuthCard>
        <AuthBrand />
        <section className=" text-center mt-4 ">
          <h2 className="text-2xl font-bold text-slate-900">
            Create your account
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Join DevPulse and start exploring repositories
          </p>
        </section>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="space-y-4">
            <AuthInput
              label="Username"
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.currentTarget.value);
              }}
              placeholder="Username"
            />

            <AuthInput
              label="Email"
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              placeholder="E-mail"
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
            processingText="Registering..."
            actionText="Register"
          />

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          {success && <p className="mt-3 text-sm text-green-600">{success}</p>}
        </form>

        <AuthFooterLink
          text="Already have an account?"
          to="/login"
          linkText="Login"
        />
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;
