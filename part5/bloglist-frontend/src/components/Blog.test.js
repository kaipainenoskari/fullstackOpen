import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    let container
    let blog
    let mockHandler

    beforeEach(() => {
        blog = {
            title: 'testi',
            author: 'testittäjä',
            url: 'testi.fi',
            user: 'testaaja'
        }
        mockHandler = jest.fn()
        container = render(<Blog blog={blog} handleLikes={mockHandler} />).container
    })

    test('renders title and author', () => {
        const div = container.querySelector('.originalView')
        expect(div).toHaveTextContent('testi testittäjä')
    })

    test('the likes and url are not rendered in the beginning', () => {
        let element = screen.queryByText('likes')
        expect(element).toBeNull()
        element = screen.queryByText('url')
        expect(element).toBeNull()
    })

    test('clicking view button shows url and likes', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const div = container.querySelector('.extendedView')
        expect(div).toHaveTextContent('like')
        expect(div).toHaveTextContent('testi.fi')
    })

    test('clicking like button twice calls event handler twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)
        expect(mockHandler.mock.calls).toHaveLength(2)
    })

    test('creating a new blog call the event handler with right props', async () => {
        
    })

})