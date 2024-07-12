const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments')
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const returnedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  response.status(201).json(returnedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(blog.id)
    response.status(204).end()
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: body.user.username, name: body.user.name }).populate('comments', { comment: 1, blog: request.params.id })
  response.json(updatedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    comment: body.comment,
    blog: blog
  })

  const savedComment = await comment.save()
  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()
  const returnedBlog = await (await blog.populate('user', { username: 1, name: 1})).populate('comments', { comment: 1, blog: request.params.id})
  response.status(201).json(returnedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }

})

module.exports = blogsRouter

/*

*/