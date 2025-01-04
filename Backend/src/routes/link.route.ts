import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated';
import { getSharedLinkContent, shareLink } from '../controllers/link.controller';

const router = express.Router();

router.route("/share").post(isAuthenticated, shareLink);
router.route("/:id").get(isAuthenticated, getSharedLinkContent);

export default router;
