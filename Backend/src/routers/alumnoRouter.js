//Emilio Galimberti 90747
import { Router } from "express";
import alumnoService from "../services/alumnoService.js";

export const routerAlumno = Router ();

// routerAlumno.get("/alumnos", async(req,res)=>{
//     try{
//         const alumnosFound = await alumnoService.getAll()
//         if (alumnosFound){
//             res.json(alumnosFound)
//         } else{
//             res.status(404).send({mensaje: "Alumno no encontrado"})
//         }
//         console.log(alumnosFound)
//     }
//     catch(error){
//         res.status(500).send({mensaje: "Error interno"})
//     }
// })

routerAlumno.get("/alumnos", async(req,res)=>{
    try{
        let {nombre} = req.query
        let alumnoFound = undefined
        if(nombre != undefined){
           
            alumnoFound = await alumnoService.getAlumnos(nombre)
        }
        else{
            alumnoFound = await alumnoService.getAlumnos()
        }

        if (alumnoFound.length != 0) {
            res.json(alumnoFound)
        } else {
            res.status(404).send({ mensaje: 'Alumno inexistente! (404) no se encontro' })
        }
        console.log(alumnoFound)
    } catch (error) {
        res.status(500).send({ mensaje: 'Error interno!' })
    }
})

routerAlumno.post("/alumnos" , async(req,res)=> {
     //generalmente en el get no vamos a levantar el body
    /*
    req.body
    Contiene pares clave-valor de datos enviados en el cuerpo de la solicitud. De forma predeterminada, no está
    definido y se completa cuando usa un middleware de análisis del cuerpo, como express.json()
     */
    try{
        let data = req.body
        data.nombre = data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1).toLowerCase();     
        const nuevo = await alumnoService.add(data)
        res.json(nuevo) //// Genera una respuesta con un objeto JSON código 200 OK
        console.log(nuevo)
        //no me llegan los datos del post desde postman, puede ser un problema de config
        //reveer
    }
    catch{
        res.status(500).send({ mensaje: 'Error interno!' })
    }
})

routerAlumno.delete("/alumnos/:id", async(req,res)=>{
    try{
        const id = req.params.id
        const alumnoFound = await alumnoService.getByID(id)
        if(alumnoFound){
            res.json(alumnoFound)
            alumnoFound.destroy()
            console.log("Alumno eliminado con existo")
            //res.json(alumnoFound)  si dejo esta linea me da
            // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
            // es porque esta intentando hacer una respuesta json de algo que fue borrado
            // "Doble respuesta en tu código"
        } else{
            res.status(404).send({ mensaje: 'Alumno inexistente! (404) no se encontro' })
        }
    }catch(error){
        res.status(500).send({ mensaje: 'Error interno!' })
    }
})

routerAlumno.put("/alumnos/:id", async(req,res)=>{
    try{
        console.log("Editando alumno")
        const id = req.params.id
        let data = req.body
        const alumnoFound = await alumnoService.getByID(id)
        if(alumnoFound){
            data.nombre = data.nombre.charAt(0).toUpperCase() + data.nombre.slice(1).toLowerCase();
            alumnoFound.nombre = data.nombre
            alumnoFound.edad = data.edad
            res.json(alumnoFound)
            alumnoFound.save()
        }else{
            res.status(404).send({ mensaje: 'Alumno inexistente! (404) no se encontro' })
        }
    }
    catch(error){
        res.status(500).send({ mensaje: 'Error interno!' })    
    }
})