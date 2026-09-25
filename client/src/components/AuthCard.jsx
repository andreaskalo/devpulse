function AuthCard({ children }) {
  return (
    <div className="w-full max-w-md p-8 rounded-lg bg-white shadow-lg">
      {children}
    </div>
  );
}

export default AuthCard;