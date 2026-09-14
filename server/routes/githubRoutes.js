import express from "express";
import {
  getRepo,
  getRepositoryCommits,
  getRepositoryContributors,
} from "../controllers/githubController.js";

const router = express.Router();

router.get("/:owner/:repo", getRepo);
router.get("/:owner/:repo/commits", getRepositoryCommits);
router.get("/:owner/:repo/contributors", getRepositoryContributors);

export default router;
