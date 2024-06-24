const request = require('supertest')
const app = require('../app')

const BASE_URL = '/api/v1/genres'

let genreId

const genre = {
    name: 'Action'
}

test("Post-> 'BASE_URL' should return status 201 and res.body.name === genre.name ", async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

test("Get-> 'BASE_URL' should return status 200 and res.body[0].name===genre.name", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(genre.name)
});

test("Get-> 'BASE_URL/:Id' should return status 200 and res.body.name===genre.name ", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

test("Put-> 'BASE_URL/:Id'should return status 200 and res.body.name===updatedGenre.name", async()=>{
    const updatedGenre ={
        name:'Comedy'
    }

    const res = await request(app)
    .put(`${BASE_URL}/${genreId}`)
    .send(updatedGenre)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(updatedGenre.name)

});

test("Delete-> 'BASE_URL/:Id' should return status 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})