import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="username/email"
        value={identifier}
        onChange={(e) => {
          setIdentifier(e.currentTarget.value);
        }}
      ></input>
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
      ></input>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in" : "Login"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}

export default Login;
