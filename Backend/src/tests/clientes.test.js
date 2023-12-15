
const supertest = require('supertest')

//const port = require('../routers/routers.js').port

const baseURL = `localhost:3000`

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//prueba para endpoint de get by id
describe('get /api/clientes/:id', ()=>{
    //escenario1
    it('Debería devolver un cod 200 OK con un objeto cliente', async ()=>{
        const res = await supertest(baseURL).get('/api/clientes/1')
        expect(res.statusCode).toEqual(200)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
        expect(res.body).toEqual(expect.objectContaining({
            "ID_cliente": 1,
            "nombre": expect.any(String, null),
            "apellido": expect.any(String, null),
            "direccion": expect.any(String, null),
            "fechaNacimiento": expect.any(String, null)
            })
        )
    }) 

    //escenario2
    it('Deberia devolver un cod 404 NOT FOUND con un mensaje objeto no encontrado', async()=>{
        const res = await supertest(baseURL).get('/api/clientes/100')
        expect(res.statusCode).toEqual(400)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
        expect(res.body).toEqual(expect.objectContaining({
            "message": "Cliente no encontrado"
        }))
    })
    
    //error interno, la idea es que lo falle al test
    /*
    it('Debería devolver un cod 500, con un mensaje "Error interno"', async()=>{
        const res = await supertest(baseURL).get('/api/clientes/1')
        expect(res.statusCode).toEqual(500)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
        expect(res.body).toEqual(expect.objectContaining({
            "message": "Error interno, no se pudo consultar el cliente"
        }))
    })*/

})


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//test de prueba del Get all
describe('get /api/clientes', () => {
    //escenario1
    it('Debería devolver un código 200 OK con todos los clientes', async () => {
      const res = await supertest(baseURL).get('/api/clientes')
      expect(res.statusCode).toEqual(200)
      expect(res.header['content-type']).toEqual('application/json; charset=utf-8')
    
      //es la respuesta un array?
      expect(Array.isArray(res.body)).toBe(true)
      expect(res.body.length).toBeGreaterThan(0)
      
      //recorremos cada cliente para ver si esta correctamente armado el objeto
      res.body.forEach(client => {expect.objectContaining({
        "ID_cliente": expect.any(String, null),
        "nombre": expect.any(String,null),
        "apellido": expect.any(String, null),
        "direccion": expect.any(String, null),
        "fechaNacimiento": expect.any(String, null)
      })
        
      })
    })

    //escenario 2 errores internos, debería dar bien si todo esta correcto
    /*
    it('Debería devolver un Cod 500, error interno', async ()=>{
        const res = await supertest('localhost:3000').get('/api/clientes')
        expect(res.statusCode).toEqual(500)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            'message': 'Error interno, no se pudo consultar los clientes'
        }))})
    */
  })
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Prueba del Update By Id
describe('update /api/clientes/:id', ()=>{
    //Escenario 1 del Update, escenario correcto
    it('Debería recibir un cod 200 OK con el objeto cliente actualizado', async()=>{
       //formamos los atributos de prueba
        const fechaPrueba = new Date(1995,3,5)
        const nuevosAtributos = {
            "nombre": "Nombre nuevo",
            "apellido": "Apellido nuevo",
            "direccion": "Dirección nueva",
            "fechaNacimiento": fechaPrueba
        }

        //generamos la respuesta mandandole los atributos por el request mediante .send(nuevosAtributos)
        const res = await supertest(baseURL).put('/api/clientes/3').send(nuevosAtributos)


        expect(res.statusCode).toEqual(200)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            'ID_cliente': 3,
            "nombre": "Nombre nuevo",
            "apellido": "Apellido nuevo",
            "direccion": "Dirección nueva",
            "fechaNacimiento": fechaPrueba.toISOString()
        }))
    })
    
    //escenario2, si el cliente buscado para actualizar no existe
    it('Debería recibir un Cod 400, cliente no encontrado', async ()=>{
        const fechaPrueba = new Date(1995,7,9)
        const nuevosAtributos = {
            "nombre": "Nuevo Nombre 99",
            "apellido": "Nuevo apellido 99",
            "direccion": "Nueva direccion 99",
            "fechaNacimiento": fechaPrueba
        }

        const res = await supertest(baseURL).put('/api/clientes/99').send(nuevosAtributos)
        
        expect(res.statusCode).toEqual(400)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "message": "Cliente no encontrado"
        }))

    } )


    //escenario3, este sucede con el error interno, debería fallar en condiciones normales
    /*
    it('Debería recibir un Cod 500, error interno', async()=>{
        const fechaPrueba = new Date(1995,3,5)
        const nuevosAtributos = {
            "nombre": "Nombre nuevo 3",
            "apellido": "Apellido nuevo 3",
            "direccion": "Dirección nueva 3",
            "fechaNacimiento": fechaPrueba
        }

        const res = await supertest(baseURL).put('/api/clientes/2').send(nuevosAtributos)

        expect(res.statusCode).toEqual(500)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "message": "Error interno, no se pudo actualizar al cliente"
        }))
    })*/
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//test del post de clientes
describe('post /api/clientes', ()=>{

    //escenario1 se crea correctamente un nuevo cliente
    it('Debería recibir un Cod 200 y un objeto del nuevo cliente creado', async()=>{
        const fechaNac = new Date(1984, 10, 4)
        const nuevoCliente = {
            "nombre": "Nombre Creado 1",
            "apellido": "Apellido Creado 1",
            "direccion": "Direccion creada 1",
            "fechaNacimiento": fechaNac
        }

        const res = await supertest(baseURL).post('/api/clientes').send(nuevoCliente)

        expect(res.statusCode).toEqual(200)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "ID_cliente": expect.any(Number),
            "nombre": "Nombre Creado 1",
            "apellido": "Apellido Creado 1",
            "direccion": "Direccion creada 1",
            "fechaNacimiento": fechaNac.toISOString()
        }))
    })

    //escenario 2, error interno, debería fallar en condiciones normales
    /*
    it('Debería recibir un cod 500 indicando un error interno', async()=>{
        const fechaNac = new Date(1980,4,9)
        const nuevoCliente = {
            "nombre": "Nombre para Error interno",
            "apellido": "Apellido para Error interno",
            "direccion": "Direccion para Error interno",
            "fechaNacimiento": fechaNac
        }

        const res = await supertest(baseURL).post('/api/clientes').send(nuevoCliente)

        expect(res.statusCode).toEqual(500)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "message": "Error interno, no se ha podido añadir el nuevo cliente"
        }))
    })
    */
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
describe('DELETE /api/clientes/:id', ()=>{
    //Escenario 1, Se elimina un cliente correctamente
    /*
    it('Debería recibir un Cod 200 y un objeto con el cliente eliminado', async()=>{

        const res = await supertest(baseURL).delete('/api/clientes/31')

        expect(res.statusCode).toEqual(200);
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "ID_cliente": 31,
            "nombre": expect.any(String, null),
            "apellido": expect.any(String, null),
            "direccion": expect.any(String, null),
            "fechaNacimiento": expect.any(String, null)
        }))
    })
    */

    //escenario 2, colocar un id de cliente que no existe
    it('Debería devolver un Cod 400 con un mensaje de Cliente no encontrado', async()=>{
        const res = await supertest(baseURL).delete('/api/clientes/100')

        expect(res.statusCode).toEqual(400)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "message": "Cliente no encontrado"
        }))
    })

    //escenario 3, error interno, debería fallar en caso de que todo esté OK
    /*
    it('Debería devolver un Cod 500, error interno no se pudo eliminar el cliente', async()=>{

        const res = await supertest(baseURL).delete('/api/clientes/29')

        expect(res.statusCode).toEqual(500)
        expect(res.header['content-type']).toEqual('application/json; charset=utf-8')

        expect(res.body).toEqual(expect.objectContaining({
            "message": "Error interno, no se pudo eliminar el cliente"
        }))

    })*/
})
