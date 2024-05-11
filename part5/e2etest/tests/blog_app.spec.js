const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                username: 'Jantje',
                name: 'Jantje de Jong',
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
            await loginWith(page, 'Jantje', 'wrong')
    
            const errorDiv = await page.locator('.error')
            await expect(errorDiv).toContainText('Wrong username or password')
            await expect(page.getByText('Jantje logged in')).not.toBeVisible()
        })
    
        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'Jantje', 'abcde')
    
            await expect(page.getByText('Jantje logged in')).toBeVisible()
        }) 
    })

    describe('when logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'Jantje', 'abcde')
        })

        test('a new blog can be created', async ( { page } ) => {
            await createBlog(page, 'nieuwetest', 'Jantje', 'http://www.jdj.nl')
            await expect(page.getByText('nieuwetest by Jantje added')).toBeVisible()
            await expect(page.getByText('nieuwetest Jantjeview')).toBeVisible()
        })

        test('blog can be deleted', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).nth(3).click()
            page.on('dialog', dialog => dialog.accept())
            await page.getByRole('button', { name: 'remove' }).click()
            await expect(page.getByText('nieuwetest Jantjeview')).not.toBeVisible()
        })

        test('remove button for blogs from other user not visible', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).nth(2).click()
            await expect(page.getByText('remove').first()).not.toBeVisible()
        })

        test('blogs are arranged according to likes', async ({ page }) => {
            await page.getByText('blogs').waitFor({ timeout: 500 })
            const buttons = await page.getByRole('button', { name: 'view' }).all()
            const count = buttons.length
            for (let i = 0; i < count; i++) {
                await buttons[0].click()
            }

            const all_likes = []

            await page.getByText('blogs').waitFor({ timeout: 500 })
            const likes = await page.getByTestId('likes').all()

            for (let i = 0; i < count; i++) {
                let like = await likes[i].textContent()
                like = Number(like.replace(' like', ''))
                all_likes.push(like)
            }

            await expect(all_likes.sort((a, b) => b-a) === all_likes).toBeTruthy()
        })
    })
})
