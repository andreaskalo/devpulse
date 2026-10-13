import { useState } from "react";
import RepositoryCard from "../components/RepositoryCard";
import RepositoryCardSkeleton from "../components/RepositoryCardSkeleton";

function Dashboard() {
  const [searchInput, setSearchInput] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [totalCount, setTotalCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setRepositories([]);
    setTotalCount(null);
    setError(null);

    const query = searchInput.trim();

    if (!query) {
      setError("Please enter a search term.");
      return;
    }

    const encodedQuery = encodeURIComponent(query);

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/github/search/repositories?query=${encodedQuery}`,
      );

      if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        throw error;
      }

      const { totalCount, repositories } = await response.json();

      setTotalCount(totalCount);
      setRepositories(repositories);
    } catch (error) {
      if (error.status === 422) {
        setError("Unprocessable entity!");
      } else {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-slate-900">
            Discover GitHub Repositories
          </h1>
          <p className="text-slate-500 mt-1">
            Search and explore repositories from GitHub.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full md:w-auto">
          <input
            name="searchInput"
            className="
              w-full
              md:w-50
              border
              border-slate-200
              border-r-0
              rounded-l-lg
              px-4
              py-2
              text-slate-900
              placeholder:text-slate-400
              focus:outline-none
              focus:border-cyan-500
              focus:ring-2
              focus:ring-cyan-500/20"
            placeholder="Search Repository"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="
              rounded-r-lg
              font-semibold
              bg-cyan-400
              text-white
              hover:bg-cyan-500
              cursor-pointer
              focus:ring-2
              focus:ring-cyan-500/60
              disabled:opacity-50
              disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>
      </div>
      {error && <div className="flex">{error}</div>}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <RepositoryCardSkeleton key={index} />
          ))}
        </div>
      )}

      {totalCount !== null && <div>Total: {totalCount}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repositories.map((repository) => {
          return <RepositoryCard key={repository.id} repository={repository} />;
        })}
      </div>
    </>
  );
}

export default Dashboard;
