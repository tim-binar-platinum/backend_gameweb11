const request = require('supertest')

const app = require('../app')
const { expect, describe, it } = require('@jest/globals');


describe ('userController', () => {
    describe('point', () => {
        it('adds user points', async() => {
            const username = "new user";
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
           .post('/game')
           .send({status: 'win'})
           .set({"authorization": "authorization" + " " + jwt})

           expect(response.status).toEqual(200)
        })
    })

    describe('total points', () => {
        it('shows user total points', async() => {
            const username = "new user";
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
           .get('/points')
           .set({"authorization": "authorization" + " " + jwt})

           expect(response.status).toEqual(200)
        })
    })

    describe('history', () => {
        it('shows user game history', async() => {
            const username = "new user";
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
           .get('/history')
           .set({"authorization": "authorization" + " " + jwt})

           expect(response.status).toEqual(200)
        })
    })
})