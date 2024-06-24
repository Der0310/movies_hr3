const request =require("supertest")
const app = require("../app")

let actorId
const BASE_URL = '/api/v1/actors'

const actor = {
    firstName:'Kirsten',
    lastName: 'Dunst', 
    nationality: 'American',
    image:'lorem.png',
    birthday: 1984-10-10
}


test("Post->'BASE_URL' should return status code 201 and req.body.firstName ===actor.firstName ", async()=> {
    const res = await request(app)
    .post(BASE_URL)
    .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});


test("Get->'BASE_URL'should return status 200 and req.body[0].firstName ===actor.firstName", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].firstName).toBe(actor.firstName)
});

test("Get-> 'BASE_URL/:Id' should return status 200 and req.body.firstName ===actor.firstName", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test ("Put->'BASE_URL/:Id' should return status 200 and req.body.firstName ===updatedActor.firstName", async()=>{
    const updatedActor = {
        firstName:'Kirsten',
    lastName: 'Dunst', 
    nationality: 'American',
    image:'lorem.jpeg',
    birthday: 1984-10-10  
    }

    const res = await request(app)
    .put(`${BASE_URL}/${actorId}`)
    .send(updatedActor)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(updatedActor.firstName)
});

test("Delete-> 'BASE_URL/:Id' should return status 204", async()=> {
    const res = await request(app)
    .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})