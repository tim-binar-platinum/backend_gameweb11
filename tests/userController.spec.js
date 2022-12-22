const request = require('supertest')

const app = require('../app')
const { expect, describe, it } = require('@jest/globals');


describe ('userController', () => {
    describe('register', () => {
        it('register new user', async() => {
            const body = {
                username: 'test user',
                password: 'new pass',
                name: 'new name',
                birth_place: 'new place',
                gender: 'male',
                email: 'mail@mail.com'
            }

            const response = await request(app)
            .post('/register')
            .send(body)
            expect(response.status).toEqual(201)
        })

        it('returns error, username has been used', async() => {
            const body = {
                username: 'test user',
                password: 'new pass',
                name: 'new name',
                birth_place: 'new place',
                gender: 'male',
                email: 'mail@mail.com'
            }

            const response = await request(app)
            .post('/register')
            .send(body)
            expect(response.status).toEqual(400)
        })
    })

    describe('login', () => {
        it('returns jwt token', async() => {
            const username = "test user";
            const password = "new pass";
            const req = {
                username,
                password
            }
           const response = await request(app)
            .post('/login')
            .send(req)
            .set('Accept', 'application/json')

           expect(response.status).toEqual(200)
        })

        it('tests unregistered user', async() => {
            const username = "notAvailable";
            const password = "notAvailable";
            const req = {
                username,
                password
            }
            const response = await request(app)
            .post('/login')
            .send(req)
            .set('Accept', 'application/json')

           expect(response.status).toEqual(400)
           expect(response.body.message).toBe('user not found')
        })

        it('tests user input wrong password', async() => {
            const username = "test user";
            const password = "notAvailable";
            const req = {
                username,
                password
            }
            const response = await request(app)
            .post('/login')
            .send(req)
            .set('Accept', 'application/json')

           expect(response.status).toEqual(400)
           expect(response.body.message).toBe('wrong password')
        })
    })

    describe('dashboard', () => {
        it('returns user profile with searched username', async() => {
            const query = {
                search_name: 'test user',
            }
            const response = await request(app)
            .get('/users')
            .query(query)
            expect(response.status).toEqual(200)
            expect(response.body.data[0].username).toBe('test user')
        })

        it('returns all user profile', async() => {
            const response = await request(app)
            .get('/users')
            expect(response.status).toEqual(200)
        })

        it('returns no data, because user not found', async() => {
            const query = {
                search_name: 'noUserHere',
            }
            const response = await request(app)
            .get('/users')
            .query(query)
            expect(response.status).toEqual(200)
            expect(response.body.data.length).toBe(0)
        })
    })

    describe('profile', () => {
        it('returns user profile', async() => {
            const username = "test user";
            const password = "new pass";
            const req = {
                username,
                password
            }
           const login = await request(app)
            .post('/login')
            .send(req)
            .set('Accept', 'application/json')

           const jwt = login.body.token
           
           const response = await request(app)
           .get('/users/profile')
           .set({"authorization": "authorization" + " " + jwt})

           expect(response.status).toEqual(200)
           expect(response.body.message).toBe('success')
        })

        it('returns error token required', async() => {           
           const response = await request(app)
           .get('/users/profile')
           expect(response.status).toEqual(403)
           expect(response.text).toBe('a token is required for authentication')
        })

        it('returns error invalid token', async() => {
           const invalidToken = '1234567890'
           
           const response = await request(app)
           .get('/users/profile')
           .set({"authorization": "authorization" + " " + invalidToken})

           expect(response.status).toEqual(401)
           expect(response.text).toBe('invalid token')
        })
    })

    describe('edit', () => {
        it('edits user detail', async() => {
            const username = "test user";
            const password = "new pass";
            const req = {
                username,
                password
            }
           const login = await request(app)
            .post('/login')
            .send(req)
            .set('Accept', 'application/json')

           const jwt = login.body.token
           
           const body = {
            name: 'updated name',
           }

           const response = await request(app)
           .put('/update')
           .send(body)
           .set({"authorization": "authorization" + " " + jwt})
           expect(response.status).toEqual(200)
        })
    })

    describe('delete', () => {
        it('deletes user', async() => {
            const username = "test user";
            const password = "new pass";
            const req = {
                username,
                password
            }
           const login = await request(app)
            .post('/login')
            .send(req)
            .set('Accept', 'application/json')

           const jwt = login.body.token
           
           const response = await request(app)
           .delete('/delete')
           .set({"authorization": "authorization" + " " + jwt})
           expect(response.status).toEqual(200)
        })
    })
})