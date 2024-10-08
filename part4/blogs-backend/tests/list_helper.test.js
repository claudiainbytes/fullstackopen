const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    blogs: 1,
    __v: 0
  }
]

const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      blogs: 9,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      blogs: 15,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      blogs: 2,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      blogs: 4,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      blogs: 15,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      blogs: 3,
      __v: 0
    }  
]

const authorTest = { author: blogs[4].author, blogs: blogs[4].blogs }

const authorLikesTest = { author: blogs[2].author, likes: blogs[2].likes }

describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })

})

describe('favorite blog', () => {

  test('of empty list is empty object', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toEqual({})
  })
  
  test('of a bigger list, get the most liked', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual(blogs[2])
  })

})

describe('author with the most number of blogs', () => {

  test('of empty list is empty object', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual({})
  })
  
  test('of a bigger list, get the author', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual(authorTest)
  })
  
})

describe('author with the most number of likes', () => {

  test('of empty list is empty object', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual({})
  })
  
  test('of a bigger list, get the author with most likes', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual(authorLikesTest)
  })
  
})

