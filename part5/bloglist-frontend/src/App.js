import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const addBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogObject.user = user.id
        blogService
            .create(blogObject)
            .then(createdBlog => {
                setNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
                setBlogs(blogs.concat(createdBlog))
            })
            .catch((err) => {
                setErrorMessage(err)
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const addLike = (blog, likes) => {
        blogService.addLike(blog, likes)
        const updatedBlogs = blogs.map((currentBlog) =>
            currentBlog.id === blog.id
                ? { ...currentBlog, likes: currentBlog.likes + 1 }
                : currentBlog
        )
        setBlogs(updatedBlogs)
    }

    const deleteBlog = (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            blogService.remove(blog)
            setBlogs(blogs.filter(b => b.id !== blog.id))
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        try {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
            setUsername('')
            setPassword('')
            setNotification('logged out')
            setTimeout(() => {
                setNotification(null)
            }, 2000)
        } catch(exception) {
            setErrorMessage('logout failed')
            setTimeout(() => {
                setErrorMessage(null)
            }, 2000)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            blogService.setToken(user.token)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            console.log(user)
            setUsername('')
            setPassword('')
            setNotification(`Welcome ${user.name ? user.name : ''}`)
            setTimeout(() => {
                setNotification(null)
            }, 2000)
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginView = () => {
        return (
            <div>
                <Togglable buttonLabel='login'>
                    <LoginForm
                        username={username}
                        password={password}
                        handleUsernameChange={({ target }) => setUsername(target.value)}
                        handlePasswordChange={({ target }) => setPassword(target.value)}
                        handleLogin={handleLogin}
                    />
                </Togglable>
            </div>
        )
    }

    const blogView = () => {
        blogs.sort((a,b) => b.likes - a.likes)
        return (
            <div>
                <p>{user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                </p>
                <Togglable buttonLabel='new blog' ref={blogFormRef}>
                    <BlogForm
                        createBlog={addBlog}
                    />
                </Togglable>
                <h2>Blogs</h2>
                {blogs.map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        handleLikes={addLike}
                        handleDeletion={deleteBlog}
                        id={user.id}
                    />
                )}
            </div>
        )
    }

    return (
        <div>
            <Notification message={notification} />
            <ErrorNotification message={errorMessage} />

            {user === null ?
                loginView() :
                blogView()
            }

        </div>
    )
}

export default App
