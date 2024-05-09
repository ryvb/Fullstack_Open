const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'keesie',
                name: 'Kees de Hond',
                password: 'abcde'
            }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        const locator = await page.getByRole('button', { name: 'login' })
        await expect(locator).toBeVisible()
    }) 

    describe('Login', () => {
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'keesie', 'wrong')
    
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password')
            await expect(page.getByText('keesie logged in')).not.toBeVisible()
        })
    
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'keesie', 'abcde')
    
            await expect(page.getByText('keesie logged in')).toBeVisible()
        }) 
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'keesie', 'abcde')
        })

        test('a new blog can be created', async ( {page} ) => {
            await createBlog(page, 'threefaith', 'keesie', 'http://www.kdh.nl')
            await expect(page.getByText('threefaith by keesie added')).toBeVisible()
            //await expect(page.getByTestId('summarizedBlogInfo')).toContainText('threefaith')
            await expect(page.getByText('threefaith keesieview')).toBeVisible()
        })
    })
})
