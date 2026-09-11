import pool from "../db/index.js";

async function getRepos(req, res) {
  const userId = req.session.userId;

  try {
    const result = await pool.query(
      "SELECT id,user_id,repository_url,owner,repository_name FROM saved_repos WHERE user_id = $1",
      [userId],
    );

    return res.status(200).json({
      savedRepos: result.rows,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function saveRepo(req, res) {
  const userId = req.session.userId;
  const { repository_name, repository_url, owner } = req.body;

  if (!repository_name) {
    return res.status(400).json({
      error: {
        code: "REPOSITORY_NAME_REQUIRED",
        message: "Repository name field cannot be empty!",
      },
    });
  }

  if (!repository_url) {
    return res.status(400).json({
      error: {
        code: "REPOSITORY_URL_REQUIRED",
        message: "Repository URL field cannot be empty!",
      },
    });
  }

  if (!owner) {
    return res.status(400).json({
      error: {
        code: "REPOSITORY_OWNER_REQUIRED",
        message: "Repository owner field cannot be empty!",
      },
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO saved_repos (user_id,repository_url,owner,repository_name) VALUES($1,$2,$3,$4) RETURNING id,user_id,repository_url,owner,repository_name,saved_at",
      [userId, repository_url, owner, repository_name],
    );

    return res.status(201).json({
      savedRepo: result.rows[0],
    });
  } catch (error) {
    if (
      error.code === "23505" &&
      error.constraint === "saved_repos_user_id_repository_url_key"
    ) {
      return res.status(409).json({
        error: {
          code: "REPOSITORY_ALREADY_SAVED",
          message: "Repository is already saved",
        },
      });
    }
    console.error(error);

    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

async function deleteSavedRepo(req, res) {
  const userId = req.session.userId;
  const repoId = Number(req.params.repoId);

  if (!Number.isInteger(repoId) || repoId <= 0) {
    return res.status(400).json({
      error: {
        code: "INVALID_REPOSITORY_ID",
        message: "Invalid Repository Id",
      },
    });
  }

  try {
    const result = await pool.query(
      "DELETE FROM saved_repos WHERE id = $1 AND user_id = $2 RETURNING id,user_id,repository_url,owner,repository_name",
      [repoId, userId],
    );

    const deletedRepo = result.rows[0];

    if (!deletedRepo) {
      return res.status(404).json({
        error: {
          code: "REPOSITORY_NOT_FOUND",
          message: "Repository not found",
        },
      });
    }

    return res.status(200).json({
      error: {
        code: "REPOSITORY_DELETED_SUCCESFULLY",
        message: "Repository deleted successfully!",
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  }
}

export { getRepos, saveRepo, deleteSavedRepo };
