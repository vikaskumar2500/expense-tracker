import express from 'express';
import { getShowLeaderboard } from '../controllers/premium';

const router = express.Router();

router.get("/show-leaderboard", getShowLeaderboard);

export default router;