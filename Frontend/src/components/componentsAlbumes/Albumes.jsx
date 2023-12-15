import React, { useEffect, useState } from 'react'
import ConsultarAlbumes from './ConsultarAlbumes.jsx'
import Form from './Form.jsx'
import { deleteAlbumesApi, getAlbumesApi, putAlbumById } from '../../services/albumesService.js'
import TablaAlbumes from './TablaAlbumes.jsx'
import { postAlbumesApi } from '../../services/albumesService.js'
import { GetAlbumesByNombre } from '../../services/albumesService.js'


export default function Albumes() {
  
const [accion,setAccion] = useState("C")
const [rows,setRows] = useState([])
const [itemS,setItem] = useState(null)

const onConsultar = async function (filtro) {
  if(filtro == ''){
    cargarAlbumes()
  }else
{ const album = await GetAlbumesByNombre(filtro)
  if (album == false){
    setRows([])
  }else{
  setRows(album)
  console.log(album)
  setAccion('C')}}
}

const onBorrar = async (item) =>{
  const confirmarDelete = window.confirm('Estas seguro que deseas borrar este Album')
  if (confirmarDelete){
    alert('Album borrado')
    await deleteAlbumesApi(item)
    await cargarAlbumes()
    setAccion('C')
  }else{
    await cargarAlbumes()
    setAccion('C')
  }
}


const onEditar = (item) =>{
  setItem(item)
  setAccion('E')
}

const onSubmit = async (dataForm) => {
  setAccion('C')
  console.log(dataForm)
  alert('Formulario cargado')
  await postAlbumesApi(dataForm)
  await cargarAlbumes()
  console.log(rows)
}

const onSubmitEdit = async(dataForm) =>{
  setAccion('C')
  alert('Album Editado')
  await putAlbumById(itemS.id,dataForm)
  await cargarAlbumes()
}

useEffect(()=>{
  cargarAlbumes()
},[])

const onCancelar = () =>{
  setAccion('C')
}

const cargarAlbumes = async function (){
const albumes = await getAlbumesApi()
setRows(albumes)
}

const onNuevo = () => {
  setAccion('N')
  setItem(null)
}

  return (
    <>
    {accion == "C" && (
    <div>
      <div></div>
      <ConsultarAlbumes onConsultar={onConsultar} onNuevo={onNuevo}></ConsultarAlbumes>
      <TablaAlbumes items={rows} onBorrar={onBorrar} onEditar={onEditar}></TablaAlbumes>
    </div>    
    )}
    {accion == 'N' && (
    <div>
      <Form onCancelar={onCancelar} onSubmit={onSubmit} item={itemS} ></Form>
    </div>)}
    {accion == 'E' && (
    <div>
      <Form onCancelar={onCancelar} onSubmit={onSubmitEdit} item= {itemS}></Form>
    </div>)}
    </>
    
  )
}
