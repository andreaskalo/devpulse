import express from "express";
import {
  getRepo,
  getRepositoryCommits,
  getRepositoryContributors,
  getRepositoryIssues,
  getRepositoryPulls,
  searchRepos
} from "../controllers/githubController.js";

const router = express.Router();

router.get("/repos/:owner/:repo", getRepo);
router.get("/repos/:owner/:repo/commits", getRepositoryCommits);
router.get("/repos/:owner/:repo/contributors", getRepositoryContributors);
router.get("/repos/:owner/:repo/issues", getRepositoryIssues);
router.get("/repos/:owner/:repo/pulls", getRepositoryPulls);

router.get("/search/repositories", searchRepos);

export default router;
