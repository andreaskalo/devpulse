import { CircleDot, Code, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RepositoryDetails() {
  const { repoOwner, repo } = useParams();

  const [repository, setRepository] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [commits, setCommits] = useState([]);
  const [isCommitsLoading, setIsCommitsLoading] = useState(false);
  const [commitsError, setCommitsError] = useState(null);

  useEffect(() => {
    async function fetchRepository() {
      try {
        setError(null);
        setIsLoading(true);
        const response = await fetch(`/api/github/repos/${repoOwner}/${repo}`);

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }
        const data = await response.json();

        setRepository(data);
      } catch (error) {
        setError(error.message);
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepository();
  }, [repoOwner, repo]);

  useEffect(() => {
    async function fetchCommits() {
      try {
        setCommits([]);
        setCommitsError(null);
        setIsCommitsLoading(true);

        const response = await fetch(
          `/api/github/repos/${repoOwner}/${repo}/commits`,
        );

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }

        const data = await response.json();
        setCommits(data);
      } catch (error) {
        setCommitsError(error.message);
        console.log("error", error);
      } finally {
        setIsCommitsLoading(false);
      }
    }
    fetchCommits();
  }, [repoOwner, repo]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>There's an error: {error}</div>;
  }

  if (!repository) {
    return <div>No repository found!</div>;
  }

  const { owner, name, url, forks, stars, description, openIssues, language } =
    repository;

  return (
    <div>
      <header className="flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col items-start gap-2 ">
          <div className="flex items-center gap-1">
            <span className="text-sm text-slate-500">{owner}</span>/
            <span className="text-2xl font-bold text-slate-900">{name}</span>
          </div>
          <p className="text-slate-600 max-w-2xl">{description}</p>
          <div className="flex items-center gap-5 text-sm text-slate-900">
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

        <div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="
                px-4 py-2
                border border-slate-300
                rounded-lg
                font-medium
                hover:bg-slate-50
                transition"
          >
            View on GitHub
          </a>
        </div>
      </header>
      <section
        className="
                w-full
                max-w-7xl
                mx-auto
                px-6
                pb-8"
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Recent Commits
        </h2>
        {commitsError && <div>There's an error: {commitsError}</div>}
        {isCommitsLoading && <div>Commits are loading...</div>}
        {commits.length === 0 && !isCommitsLoading && !commitsError && (
          <div>No commits found!</div>
        )}
        {commits.map((commit) => {
          const message = commit.message.split("\n")[0];
          const date = new Date(commit.date);
          const localeDate = date.toLocaleDateString();
          return (
            <div key={commit.sha} className="border-b border-slate-200 py-4">
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400"
              >
                {message}
              </a>
              <div className="flex gap-1 text-sm text-slate-500 mt-1">
                <span>{commit.author_name}</span>
                {commit.author_username && (
                  <span>(@{commit.author_username})</span>
                )}
                •<span>{localeDate}</span>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default RepositoryDetails;
