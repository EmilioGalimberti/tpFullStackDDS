//Emilio Galimberti 90747

const supertest = require('supertest')
//import supertest from "supertest";
describe('GET /alumnos', ()=>{
    it('Deberia devolver cod 200 con un listado de alumnos no vacio', async()=>{
        const res = await supertest('localhost:3000')
        .get('/alumnos')
        .set('Accept','application/json')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    nombre: expect.any(String)
                })
            ])
        )
    })
})

describe("GET /alumno/:id", function () {
    it("Respuesta OK codigo 200 con un objeto encontrado ", async () => {
        const res = await supertest("localhost:3000").get("/alumno/1")
        expect(res.statusCode).toEqual(200)
        expect(res.headers["content-type"]).toEqual("application/json; charset=utf-8");
        expect(res.body).toEqual(
            expect.objectContaining({
                "id": 1,
                "nombre": expect.any(String)
            })
        );
    }
    )
    it("Respuesta código 404 con mensaje objeto no encontrado", async () => {
        const res = await supertest("localhost:3000").get("/alumno/99");
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining(
                { mensaje:  'Alumno inexistente! (404) no se encontro' }
            )
        );
    }
    )
});

describe('POST /alumno', ()=>{
    it("Respuesta código 200 con objeto creado", async () => {
        const res = await supertest("localhost:3000").post(
            "/alumno"
        )
        .set('Accept', 'application/json')
        .send({nombre: 'Lucas', edad: 15})
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(
                { 
                    id: expect.any(Number) 
                }
            )
        );
    }
    )

    it("Respuesta código 500 con error interno intentando crear", async () => {
        const res = await supertest("localhost:3000").post(
            "/alumno"
        )
        .set('Accept', 'application/json')
        .send({name: 'Lucas'})
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual(
            expect.objectContaining(
                { 
                    mensaje: 'Error interno!' 
                }
            )
        );
    }
    )
})

describe("DELETE /alumno/:id", ()=>{
    // it("Repuesta OK codigo 200 con un objeto eliminado", async()=>{
    //     const res = await supertest("localhost:3000").delete("/alumno/15")
    //     expect(res.statusCode).toEqual(200)
    // })

    it("Repuesta OK codigo 200 con un objeto no encontrado para delete", async()=>{
        const res = await supertest("localhost:3000").delete("/alumno/99")
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining(
                { 
                    mensaje: 'Alumno inexistente! (404) no se encontro' 
                }
            )
        );
    })
})

describe('PUT /alumno', ()=>{
    it("Respuesta código 200 con objeto editado", async () => {
        const res = await supertest("localhost:3000").put(
            "/alumno/6"
        )
        .set('Accept', 'application/json')
        .send({edad: 100})
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining(
                { 
                    id: expect.any(Number) 
                }
            )
        );
    }
    )
    it("Respuesta código 404 con mensaje objeto no encontrado para edicion", async () => {
        const res = await supertest("localhost:3000").get("/alumno/99");
        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual(
            expect.objectContaining(
                { mensaje:  'Alumno inexistente! (404) no se encontro' }
            )
        );
    }
    )
})