import axios from "axios";


const API_BASE_URL = 'http://localhost:3000'

async function getClientesAPI(){
    try{
        const response = await axios.get(`${API_BASE_URL}/api/clientes`)
        //alert(JSON.stringify(response))
        return response.data
    }
    catch(e){
        console.error({message: 'Error al realizar la petición HTTP', e})
    }
}

//Filtro
async function getClientesNombreAPI(filtro){
    try{
        let parametros = {};
        if(filtro.nombre && filtro.apellido){
            parametros={
                nombre: filtro.nombre,
                apellido: filtro.apellido
            }
        }

        else if(filtro.apellido){
            parametros={
                apellido: filtro.apellido
            }
        }

        else if(filtro.nombre){
            parametros={
                nombre: filtro.nombre
            }
        }

        const response = await axios.get(`${API_BASE_URL}/api/clientes/filtro`, 
        {params:
        parametros})
        //alert(JSON.stringify(response))
        return response.data
    }
    catch(e){
        console.error({message: 'Error al realizar la petición HTTP', e})
    }
}

const eliminarClienteAPI = async (id)=>{
    try{
        const response = await axios.delete(`${API_BASE_URL}/api/clientes/${id}`)
        return response.data
    }
    catch(e){
        console.error({message: 'Error al realizar la petición HTTP', e})
    }
}

const nuevoCliente = async (cliente)=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/api/clientes`, cliente)
        return response.data
    }
    catch(e){
        console.error({message:'Error al realizar la petición HTTP'}, e)
    }
}

const modificarCliente = async(cliente)=>{
    try{
        const response = await axios.put(`${API_BASE_URL}/api/clientes/${cliente.ID_cliente}`, cliente)
        return response.data
    }
    catch(e){
        console.error({message: 'Error al realizar la petición HTTP', e})
    }
}

export default {getClientesAPI, eliminarClienteAPI, getClientesNombreAPI, nuevoCliente, modificarCliente}