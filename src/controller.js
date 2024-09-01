import mongoose from "mongoose";
import { asyncHandler } from "./asyncHandler.utils.js";
import { ApiError } from "./ApiError.utils.js"
import { ApiResponse } from "./ApiResponse.utils.js";
import { Article } from "./model.js"

const getHome = asyncHandler( async(req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, ">>> Home page!")
  )
  
})
const postNewArticle = asyncHandler( async(req, res) => {
  // get article details from front end & validation
  const {articleTitle, articleBody, articleTags} = req.body 
  
  if(articleTitle.trim() === "" || articleBody.trim() === ""){
    throw new ApiError(400, ">>> Title and body are required")
  }

  // check if article already exits based on title
  const existingArticle = await Article.findOne({ articleTitle })
  if(existingArticle){
    throw new ApiError(409, ">>> Article already exists")
  }

  // create article object - create entry in db
  const article = await Article.create({
    articleTitle,
    articleBody, 
    articleTags: articleTags || ""
  })
  
  // check for response
  const newArticle = await Article.findById(article._id)
  if(!newArticle){
    throw new ApiError(500, ">>> Something went wrong while posting the article")
  }

  // return response
  return res
    .status(201)
    .json(
      new ApiResponse(200, newArticle, ">>> Article posted successfully!")
    )  
})
const deleteArticle = asyncHandler( async(req, res) => {
  // get article details from front end & validation
  const {articleId, articleTitle } = req.body 
  
  if( articleId/* .trim() */ === "" || articleTitle/* .trim() */ === ""){
    throw new ApiError(400, ">>> Title OR Id is required")
  }
  const findBy = articleId ? articleId : articleTitle
    
  // delete article based on title/id
  const article = await Article.findOneAndDelete({
    $or: [{ articleId: findBy }, { articleTitle: findBy }]
  })

  if(!article){
    throw new ApiError(409, ">>> Article does not exists")
  }
  
  // check for response
  const deletedArticle = await Article.findById(article._id)
  if(deletedArticle){
    throw new ApiError(500, ">>> Something went wrong while deleting the article")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(204, {"Article Title: ":article.articleTitle}, ">>> Article deleted successfully!")
  )
})
const getAllArticles = asyncHandler( async(req, res) => {
  // fetch articles
  const allArticle = await Article.find()
  if(!allArticle){
    throw new ApiError(500, ">>> Something went wrong while fetching all articles")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, allArticle, ">>> All articles fetched successfully!")
    )
})
const getArticleById = asyncHandler( async(req, res) => {
  // get article details from front end & validation
  const { articleId } = req.body 
  
  if( articleId.trim() === "" ){
    throw new ApiError(400, ">>> Id is required")
  }

  // check if article exists
  const findArticle = await Article.findById( articleId )
  if(!findArticle){
    throw new ApiError(409, ">>> Article does not exists")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, findArticle, ">>> All article fetched successfully!")
  )
})
const updateArticle = asyncHandler( async(req, res) => {
  // get article details from front end & validation
  const { articleId, articleTitle, articleBody, articleTags } = req.body 
  
  if( articleId.trim() === "" || articleTitle.trim() === "" || articleBody.trim() === ""){
    throw new ApiError(400, ">>> All fields are required")
  }

  // check if article doesn't exits based on title/id
  const existingArticle = await Article.findById(articleId)
  if(!existingArticle){
    throw new ApiError(409, ">>> Article does not exists")
  }

  // update article by id
  const updatedArticle = await Article.findByIdAndUpdate(
    articleId,
    {
      $set:{
        articleTitle,
        articleBody,
        articleTags
      }
    },
    {new: true}   // return new updated information
  )
  if(!updatedArticle){
    throw new ApiError(500, ">>> Something went wrong while updating the article")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedArticle, ">>> Article updated successfully!")
  )
})

export {
  getHome,
  postNewArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle
}