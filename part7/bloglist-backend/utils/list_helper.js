const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
      ? 0
      : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  let favBlog = {}

  if (blogs.length === 0){
    return 0
  } else {
    favBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    return { title: favBlog.title, author: favBlog.author, likes: favBlog.likes }
  }
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return 0
  } else {
    let authors = []
    const counts = {}

    blogs.forEach((blog) => {
      authors.push(blog.author)
    })

    authors.forEach((author) => {
      counts[author] = counts[author] ? counts[author] + 1 : 1
    })

    const values = Object.values(counts)
    const maxVal = Math.max(...values)
    const key = Object.keys(counts).find(key => counts[key] === maxVal)

    return { author: key, blogs: maxVal }
  }
}

const mostLikes = (blogs) => {


  if (blogs.length === 0) {
    return 0
  } else {
    let authors = []
    const totalLikes = {}

    blogs.forEach((blog) => {
      authors.push(blog.author)
    })

    authors.forEach((author) => {
      let likes = 0

      blogs.forEach((blog) => {
        if (blog.author === author) {
          likes += blog.likes
        }
      })

      totalLikes[author] = likes
    })

    const values = Object.values(totalLikes)
    const maxVal = Math.max(...values)
    const key = Object.keys(totalLikes).find(key => totalLikes[key] === maxVal)

    return { author: key, likes: maxVal }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

/*
*/