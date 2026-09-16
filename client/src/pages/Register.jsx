import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => {
          setUsername(e.currentTarget.value);
        }}
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
        }}
        placeholder="E-mail"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
        }}
        placeholder="Password"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}

export default Register;
