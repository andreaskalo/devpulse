import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Dashboard;
