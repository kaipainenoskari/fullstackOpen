import { useState } from 'react'

const Blog = ({ blog, handleLikes, handleDeletion, id }) => {
    const [extended, setExtended] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const originalView = (blog, extended, setExtended) => {
        return (
            <div className='originalView'>
                {blog.title} {blog.author}
                <button onClick={() => setExtended(!extended)}>view</button>
            </div>
        )
    }

    const extendedView = (blog, id, extended, setExtended) => {
        return (
            <div id='blog' className='extendedView'>
                {blog.title} {blog.author}
                <button onClick={() => setExtended(!extended)}>hide</button>
                <p>
                    {blog.url}
                </p>
                <p>
                    {blog.likes}
                    <button id='like' onClick={() => handleLikes(blog, blog.likes)}>like</button>
                </p>
                <p>
                    {blog.user.name}
                </p>
                { id === blog.user.id ?
                    <button onClick={() => handleDeletion(blog)} >remove</button>
                    : null}
            </div>
        )
    }

    return (
        <div style={blogStyle} className='blog'>
            {!extended ? originalView(blog, extended, setExtended) : extendedView(blog, id, extended, setExtended)}
        </div>
    )}

export default Blog