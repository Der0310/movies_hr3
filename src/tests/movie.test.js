require('../models')
const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')


const BASE_URL = '/api/v1/movies'

let movieId
let actor
let director
let genre

const movie = {
    name: 'Dune',
    image:'lorem.png',
    synopsis:'lorem lorem lorem',
    releaseYear:'2023'
}

afterAll(async()=>{
    await actor.destroy(),
    await director.destroy(),
    await genre.destroy()
});

test("Post->'BASE_URL' should return status 201 and res.body.name===movie.name", async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test("Get->'BASE_URL' should return status 200 and res.body[0].name===movie.name", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(movie.name)
});

test("Get->'BASE_URL/:Id' should return status 200 and res.body.name===movie.name", async()=> {
    const res = await request(app)
    .get(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test("Put->'BASE_URL/:Id' should return status 200 and res.body.name===updatedMovie.name", async()=> {
    const updatedMovie = {
        name: 'Dune 2',
        image:'lorem.png',
        synopsis:'lorem lorem lorem',
        releaseYear:'2023' 
    }
    const res = await request(app)
    .put(`${BASE_URL}/${movieId}`)
    .send(updatedMovie)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(updatedMovie.name)
});

test("Post->'BAE_URL/:Id/actors' should return status 200, and res.body.lenght = 1", async()=>{
    actor = await Actor.create({
        firstName:'Kirsten',
    lastName: 'Dunst', 
    nationality: 'American',
    image:'lorem.png',
    birthday: 1984-10-10
    })

    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/actors`)
    .send([actor.id])

    
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].actorMovie.actorId).toBe(actor.id)
    expect(res.body[0].actorMovie.movieId).toBe(movieId)
});

test("Post->'BAE_URL/:Id/directors' should return status 200, and res.body.lenght = 1", async()=>{
    director = await Director.create({
        firstName: 'Steven',
        lastName:'Spielgberg',
        nationality: 'American',
        image:'lorem.png',
        birthday:1945-10-10
    })
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/directors`)
    .send([director.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].directorMovie.directorId).toBe(director.id)
    expect(res.body[0].directorMovie.movieId).toBe(movieId)   
});
test("Post->'BAE_URL/:Id/genres' should return status 200, and res.body.lenght = 1", async()=>{
    genre = await Genre.create({
        name:'Action'
    })
    const res = await request(app)
    .post(`${BASE_URL}/${movieId}/genres`)
    .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].genreMovie.genreId).toBe(genre.id)
    expect(res.body[0].genreMovie.movieId).toBe(movieId)

});

test("Delete->'BASE_URL/:Id' should return status 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})


