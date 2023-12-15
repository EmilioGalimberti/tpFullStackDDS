
import { Cliente } from "../models/clientes.js";
import {Op} from 'sequelize'

//obtener 1 cliente
async function getClienteById(id_){
    return await Cliente.findOne({where:{ID_cliente:id_}})
     
}

async function getClienteByNombre(nombre, apellido){
    console.log(`nombre: ${nombre}, apellido:${apellido}`)
    let clienteEncontrado;
    if((nombre === undefined && apellido !== undefined) || (nombre !== undefined && apellido === undefined) ){
        console.log('entro por el OR')
        clienteEncontrado = await Cliente.findAll({
            where:{
                [Op.or]:[
                    {
                        nombre:{
                            [Op.like]:`%${nombre}%`
                        }
    
                },{
                    apellido:{
                        [Op.like]:`%${apellido}%`
                    }
                }]
            }
        })
            
    }
    else if(nombre && apellido){
        console.log('entro por el AND')
        clienteEncontrado= await Cliente.findAll({
            where:{
                [Op.and]:[
                    {
                        nombre:{ [Op.like]: `%${nombre}%`}
                    },
                    {
                        apellido:{ [Op.like]: `%${apellido}%`}
                    }
                ]
            }
        })
    }
    
    
    if(clienteEncontrado){
        return clienteEncontrado
    }
    else{
        return null
    }
}

//agregar un nuevo cliente
async function nuevoCliente(fechaNacimiento = null, nombre = null, apellido = null, direccion = null) {
        const clienteNuevo = await Cliente.create({
            nombre,
            apellido,
            fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento) : null,
            direccion,
        });

        return clienteNuevo;
}


//actualizar cliente por id
async function updateClienteById(id, fechaNacNueva = null, dirNueva = null, nomNuevo = null, apeNuevo = null){
    const cliente = await getClienteById(id);
    
    if(cliente){
        //modificamos cada uno según aparezca

        //fecha de nacimiento nueva
        if(fechaNacNueva instanceof Date){
            cliente.fechaNacimiento = fechaNacNueva
        }

        //direccion nueva
        if(typeof dirNueva == 'string'){
            cliente.direccion = dirNueva
        }
        //nombre nuevo
        if(typeof nomNuevo == 'string'){
            cliente.nombre = nomNuevo
        }
        //apellido nuevo
        if (typeof apeNuevo === 'string') {
            cliente.apellido = apeNuevo;
        } 
        await cliente.save()
        return cliente
    }

}
 

//Eliminar un cliente
async function eliminarCliente(id){
    const cliente = await Cliente.findOne({where:{ID_cliente:id}})
    if(cliente){
        const clienteEliminado = await cliente.destroy();
        return clienteEliminado
    }
}

export default {
    updateClienteById,
    getClienteById,
    nuevoCliente,
    eliminarCliente,
    getClienteByNombre
}