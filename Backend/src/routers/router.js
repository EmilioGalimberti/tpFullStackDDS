import express from "express";

import albumesServices from "../services/albumesServices.js";

const routerAlbum = express.Router()

routerAlbum.get('/albumes', async(req,res)=>{
    try{
        const albumes = await albumesServices.getAll()
        if(albumes){
            res.json(albumes)
        }else{
            res.status(400).json({message: 'no se encontro'})
        }
    }
    catch(e){
        res.status(500).json({message: 'no se pudo realizar la operacion'})
    }
})

routerAlbum.get('/albumes/:nombre',async(req,res)=>{
    try{
        const nombre = req.params.nombre
        const album = await albumesServices.getAlbumes(nombre)
        if(album){
            res.json(album)
        }else{
            res.status(404).json({message: 'No encontrado'})
        }
    }
    catch(e){
        res.status(500).json({message: 'no se pudo realizar la operacion'})
    }
})

routerAlbum.get('/albumes/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const album = await albumesServices.getAlbumById(id)
        if(album){
            res.json(album)
        }else{
            res.status(404).json({message: 'No encontrado'})
        }
    }
    catch(e){
        res.status(500).json({message: 'no se pudo realizar la operacion'})
    }
})

routerAlbum.post('/albumes', async(req,res)=>{
    try{
        const data = req.body
        const nuevoAlbum = await albumesServices.addAlbum(data)
        res.json(nuevoAlbum)
    }
    catch(e){
        res.status(500).json({message: 'no se pudo realizar la opereacion'})
    }
})

routerAlbum.delete('/albumes/:id',async(req,res)=>{
    try{
        const id = req.params.id
        const albumD = await albumesServices.revomeAlbumById(id)
        if(albumD){
            res.json(albumD)
        }else{
            res.status(400).json({message: 'No encontrado'})
        }
    }
    catch(e){
        res.status(500).json({message: 'no se pudo realizar la operacion'})
    }
})

routerAlbum.put('/albumes/:id', async(req,res)=>{
    try{
        console.log('put')
        const id = req.params.id
        const data = req.body
        const albumActualizado = await albumesServices.updateAlbumById(id,data)
        if(albumActualizado){
            res.json(albumActualizado)
        }else{
            res.status(404).json({message: 'No encontrado'})
        }
    }
    catch(e){
        res.status(500).json({message: 'no se pudo realizar la operacion'})
    }
})

export default{routerAlbum}