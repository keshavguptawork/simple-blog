import { Router } from "express";
import { 
  getHome,
  postNewArticle, 
  deleteArticle, 
  getArticle, 
  getArticleById, 
  updateArticle,  
} from "./controller.js";

const router = Router()

// http://localhost:3001/api/v1/

router.route("/").get(getHome) 
router.route("/new").post(postNewArticle) 
router.route("/delete-article").delete(deleteArticle)
router.route("/article").get(getArticle)
router.route("/article-by-id").get(getArticleById) 
router.route("/update-article").patch(updateArticle) 

export default router