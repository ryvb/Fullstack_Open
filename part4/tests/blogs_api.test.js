const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let Token

describe('Initial saving of blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
    
        const blogObjects = helper.initialBlogs
          .map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)

        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('Hallo', 10)
        const user = new User({
            username: 'KeJa',
            name: 'Kees Jansma',
            passwordHash
        })
        await user.save()

        const response = await api
            .post('/api/login')
            .send({
                username: 'KeJa',
                password: 'Hallo'
            })

        Token = response.body.token    
    })

    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
    test('the first blog is about React patterns', async () => {
        const response = await api.get('/api/blogs')
    
        const titles = response.body.map(e => e.title)
        assert(titles.includes('React patterns'))
    })

    describe('Addition of new blog', () => {
        test('a valid blog can be added ', async () => {
            const newBlog = {
                title: 'adding a new blog',
                author: 'new author',
                url: 'http://www.na.com',
                likes: 21
            }
        
            await api      
                .post('/api/blogs')
                .set('Authorization', `Bearer ${Token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
            const blogsAtEnd = await helper.blogsInDb()
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
            
            const titles = blogsAtEnd.map(r => r.title)
            assert(titles.includes('adding a new blog'))
        })

        test('default value for likes is zero ', async () => {
            const newBlog = {
                title: 'zero likes',
                author: 'zero likes author',
                url: 'http://zerolikes.com'
            }
        
            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${Token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
        
            const allBlogs = await helper.blogsInDb()
        
            const likes = allBlogs.map(l => l.likes)
            const last_value = likes.pop()
            assert.strictEqual(last_value, 0)
        })
        
        test('status code 400 because title and url are missing ', async () => {
            const newBlog = {
                author: 'titleurlmissing',
                url: 'http://www.titleurlmissing.com',
                likes: 8
            }
        
            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${Token}`)
                .send(newBlog)
                .expect(400)
                .expect('Content-Type', /application\/json/)
        
        })
    })

    describe('default identifier', () => {
        test('default unique identifier is named id', async () => {
            const response = await api.get('/api/blogs')
            const blog = response.body
            const keys = Object.keys(blog[0])
        
            assert(keys.includes('id'))
        })
    })

    describe('delete blog', () => {
        beforeEach(async () => {
            await Blog.deleteMany({})
            const savedUser = await User.find({ username: 'KeJa' })

            const newBlog = new Blog({
                title: "TestTestTest",
                author: "Kees Jansen",
                url: "http://testtesttest.com",
                likes: 50,
                user: savedUser[0]._id
            })

            await newBlog.save()
        })

        test('Blog is deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]


            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .set('Authorization', `Bearer ${Token}`)
                .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
        })
    })

    test('Update blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const blog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 10
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blog)

        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0]
        blogToUpdate.likes = 10

        assert.deepStrictEqual(blogToUpdate, updatedBlog)
    })

})

after(async () => {
    await mongoose.connection.close()
})