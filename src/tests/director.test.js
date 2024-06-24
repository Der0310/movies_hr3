const request =require('supertest')
const app = require('../app')


const BASE_URL = '/api/v1/directors'

let directorId

const director = {
    firstName: 'Steven',
    lastName:'Spielgberg',
    nationality: 'American',
    image:'lorem.png',
    birthday:1945-10-10
}

test("Post->'BASE_URL' should return status 201 and res.body.firstName===director.firstName", async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test("Get-> 'BASE_URL' should return status 200 and res.body[0].firstName===director.firstName", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(director.firstName)
});

test("Get-> 'BASE_URL/:Id' should return status 200 and res.body.firstName===director.firstName", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test("Put->'BASE_URL/:Id' should return status 200 and res.body.firstName===updatedDirector.firstName", async()=>{

    const updatedDirector = {
        firstName: 'Steeven',
        lastName:'Spielgberg',
        nationality: 'American',
        image:'lorem.png',
        birthday:1945-10-10
    }
    const res = await request(app)
    .put(`${BASE_URL}/${directorId}`)
    .send(updatedDirector)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(updatedDirector.firstName)
});

test("Delete->'BASE_URL' should return status 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})