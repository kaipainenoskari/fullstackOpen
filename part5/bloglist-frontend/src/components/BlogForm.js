import PropTypes from 'prop-types'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
            likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h3>Create new blog</h3>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='title'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='url'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm