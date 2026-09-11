import express from "express";
import requireAuth from "../middleware/authMiddleware.js";
import {
  deleteSavedRepo,
  getRepos,
  saveRepo,
} from "../controllers/repoController.js";

const router = express.Router();

router.get("/", requireAuth, getRepos);
router.post("/", requireAuth, saveRepo);
router.delete("/:repoId", requireAuth, deleteSavedRepo);

export default router;
