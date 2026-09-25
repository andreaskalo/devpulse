import authBackground from "../assets/authBackground.png";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center "
        style={{
          backgroundImage: `url(${authBackground})`,
        }}
      ></div>

      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 min-h-screen flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
