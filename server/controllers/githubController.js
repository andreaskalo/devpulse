import {
  getRepository,
  getRepoCommits,
  getRepoContributors,
  getRepoIssues,
  getRepoPulls,
} from "../services/githubService.js";
import parsePagination from "../utils/pagination.js";

async function getRepo(req, res) {
  const { owner, repo } = req.params;
  try {
    const data = await getRepository(owner, repo);
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({
        error: {
          code: "REPO_NOT_FOUND",
          message: "Repository not found!",
        },
      });
    }
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function getRepositoryCommits(req, res) {
  const { owner, repo } = req.params;
  const { page, per_page: perPage } = req.query;

  const pagination = parsePagination(page, perPage);

  if (!pagination) {
    return res.status(400).json({
      error: {
        code: "INVALID_PAGINATION",
        message: "Invalid pagination parameters",
      },
    });
  }

  try {
    const data = await getRepoCommits(
      owner,
      repo,
      pagination.page,
      pagination.perPage,
    );
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({
        error: {
          code: "REPO_NOT_FOUND",
          message: "Repository not found!",
        },
      });
    }
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function getRepositoryContributors(req, res) {
  const { owner, repo } = req.params;
  const { page, per_page: perPage } = req.query;

  const pagination = parsePagination(page, perPage);

  if (!pagination) {
    return res.status(400).json({
      error: {
        code: "INVALID_PAGINATION",
        message: "Invalid pagination parameters",
      },
    });
  }

  try {
    const data = await getRepoContributors(
      owner,
      repo,
      pagination.page,
      pagination.perPage,
    );
    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({
        error: {
          code: "REPO_NOT_FOUND",
          message: "Repository not found!",
        },
      });
    }
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function getRepositoryIssues(req, res) {
  const { owner, repo } = req.params;
  const { page, per_page: perPage } = req.query;

  const pagination = parsePagination(page, perPage);

  if (!pagination) {
    return res.status(400).json({
      error: {
        code: "INVALID_PAGINATION",
        message: "Invalid pagination parameters",
      },
    });
  }

  try {
    const data = await getRepoIssues(
      owner,
      repo,
      pagination.page,
      pagination.perPage,
    );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({
        error: {
          code: "REPO_NOT_FOUND",
          message: "Repository not found!",
        },
      });
    }
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function getRepositoryPulls(req, res) {
  const { owner, repo } = req.params;
  const { page, per_page: perPage, state } = req.query;

  const pagination = parsePagination(page, perPage);
  const allowedStates = ["open", "closed", "all"];
  const pullState = state ?? "open";

  if (!pagination) {
    return res.status(400).json({
      error: {
        code: "INVALID_PAGINATION",
        message: "Invalid pagination parameters",
      },
    });
  }

  if (!allowedStates.includes(pullState)) {
    return res.status(400).json({
      error: {
        code: "INVALID_PULL_STATE",
        message: "Invalid pull state",
      },
    });
  }

  try {
    const data = await getRepoPulls(
      owner,
      repo,
      pagination.page,
      pagination.perPage,
      pullState,
    );

    return res.status(200).json({
      data,
    });
  } catch (error) {
    console.error(error);
    if (error.status === 404) {
      return res.status(404).json({
        error: {
          code: "REPO_NOT_FOUND",
          message: "Repository not found!",
        },
      });
    }
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

export {
  getRepo,
  getRepositoryCommits,
  getRepositoryContributors,
  getRepositoryIssues,
  getRepositoryPulls,
};
