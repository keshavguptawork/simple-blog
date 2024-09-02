import mongoose from "mongoose";
import { asyncHandler } from "./asyncHandler.utils.js";
import { ApiError } from "./ApiError.utils.js"
import { ApiResponse } from "./ApiResponse.utils.js";
import { Blog } from "./model.js"

const getHome = asyncHandler( async(req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, {}, ">>> Home page!")
  )
  
})
const postNewBlog = asyncHandler( async(req, res) => {
  // get blog details from front end & validation
  const {blogTitle, blogBody, blogTags} = req.body 
  
  if( blogTitle.trim() === "" || blogBody.trim() === ""){
    throw new ApiError(400, ">>> Title and body are required")
  }

  // check if blog already exits based on title
  const existingBlog = await Blog.findOne({ blogTitle })
  if(existingBlog){
    throw new ApiError(409, ">>> Blog already exists")
  }

  // create blog object - create entry in db
  const blog = await Blog.create({
    blogTitle,
    blogBody, 
    blogTags: blogTags || ""
  })
  
  // check for response
  const newBlog = await Blog.findById(blog._id)
  if(!newBlog){
    throw new ApiError(500, ">>> Something went wrong while posting the blog")
  }

  // return response
  return res
    .status(201)
    .json(
      new ApiResponse(200, newBlog, ">>> Blog posted successfully!")
    )  
})
const deleteBlog = asyncHandler( async(req, res) => {
  // get blog details from front end & validation
  const {blogId, blogTitle } = req.body 
  
  if( blogId/* .trim() */ === "" || blogTitle/* .trim() */ === ""){
    throw new ApiError(400, ">>> Title OR Id is required")
  }
  const findBy = blogId ? blogId : blogTitle
    
  // delete blog based on title/id
  const blog = await Blog.findOneAndDelete({
    $or: [{ blogId: findBy }, { blogTitle: findBy }]
  })

  if(!blog){
    throw new ApiError(409, ">>> Blog does not exists")
  }
  
  // check for response
  const deletedBlog = await Blog.findById(blog._id)
  if(deletedBlog){
    throw new ApiError(500, ">>> Something went wrong while deleting the blog")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(204, {"Blog Title: ":blog.blogTitle}, ">>> Blog deleted successfully!")
  )
})
const getAllBlogs = asyncHandler( async(req, res) => {
  // fetch blogs
  const allBlog = await Blog.find()
  if(!allBlog){
    throw new ApiError(500, ">>> Something went wrong while fetching all blogs")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, allBlog, ">>> All blogs fetched successfully!")
    )
})
const getBlogById = asyncHandler( async(req, res) => {
  // get blog details from front end & validation
  const { blogId } = req.body 
  
  if( blogId.trim() === "" ){
    throw new ApiError(400, ">>> Id is required")
  }

  // check if blog exists
  const findBlog = await Blog.findById( blogId )
  if(!findBlog){
    throw new ApiError(409, ">>> Blog does not exists")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, findBlog, ">>> Blog fetched successfully!")
  )
})
const updateBlog = asyncHandler( async(req, res) => {
  // get blog details from front end & validation
  const { blogId, blogTitle, blogBody, blogTags } = req.body 
  
  if( blogId.trim() === "" || blogTitle.trim() === "" || blogBody.trim() === ""){
    throw new ApiError(400, ">>> All fields are required")
  }

  // check if blog doesn't exits based on title/id
  const existingBlog = await Blog.findById(blogId)
  if(!existingBlog){
    throw new ApiError(409, ">>> Blog does not exists")
  }

  // update Blog by id
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    {
      $set:{
        blogTitle,
        blogBody,
        blogTags
      }
    },
    {new: true}   // return new updated information
  )
  if(!updatedBlog){
    throw new ApiError(500, ">>> Something went wrong while updating the Blog")
  }

  // return response
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBlog, ">>> Blog updated successfully!")
  )
})

export {
  getHome,
  postNewBlog, 
  deleteBlog, 
  getAllBlogs, 
  getBlogById, 
  updateBlog,  
}