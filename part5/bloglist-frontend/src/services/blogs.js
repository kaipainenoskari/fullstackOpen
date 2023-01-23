import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${ baseUrl }/${id}`, newObject)
    return request.then(response => response.data)
}

const addLike = async (blog, likes) => {
    const updatedBlog = {
        user: blog.user.id,
        likes: likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }

    const config = {
        headers: { Authorization: token }
    }

    const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)

    return response.data
}

const remove = async (blog) => {
    const config = {
        headers: { Authorization: token }
    }
    await axios.delete(`${ baseUrl }/${ blog.id }`, config)
}

const exports = { getAll, create, update, setToken, addLike, remove }

export default exports