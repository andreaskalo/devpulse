import { useState } from "react";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!identifier) {
      setError("Please insert username or email.");
      return;
    }

    if (!password) {
      setError("Please insert password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data?.error?.message ?? "Login failed.");
        return;
      }

      setSuccess(data?.message ?? "Login successful.");

      const meResponse = await fetch("/api/auth/me");
      const meData = await meResponse.json();

      setIdentifier("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError("Unable to connect to the server.");
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
