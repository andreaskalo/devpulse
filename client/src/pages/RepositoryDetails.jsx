import { CircleDot, Code, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Pagination from "../components/Pagination";

function RepositoryDetails() {
  const { repoOwner, repo } = useParams();

  const [isSavedRepositoriesLoading, setIsSavedRepositoriesLoading] =
    useState(false);
  const [savedRepositoriesError, setSavedRepositoriesError] = useState(null);
  const [savedRepository, setSavedRepository] = useState(null);

  const [repository, setRepository] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [commits, setCommits] = useState([]);
  const [isCommitsLoading, setIsCommitsLoading] = useState(false);
  const [commitsError, setCommitsError] = useState(null);
  const [commitsPage, setCommitsPage] = useState(1);
  const commitsPerPage = 10;

  const [contributors, setContributors] = useState([]);
  const [isContributorsLoading, setIsContributorsLoading] = useState(false);
  const [contributorsError, setContributorsError] = useState(null);
  const [contributorsPage, setContributorsPage] = useState(1);
  const contributorsPerPage = 10;

  const [issues, setIssues] = useState([]);
  const [isIssuesLoading, setIsIssuesLoading] = useState(false);
  const [issuesError, setIssuesError] = useState(null);
  const [issuesPage, setIssuesPage] = useState(1);
  const issuesPerPage = 10;

  const [pullRequests, setPullRequests] = useState([]);
  const [isPullRequestsLoading, setIsPullRequestsLoading] = useState(false);
  const [pullRequestsError, setPullRequestsError] = useState(null);
  const [pullRequestsPage, setPullRequestsPage] = useState(1);
  const pullRequestsPerPage = 10;

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    if (!repository) return;
    async function getSavedRepos() {
      try {
        setSavedRepositoriesError(null);
        setIsSavedRepositoriesLoading(true);
        const response = await fetch("/api/repos");

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }

        const data = await response.json();

        const foundRepo = data.find(
          (repo) => repo.repository_url === repository.url,
        );

        setSavedRepository(foundRepo ?? null);
      } catch (error) {
        console.error("error:", error);
        setSavedRepositoriesError(error.message);
      } finally {
        setIsSavedRepositoriesLoading(false);
      }
    }
    getSavedRepos();
  }, [repository?.url]);

  useEffect(() => {
    async function fetchRepository() {
      try {
        setRepository(null);
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
        error.log("error", error);
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
          `/api/github/repos/${repoOwner}/${repo}/commits?page=${commitsPage}&per_page=${commitsPerPage}`,
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
        error.log("error", error);
      } finally {
        setIsCommitsLoading(false);
      }
    }
    fetchCommits();
  }, [repoOwner, repo, commitsPage]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        setContributors([]);
        setContributorsError(null);
        setIsContributorsLoading(true);

        const response = await fetch(
          `/api/github/repos/${repoOwner}/${repo}/contributors`,
        );

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }
        const data = await response.json();

        setContributors(data);
      } catch (error) {
        setContributorsError(error.message);
        error.log("error", error);
      } finally {
        setIsContributorsLoading(false);
      }
    }
    fetchContributors();
  }, [repoOwner, repo]);

  useEffect(() => {
    async function fetchIssues() {
      try {
        setIssues([]);
        setIssuesError(null);
        setIsIssuesLoading(true);

        const response = await fetch(
          `/api/github/repos/${repoOwner}/${repo}/issues`,
        );

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }

        const data = await response.json();

        setIssues(data);
      } catch (error) {
        console.error(error);
        setIssuesError(error.message);
      } finally {
        setIsIssuesLoading(false);
      }
    }
    fetchIssues();
  }, [repoOwner, repo]);

  useEffect(() => {
    async function fetchPullRequests() {
      try {
        setPullRequests([]);
        setPullRequestsError(null);
        setIsPullRequestsLoading(true);

        const response = await fetch(
          `/api/github/repos/${repoOwner}/${repo}/pulls`,
        );

        if (!response.ok) {
          const error = new Error(response.statusText);
          error.status = response.status;
          throw error;
        }

        const data = await response.json();
        setPullRequests(data);
      } catch (error) {
        setPullRequestsError(error.message);
        console.error(error);
      } finally {
        setIsPullRequestsLoading(false);
      }
    }
    fetchPullRequests();
  }, [repoOwner, repo]);

  async function handleSaveRepository() {
    try {
      setSaveError(null);
      setDeleteError(null);
      setIsSaving(true);

      const response = await fetch("/api/repos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          repository_name: repository?.name,
          repository_url: repository?.url,
          owner: repository?.owner,
        }),
      });

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
      }

      const data = await response.json();
      setSavedRepository(data);
    } catch (error) {
      setSaveError(error.message);
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteRepository() {
    if (!savedRepository) return;
    try {
      setSaveError(null);
      setDeleteError(null);
      setIsDeleting(true);

      const response = await fetch(`/api/repos/${savedRepository.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
      }
      setSavedRepository(null);
    } catch (error) {
      console.error(error);
      setDeleteError(error.message);
    } finally {
      setIsDeleting(false);
    }
  }

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

        <div className="flex gap-2 items-center">
          <div>
            {saveError && (
              <div className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {saveError}
              </div>
            )}

            {deleteError && (
              <div className="mb-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {deleteError}
              </div>
            )}
            <button
              onClick={
                !savedRepository ? handleSaveRepository : handleDeleteRepository
              }
              disabled={isSaving || isDeleting || isSavedRepositoriesLoading}
              className="px-4 py-2
                        border border-slate-300
                        rounded-lg
                        font-medium
                        hover:bg-slate-50
                        transition"
            >
              {isSaving
                ? "Saving..."
                : isDeleting
                  ? "Deleting..."
                  : savedRepository
                    ? "Delete"
                    : "Save"}
            </button>
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
        </div>
      </header>
      <div className="flex flex-col md:flex-row  w-full max-w-7xl mx-auto gap-8">
        <section
          className="
                flex
                flex-col
                flex-1
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
          {(commits.length > 0 || commitsPage > 1) && (
            <Pagination
              currentPage={commitsPage}
              setCurrentPage={setCommitsPage}
              dataPerPage={commitsPerPage}
              isDataLoading={isCommitsLoading}
              data={commits}
            />
          )}
        </section>
        <section
          className="
                flex
                flex-col
                flex-[1/2]
                px-6
                pb-8"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Contributors
          </h2>
          {contributorsError && (
            <div>There's an error: {contributorsError}</div>
          )}
          {isContributorsLoading && <div>Contributors are loading...</div>}
          {contributors.length === 0 &&
            !isContributorsLoading &&
            !contributorsError && <div>No contributors found!</div>}
          {contributors.map((contributor) => {
            return (
              <div
                key={contributor.username}
                className="border-b border-slate-200 py-4"
              >
                <a
                  href={contributor.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={contributor.avatarUrl}
                      className="rounded-full w-10 h-10"
                      alt={`${contributor.username} avatar`}
                    ></img>
                    <span className="">{contributor.username}</span>
                  </div>
                </a>
                <div className="flex gap-1 text-sm text-slate-500 mt-1">
                  Contributions:
                  <span>{contributor.contributions}</span>
                </div>
              </div>
            );
          })}
          {(contributors.length > 0 || contributorsPage > 1) && (
            <Pagination
              currentPage={contributorsPage}
              setCurrentPage={setContributorsPage}
              dataPerPage={contributorsPerPage}
              isDataLoading={isContributorsLoading}
              data={contributors}
            />
          )}
        </section>
        <section
          className="
                flex
                flex-col
                flex-1
                px-6
                pb-8"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Issues</h2>
          {issuesError && <div>There's an error:{issuesError}</div>}
          {isIssuesLoading && <div>Issues loading...</div>}
          {issues.length === 0 && !isIssuesLoading && !issuesError && (
            <div>No issues found!</div>
          )}
          {issues.map((issue) => {
            return (
              <div
                key={issue.issueNumber}
                className="flex flex-col border-b border-slate-200 py-4"
              >
                <div className="flex gap-1">
                  <span>#{issue.issueNumber}</span>•
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${issue.issueState === "open" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"}`}
                  >
                    {issue.issueState}
                  </span>
                </div>
                <a
                  href={issue.issueUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400"
                >
                  <span className="">{issue.title}</span>
                </a>
                <div className="flex gap-1">
                  <span className="italic">author:</span>

                  <a
                    href={issue.authorProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400"
                  >
                    <span>{issue.authorUsername}</span>
                  </a>
                </div>
              </div>
            );
          })}
          {(issues.length > 0 || issuesPage > 1) && (
            <Pagination
              currentPage={issuesPage}
              setCurrentPage={setIssuesPage}
              dataPerPage={issuesPerPage}
              isDataLoading={isIssuesLoading}
              data={issues}
            />
          )}
        </section>
        <section
          className="
                flex
                flex-col
                flex-1
                px-6
                pb-8"
        >
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Pull Requests
          </h2>
          {pullRequestsError && <div>There's an error:{pullRequestsError}</div>}
          {isPullRequestsLoading && <div>Pull requests loading...</div>}
          {pullRequests.length === 0 &&
            !isPullRequestsLoading &&
            !pullRequestsError && <div>No pull requests found!</div>}
          {pullRequests.map((pullRequest) => {
            let status;
            let badgeClassName;

            if (pullRequest.draft) {
              status = "draft";
            } else if (pullRequest.mergedAt != null) {
              status = "merged";
            } else if (pullRequest.state === "open") {
              status = "open";
            } else if (pullRequest.state === "closed") {
              status = "closed";
            }

            if (status === "open") {
              badgeClassName = "text-green-700 bg-green-100";
            } else if (status === "closed") {
              badgeClassName = "text-red-700 bg-red-100";
            } else if (status === "merged") {
              badgeClassName = "text-yellow-700 bg-yellow-100";
            } else {
              badgeClassName = "text-gray-700 bg-gray-100";
            }

            return (
              <div
                key={pullRequest.number}
                className="flex flex-col border-b border-slate-200 py-4"
              >
                <div className="flex gap-1">
                  <span>#{pullRequest.number}</span>•
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${badgeClassName}`}
                  >
                    {status}
                  </span>
                </div>
                <a
                  href={pullRequest.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400"
                >
                  <span className="">{pullRequest.title}</span>
                </a>
                <div className="flex gap-1 items-center">
                  <img
                    src={pullRequest.authorAvatarUrl}
                    className="rounded-full w-10 h-10"
                    alt={`${pullRequest.authorUsername} avatar`}
                  ></img>

                  <a
                    href={pullRequest.authorProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400"
                  >
                    <span>{pullRequest.authorUsername}</span>
                  </a>
                </div>
              </div>
            );
          })}
          {(pullRequests.length > 0 || pullRequestsPage > 1) && (
            <Pagination
              currentPage={pullRequestsPage}
              setCurrentPage={setPullRequestsPage}
              dataPerPage={pullRequestsPerPage}
              isDataLoading={isPullRequestsLoading}
              data={pullRequests}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default RepositoryDetails;
