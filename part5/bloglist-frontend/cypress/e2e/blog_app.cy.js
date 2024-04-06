describe('Blog app', function(){

  beforeEach(function(){
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'mtwluken'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('#login-button').contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('mtwluken')
      cy.get('#login-button').click()
      cy.contains('Welcome Matti Luukkainen')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error').should('contain', 'Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Welcome Matti Luukkainen')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mtwluken'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login(user)
    })

    it('A blog can be created', function() {
      cy.contains('Create blog').click()
      cy.get('#title').type('Eloquent JavaScript')
      cy.get('#author').type('Marijn Haverbeke')
      cy.get('#url').type('https://eloquentjavascript.net/')
      cy.get('#create-blog-button').click()
      cy.contains('A new blog Eloquent JavaScript by Marijn Haverbeke added')
    })
  })

  describe('Like action button', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mtwluken'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login(user)

      const newBlog = {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/'
      }
      cy.createBlog(newBlog)
    })

    it('It was clicked', function() {
      cy.get('.blog-container').eq(0).contains('View').click()
      cy.get('.blog-container').eq(0).find('.blog-like-button').click()
    })
  })

  describe('Remove blog', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mtwluken'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login(user)

      const newBlog = {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/'
      }
      cy.createBlog(newBlog)
    })

    it('It was removed', function() {
      cy.get('.blog-container').eq(0).contains('View').click()
      cy.get('.blog-container').eq(0).find('.blog-remove').click()
    })
  })

  describe('Remove blog', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user0 = {
        name: 'Joanne Doe',
        username: 'joanned',
        password: 'juanadu'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user0)
      cy.login(user0)
      const newBlog = {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/'
      }
      cy.createBlog(newBlog)
      cy.logout(user0)
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mtwluken'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login(user)

      const newBlog1 = {
        title: 'Eloquent JavaScript 1',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/'
      }
      cy.createBlog(newBlog1)
    })

    it('Check if remove button exist', function() {
      cy.get('.blog-container').eq(0).contains('View').click()
      cy.get('.blog-container').eq(0).should('not.contain', 'Remove')
    })

  })

  describe('Remove blog', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user0 = {
        name: 'Joanne Doe',
        username: 'joanned',
        password: 'juanadu'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user0)
      cy.login(user0)
      const newBlog = {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/'
      }
      cy.createBlog(newBlog)
      cy.logout(user0)
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mtwluken'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login(user)

      const newBlog1 = {
        title: 'Eloquent JavaScript 1',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/'
      }
      cy.createBlog(newBlog1)
    })

    it('Check if remove button exist', function() {
      cy.get('.blog-container').eq(0).contains('View').click()
      cy.get('.blog-container').eq(0).should('not.contain', 'Remove')
    })

  })

  describe('Most liked blogs', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user0 = {
        name: 'Joanne Doe',
        username: 'joanned',
        password: 'juanadu'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user0)
      cy.login(user0)
      const newBlog = {
        title: 'Eloquent JavaScript',
        author: 'Marijn Haverbeke',
        url: 'https://eloquentjavascript.net/',
        likes: 18
      }
      cy.createBlogWithLikes(newBlog)
      const newBlog1 = {
        title: 'Lorem Ipsum',
        author: 'Sit Amen',
        url: 'https://loremipsum.net/',
        likes: 20
      }
      cy.createBlogWithLikes(newBlog1)
      cy.logout(user0)
      const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'mtwluken'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
      cy.login(user)

      const newBlog2 = {
        title: 'Dummy Text',
        author: 'Sophia JKL',
        url: 'https://dummytext.net/',
        likes: 17
      }
      cy.createBlogWithLikes(newBlog2)
      const newBlog3 = {
        title: 'Glow',
        author: 'Janice Kelar',
        url: 'https://glow.net/',
        likes: 21
      }
      cy.createBlogWithLikes(newBlog3)
    })

    it('Check the most liked blog', function() {
      cy.get('.blog-container').eq(0).contains('View').click()
      cy.get('.blog-container').eq(0).should('contain', 'Likes: 21')
      cy.get('.blog-container').eq(1).contains('View').click()
      cy.get('.blog-container').eq(1).should('contain', 'Likes: 20')
    })

  })

})