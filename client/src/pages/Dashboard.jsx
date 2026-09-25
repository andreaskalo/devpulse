import useAuth from "../hooks/useAuth";

function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}

export default Dashboard;
