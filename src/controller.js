import mongoose from "mongoose";
import { asyncHandler } from "./asyncHandler.utils.js";
import { ApiError } from "./ApiError.utils.js"
import { ApiResponse } from "./ApiResponse.utils.js";
import { Article } from "./model.js"

const getHome = asyncHandler( async(req, res) => {
  return res
    .status(201)
    .json(
      new ApiResponse(200, {}, "Home page!")
  )
  
})
const postNewArticle = asyncHandler( async(req, res) => {
  // get article details from front end & validation
  const {articleTitle, articleBody} = req.body 
  console.log(req.body, articleTitle, articleBody);
  
  if(articleTitle.trim() === "" || articleBody.trim() === ""){
    throw new ApiError(400, "Title and body are required")
  }

  // check if article already exits based on title
    /* const existingArticle = await User.findOne({ srticleTitle })
    if(existingArticle){
      throw new ApiError(409, "Article already exists")
    } */

  // create article object - create entry in db
  const article = await Article.create({
    articleTitle,
    articleBody, 
    articleTags: articleTags /* || "" */
  })
  
  // check for response
  const newArticle = await Articlec.findById(article._id)
  if(!newArticle){
    throw new ApiError(500, "Something went wrong while posting the article")
  }

  // return response
  return res
    .status(201)
    .json(
      new ApiResponse(200, newArticle, "Article posted successfully!")
  )
  
})
const deleteArticle = asyncHandler( async(req, res) => {
  const user = User.aggregate()
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200, user[0].watchHistory, "User WatchedHistory fetched succesfuly"
      )
    )
})
const getArticle = asyncHandler( async(req, res) => {
  const user = User.aggregate()
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200, user[0].watchHistory, "User WatchedHistory fetched succesfuly"
      )
    )
})
const getArticleById = asyncHandler( async(req, res) => {
  const user = User.aggregate()
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200, user[0].watchHistory, "User WatchedHistory fetched succesfuly"
      )
    )
})
const updateArticle = asyncHandler( async(req, res) => {
  const user = User.aggregate()
  
  return res
    .status(200)
    .json(
      new ApiResponse(
        200, user[0].watchHistory, "User WatchedHistory fetched succesfuly"
      )
    )
})

export {
  getHome,
  postNewArticle,
  deleteArticle,
  getArticle,
  getArticleById,
  updateArticle
}