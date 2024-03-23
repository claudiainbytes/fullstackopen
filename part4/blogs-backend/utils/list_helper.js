const dummy = (blogs) => {
    return 1
}

const totalLikes = list => {
    if(list.length === 0) {
        return 0
    } else if(list.length === 1) {
        return list[0].likes
    } else {
        return list.reduce((sum, item) => sum + item.likes, 0)
    }
}

const favoriteBlog = list => {
    if(list.length === 0) {
        return {}
    } else {
        return list.reduce((prev, current) => (prev.likes > current.likes) ? prev : current )
    }
}

const mostBlogs = list => {
    if(list.length === 0) {
        return {}
    } else {
        let blog = list.reduce((prev, current) => (prev.blogs > current.blogs) ? prev : current )
        return { "author": blog.author, "blogs": blog.blogs }
    }
}

const mostLikes = list => {
    if(list.length === 0) {
        return {}
    } else {
        let blog = list.reduce((prev, current) => (prev.likes > current.likes) ? prev : current )
        return { "author": blog.author, "likes": blog.likes }
    }
}
 
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}