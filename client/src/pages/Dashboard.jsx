import { useState } from "react";

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
      <div className="flex justify-evenly">
        <div className="flex flex-col">
          <h1>Discover GitHub Repositories</h1>
          <p>Small title</p>
        </div>
        <form onSubmit={handleSubmit} className="flex">
          <input
            name="searchInput"
            placeholder="Search Repository"
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            type="submit"
            className="
              rounded-lg
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
      {isLoading && <div>Loading...</div>}
      {totalCount !== null && <div>Total: {totalCount}</div>}
      {repositories.map((repository) => {
        return <div key={repository.id}>owner:{repository.ownerLogin}</div>;
      })}
    </>
  );
}

export default Dashboard;
