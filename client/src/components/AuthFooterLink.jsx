import { Link } from "react-router-dom";

function AuthFooterLink(props) {
  const { text, to, linkText } = props;

  return (
    <div className="flex flex-col items-center mt-4">
      <p className="text-sm text-slate-400">{text}</p>
      <Link to={to} className="text-cyan-500 font-semibold hover:text-cyan-600">
        {linkText}
      </Link>
    </div>
  );
}

export default AuthFooterLink;
