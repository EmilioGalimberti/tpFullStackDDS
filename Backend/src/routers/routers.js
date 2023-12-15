import express from "express";
import { Cliente } from "../models/clientes.js";
import services from "../services/servicesClientes.js";

export const router = express.Router();

//metodo get de todos los clientes
router.get('/clientes', async function (req,res){
    try {
        const lista = await Cliente.findAll({})
        res.json(lista);
    }
    catch(e){
        res.status(500).json({'message': 'Error interno, no se pudo consultar los clientes'})
    }
    
})

//getById o nombre de los clientes
router.get('/clientes/filtro', async function(req,res){
    try{
        const {id} = req.query
        const {nombre} = req.query
        const {apellido} = req.query
    
        let cliente = ({})
   
        if (id){
            cliente = await services.getClienteById(id)
        }
        /*
        
        else if((nombre && apellido) || (nombre !== undefined && apellido === undefined) || (nombre === undefined && apellido !== undefined)){
        
        */

        else if(nombre || apellido){
            cliente = await services.getClienteByNombre(nombre, apellido)
        }

        if(cliente !== null){ 
            res.json(cliente)
        }
            
        else{
            res.status(400).json({message: 'Cliente no encontrado'})
        }
        
        }
    //error interno
    catch(e){
        res.status(500).json({message: 'Error interno, no se pudo consultar el cliente'})
    }
})


//POST, nuevo cliente
router.post('/clientes', async function (req, res){
    try {
        const {fechaNacimiento, nombre, apellido, direccion} = req.body;
        const clienteNuevo = await services.nuevoCliente(fechaNacimiento, nombre, apellido, direccion)
        res.json(clienteNuevo)
    }
    catch(e){
        res.status(500).json({message: "Error interno, no se ha podido añadir el nuevo cliente"})
    }
})

//PUT, actualizar datos de un cliente
router.put('/clientes/:id', async function (req,res){
    try {
        const {id} = req.params
    
        //Se permiten null en todos los atributos para un nuevo cliente
        const {fechaNacimiento, direccion, nombre, apellido} = req.body;
        
        //Le pasamos al servicio la fecha de nacimiento en formato Date
        let fechaNacNuevaDate = null;
        if(fechaNacimiento){
            fechaNacNuevaDate = new Date(fechaNacimiento)
        }
        
        //actualizamos
        const clienteActualizado = await services.updateClienteById(id, fechaNacNuevaDate, direccion, nombre, apellido)
        
        //si está actualizado lo devolvemos en la respuesta
        if(clienteActualizado){
            res.json(clienteActualizado);
        }
        //sino se encontró, devolvemos un cod 400
        else{
            res.status(400).json({message: 'Cliente no encontrado'})
        }
    
    }catch(e){
        res.status(500).json({message: 'Error interno, no se pudo actualizar al cliente'})
    }
    
})

//DELETE clientes
router.delete('/clientes/:id', async function(req,res){
    try {
        const {id} = req.params
        const clienteDeleted = await services.eliminarCliente(id);
    
        if(clienteDeleted){
            res.json(clienteDeleted)
        }
        else{
            res.status(400).json({message:'Cliente no encontrado'})
        }
    }catch(e){
        res.status(500).json({message: "Error interno, no se pudo eliminar el cliente"})
    }
    
})
