import logo from "../assets/devPulseSmallLogo.png";

function AuthBrand() {
  return (
    <header className="flex flex-col  items-center gap-2">
      <img src={logo} className="w-12 h-12" alt="DevPulse logo" />
      <h1 className="text-xl font-bold text-slate-900">DevPulse</h1>
    </header>
  );
}

export default AuthBrand;
