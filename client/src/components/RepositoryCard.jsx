import { Star, GitFork, Code, CircleDot } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RepositoryCard({ repository }) {
  const { ownerLogin, name, description, language, stars, forks, openIssues } =
    repository;
  const navigate = useNavigate();

  function handleCardClick() {
    navigate(`/repos/${ownerLogin}/${name}`);
  }

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-md hover:shadow-xl transition cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex items-center gap-1">
        <span className="font-semibold text-slate-900 text-xl">{name}</span>
        <span>/</span>
        <span className="text-xs text-slate-500">{ownerLogin}</span>
      </div>
      <div className="mt-3">
        <p className="text-sm text-slate-600 leading-relaxed">
          {description ?? "No description provided."}
        </p>
      </div>
      <div className="flex items-center gap-5 mt-4 text-sm text-slate-500">
        <div className="flex items-center gap-1">
          <Star size={16} />
          <span>{stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork size={16} />
          <span>{forks}</span>
        </div>
        {language && (
          <div className="flex items-center gap-1">
            <Code size={16} />
            <span>{language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <CircleDot size={16} />
          <span>{openIssues}</span>
        </div>
      </div>
    </div>
  );
}

export default RepositoryCard;
