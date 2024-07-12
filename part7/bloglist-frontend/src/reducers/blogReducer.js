import { createSlice, current } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import store from '../store'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        appendBlog(state, action) {
            state.push(action.payload)
        },
        setBlogs(state, action) {
            return action.payload
        },
        updateBlogs(state, action) {
            const newState = state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
            return newState.sort((a, b) => b.likes - a.likes)
        },
        deleteBlog(state, action) {
            return state.filter(blog => blog.id !== action.payload.id)
        },
        reloadBlogs(state, action) {
            return state
        }
    }
})

export const { appendBlog, setBlogs, updateBlogs, deleteBlog, reloadBlogs } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
    }
}

export const createBlog = (content) => {
    return async dispatch => {
      const newBlog = await blogService.create(content)
      dispatch(appendBlog(newBlog))
    }
}
  
export const likeBlog = (likedAnecdote) => {
    return async dispatch => {
      const newLikes = likedAnecdote.likes + 1
      const changedBlog = { ...likedAnecdote, likes: newLikes }
      const updatedBlog = await blogService.update(changedBlog)
      dispatch(updateBlogs(updatedBlog))
    }
}

export const delBlog = (blogObject) => {
    return async dispatch => {
        if (window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)) {
            await blogService.del(blogObject.id)
            dispatch(deleteBlog(blogObject))
        }
    }
}

export const reload = () => {
    return async dispatch => {
        dispatch(reloadBlogs())
    }
}

export const createComment = (addedComment) => {
    return async dispatch => {
        const updatedBlog = await blogService.comment(addedComment)
        dispatch(updateBlogs(updatedBlog))
    }
}
  
export default blogSlice.reducer

/*

*/