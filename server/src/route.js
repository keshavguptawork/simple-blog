import { Router } from "express";
import { 
  getHome,
  postNewBlog, 
  deleteBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog,  
} from "./controller.js";

const router = Router()

// http://localhost:3001/api/v1/

router.route("/").get(getHome) 
router.route("/new").post(postNewBlog) 
router.route("/delete-blog").delete(deleteBlog)
router.route("/blogs").get(getAllBlogs)
router.route("/blog-by-id").get(getBlogById) 
router.route("/update-blog").patch(updateBlog) 

export default router