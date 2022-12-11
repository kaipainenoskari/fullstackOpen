const totalLikes = blogs => {
    const likes = blogs.map(a => a.likes).reduce((a, b) => a + b, 0)
    return likes
}

const favouriteBlog = blogs => {
    const mostLikes = blogs.reduce((prev, curr) => {
        return (prev.likes > curr.likes) ? prev : curr
    })
    const answer = { 
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    }
    return (answer)
}

const mostBlogs = blogs => {
    const authors = blogs.map(a => a.author)
    return authors.sort((a, b) =>
        authors.reduce((acu, cur) => (cur === a ? (acu += 1) : cur)) -
        authors.reduce((acu, cur) => (cur === b ? (acu += 1): cur))
    ).pop()
}

const mostLikes = blogs => {
    const authorsLikes = []
    blogs.forEach(element => {
        var i
        var truth = true
        for (i = 0; i < authorsLikes.length; i++) {
            if (authorsLikes[i].author === element.author) {
                authorsLikes[i].likes += element.likes
                truth = false
            }
        }
        if (truth) {
            authorsLikes.push(element)
        }
    })
    authorsLikes.sort((a, b) => { return a.likes - b.likes })
    const winner = authorsLikes.pop()
    return ({ author: winner.author, likes: winner.likes })
}

module.exports = {
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}