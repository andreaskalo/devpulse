import {
  getRepository,
  getRepoCommits,
  getRepoContributors,
} from "../services/githubService.js";

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

  const pageToNumber = Number(page ?? 1);
  const perPageToNumber = Number(perPage ?? 10);

  if (
    !Number.isInteger(pageToNumber) ||
    pageToNumber <= 0 ||
    !Number.isInteger(perPageToNumber) ||
    perPageToNumber <= 0 ||
    perPageToNumber > 100
  ) {
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
      pageToNumber,
      perPageToNumber,
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

  const pageToNumber = Number(page ?? 1);
  const perPageToNumber = Number(perPage ?? 10);

  if (
    !Number.isInteger(pageToNumber) ||
    pageToNumber <= 0 ||
    !Number.isInteger(perPageToNumber) ||
    perPageToNumber <= 0 ||
    perPageToNumber > 100
  ) {
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
      pageToNumber,
      perPageToNumber,
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

export { getRepo, getRepositoryCommits, getRepositoryContributors };
