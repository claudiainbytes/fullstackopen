/* eslint-disable no-trailing-spaces */
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mockComponent } from 'react-dom/test-utils'

describe('<BlogLikeBtn />', () => {
  let container

  test('checking if the event controller is called after click in like button twice', async () => {

    const mockHandler = jest.fn()

    const blog = {
      id: '66060de97bc8c3d359721141',
      title:'Agile SCRUM Tips',
      author:'John Davis',
      url: 'https://www.example.com/effective-project-management-tips',
      likes: 1516,
      user: {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        id: '66044ad827c34285729e51de'
      }
    }

    const setMessage = () => {}
    
    const sortBlogs = () => {}

    const BlogLikeBtn = ({ blog, onClickFx }) => {
      return(<button className='blog-like-button' onClick={onClickFx}>Like</button>)
    }

    render(
      <BlogLikeBtn blog={blog} onClickFx={mockHandler}/>
    )
  
    const user = userEvent.setup()

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})
