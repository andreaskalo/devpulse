import express from "express";
import {
  getRepo,
  getRepositoryCommits,
  getRepositoryContributors,
  getRepositoryIssues,
  getRepositoryPulls,
} from "../controllers/githubController.js";

const router = express.Router();

router.get("/:owner/:repo", getRepo);
router.get("/:owner/:repo/commits", getRepositoryCommits);
router.get("/:owner/:repo/contributors", getRepositoryContributors);
router.get("/:owner/:repo/issues", getRepositoryIssues);
router.get("/:owner/:repo/pulls", getRepositoryPulls);

export default router;
