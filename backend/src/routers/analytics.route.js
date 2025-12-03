import { Router } from "express";
import {
  getOverview,
  monthSummary,
  categoryBreakdown,
  trendAnalysis,
} from "../controllers/analytics.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const analyticRouter = Router();

analyticRouter.route("/over-view").get(verifyJWT, getOverview);
analyticRouter.route("/over-view/month").get(verifyJWT, monthSummary);
analyticRouter.route("/category").get(verifyJWT, categoryBreakdown);
analyticRouter.route("/trend").get(verifyJWT, trendAnalysis);

export default analyticRouter;
