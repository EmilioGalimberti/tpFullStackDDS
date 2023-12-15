import { useEffect, useState } from "react"
import React from 'react'
import clientes_services from "../../services/clientes_services"
import TablaClientes from "./TablaClientes"
import FiltroClientes from "./FiltroClientes"
import ModCliente from "./ModCliente"

export default function Clientes() {
    const [action, setAction] = useState('C')
    const [rows, setRows] = useState([])
    const [item, setItems] = useState(null)

    useEffect(()=>{
        cargarClientes()
    }, [])

    const cargarClientes = async ()=>{
        const clientes = await clientes_services.getClientesAPI()
        //alert(JSON.stringify(clientes))
        setRows(clientes)
        //alert(toString(clientes))
    }

    const onModificar = async (id) =>{
        //alert(id)
        const cliente = rows.find((cliente)=> cliente.ID_cliente === id) 
        //alert(cliente.nombre)
        setItems(cliente)
        setAction('M')
    }

    const onEliminar = async(id)=>{
        await clientes_services.eliminarClienteAPI(id)
        setAction('C')
        cargarClientes()
    }

    const onConsultar = async (filtro) =>{
        if(filtro){
            const clientes = await clientes_services.getClientesNombreAPI(filtro)
            setRows(clientes)
        }
        else{
            cargarClientes()
        }
        
        setAction('C')
    }

    const onNuevo = ()=>{
        setItems(null)
        setAction('N')
    }

 const onConfirmar = async (cliente)=>{
        if(action === 'N'){
            await clientes_services.nuevoCliente(cliente)
        }
        else if(action === 'M'){
            await clientes_services.modificarCliente(cliente)
        }
        setAction('C')
        cargarClientes()
    }
    

    const onCancelar = ()=>{
        setAction('C')
        cargarClientes()
    }
  return (
    <>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand">Menú de Clientes</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="">Lista de Clientes</a>
      </li>      
    </ul>
    
  </div>
</nav>
    { (action === 'C') && (
        <div>
            <FiltroClientes onConsultar={onConsultar} onNuevo={onNuevo} ></FiltroClientes>
            <TablaClientes items={rows} onModificar={onModificar} onEliminar={onEliminar} ></TablaClientes>
        </div>
    ) 
    }
    {
        (action !=='C') && (
            <div>
                <ModCliente item={item} onConfirmar={onConfirmar} onCancelar={onCancelar}></ModCliente>
            </div>
        )
    }
    </>

  )
}
