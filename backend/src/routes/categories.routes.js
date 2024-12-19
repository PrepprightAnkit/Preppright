import { Router } from "express";
import { bulkUploadCategories, uploadCat } from "../controllers/categories.controller.js";
import { getCat } from "../controllers/getCat.controller.js";
import { getCategoryById } from "../controllers/getCategory.controller.js";

const router = Router();

router.route('/cat').get(getCat);
router.route('/cat/:id').get(getCategoryById);
router.route("/cat").post(uploadCat);
router.route("/cat/bulk").post(bulkUploadCategories);
export default router;