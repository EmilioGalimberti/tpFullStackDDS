const request = require("supertest")
const urlBase = "localhost:3000"
const albumTest = {
    id: 40,
    nombre: "albumTest",
    autor: "nn",
    cantidad_canciones: 20,
    stock: 1
}
const albumTestActualizado = {
    nombre: "albumTest",
    autor: "nn",
    cantidad_canciones: 30,
    stock: 1
}

describe('GET /albumes', function(){
    it('Deberia devolver codigo 200 con objetos encontrados',async()=>{
        const res = await request(urlBase)
        .get('/albumes')
        .set('Accept', 'application/json')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    "id": expect.any(Number),
                    "nombre": expect.any(String),
                    "autor": expect.any(String),
                    "cantidad_canciones": expect.any(Number),
                    "stock": expect.any(Number)
                })
            ])
        )
    })
    /*
    it('Debería devolver codigo 400 con un arreglo vacio', async()=>{
     const res = await request(urlBase)
     .get('/albumes')
     .set('Accept', 'application/json')
     
     expect(res.status).toEqual(400)
     expect(res.body).toEqual(

         expect.objectContaining({
             message: 'No encontrado'
         })
     )
    })*/
})


describe('GET /albumes/:id',function(){
    //escenario 1:
it('Deberia devolver codigo 200 con un objeto encontrado',async()=>{
    const res = await request(urlBase).get('/albumes/1')
    expect(res.statusCode).toEqual(200)
    expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
    expect(res.body).toEqual(
        expect.objectContaining({
            "id": 1,
            "nombre": expect.any(String),
            "autor": expect.any(String),
            "cantidad_canciones": expect.any(Number),
            "stock": expect.any(Number)
        })
    );
}
)
//escenario 2:
it("Respuesta código 404 con mensaje objeto no encontrado", async () => {
    const res = await request(urlBase).get("/albumes/99")
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual(
        expect.objectContaining({ "message": 'No encontrado' })
    );
}
)
})

describe('POST /albumes',function(){
    //Escenario 1:
    it('Deberia devolver codigo 200 con un objeto creado', async()=>{
        const res = await request(urlBase).post('/albumes')
        .set('Accept','application/json')
        .send(albumTest)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number)
            })
        )
    })
    /*Escenario 2: ERROR 500


    it('Deberia devolver codigo 500 con error interno', async()=>{
        const res = await request(urlBase)
        .post('/albumes')
        .set('Accept','application/json')
        .send({nomb:'albumTestFail'})
        expect(res.statusCode).toEqual(500)
        expect(res.body).toEqual(
            expect.objectContaining(
                {message: 'no se pudo realizar la opereacion'}
        ))
    })*/
})

describe('PUT /albumes/:id', function(){
    it('Deberia devolver codigo 200 con un objeto actualizado', async()=>{
        const res = await request(urlBase)
        .put('/albumes/3')
        .set('Accept', 'application/json')
        .send(albumTestActualizado)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(
            expect.objectContaining({
                "id": 3,
                "nombre": expect.any(String),
                "autor": expect.any(String),
                "cantidad_canciones": expect.any(Number),
                "stock": expect.any(Number)
            })
        )
    })

    it('Debería devolver codigo 400 con un objeto vacio', async()=>{
     const res = await request(urlBase)
     .get('/albumes/78')
     .set('Accept', 'application/json')
     
     expect(res.status).toEqual(404)
     expect(res.body).toEqual(
         expect.objectContaining({
             message: 'No encontrado'
         })
     )
    })
})

describe('DELETE /albumes/:id',
function(){
    it('Deberia devolver codigo 200 con un album eliminado',async()=>{
    const res = await request(urlBase)
    .delete('/albumes/40')
    .set('Accept', 'application/json')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toEqual(
        expect.objectContaining({
            "id": 40,
            "nombre": expect.any(String),
            "autor": expect.any(String),
            "cantidad_canciones": expect.any(Number),
            "stock": expect.any(Number)
        })
        )
       })
   })

