const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')
    
        const contents = response.body.map(r => r.author)
        expect(contents).toContain('me')
    })

    test('id of the blog posts is id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('all blogs have a distinct id', async () => {
        const response = await api.get('/api/blogs')

        const IDs = response.body.map(b => b.id)
        expect(IDs).toHaveLength((new Set(IDs)).size)
    })
})

describe('creation of a blog', () => {
    let token = null

    beforeEach(async () => {
        await User.deleteMany({})
        await Blog.deleteMany({})
        const saltRounds = 10
        const passwordHash = await bcrypt.hash('salasana', saltRounds)
        const user = await new User({ username: 'mikki', passwordHash }).save()
        const userForToken = { username: 'mikki', id: user.id }
        token = jwt.sign(userForToken, config.SECRET)
    })

    test('succeeds when valid', async () => {

        const blog = {
            title: 'tallennusTesti',
            author: 'admin',
            url: 'www.testi.com',
            likes: 3
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const titles = blogsAtEnd.map(a => a.title)

        expect(blogsAtEnd).toHaveLength(1)
        expect(titles).toContain('tallennusTesti')
    })

    test('without likes, defaults to zero likes', async () => {
        const blog = {
            title: 'likeTest',
            author: 'admin',
            url: 'www.testi.com'
        }
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDb()

        const newBlog = allBlogs.filter(a => a.title === blog.title)[0]
        expect(newBlog.likes).toBe(0)
    })

    test('without title is not added', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blog = {
            author: 'oskari',
            url: 'oskari.fi'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(400)    
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('without url is not added', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blog = {
            title: 'invalid blog',
            author: 'oskari'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(blog)
            .expect(400)    
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })
})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
    
        await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
            username: 'kaipaio',
            name: 'Oskari Kaipainen',
            password: 'salainen',
        }
  
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    
        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})

describe('deletion of a blog', () => {
    let token = null

    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})

        const saltRounds = 10
        const passwordHash = await bcrypt.hash('salasana', saltRounds)
        const user = await new User({ username: 'mikki', passwordHash }).save()
        const userForToken = { username: 'mikki', id: user.id }
        token = jwt.sign(userForToken, config.SECRET)
        
        const newBlog = {
            title: 'valid blog',
            author: 'admin',
            url: 'gogle.com',
            likes: 77
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}` )
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    })

    test('fails if id is not valid', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const fakeId = 'fakeId'
        await api
            .delete(`/api/blogs/${fakeId}}`)
            .set('Authorization', `bearer ${token}` )
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    })

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const deleteBlog = blogsAtStart[0].id

        await api
            .delete(`/api/blogs/${deleteBlog}`)
            .set('Authorization', `bearer ${token}` )
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(a => a.title)

        expect(titles).not.toContain(deleteBlog.title)
    })

    test('fails with status code 401 if user is unauthorized', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
        token = null

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `bearer ${token}` )
            .expect(401)
  
        const blogsAtEnd = await helper.blogsInDb()
  
        expect(blogsAtEnd).toHaveLength(
            blogsAtStart.length
        )
  
        const titles = blogsAtEnd.map(blog => blog.title)
        expect(titles).toContain(blogToDelete.title)
    })

    describe('updating a blog', () => {
        beforeEach(async () => {
            await Blog.deleteMany({})
            await Blog.insertMany(helper.initialBlogs)
        })
        
        test('succeeds with status code 204 if id is valid', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToUpdate = blogsAtStart[0]
            const updated_blog = { likes: 14 }

            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updated_blog)
                .expect(204)
    
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
            
            const res = blogsAtEnd.filter(blog => blog.title === blogToUpdate.title)[0]
            expect(res.likes).toBe(14)
        })
        test('fails if id is not valid', async () => {
            const fakeId = 'fakeId'
            const updated_blog = { likes: 14 }
    
            await api
                .put(`/api/blogs/${fakeId}`)
                .send(updated_blog)
                .expect(400)
    
            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })
})

afterAll(() => {
    mongoose.connection.close()
})