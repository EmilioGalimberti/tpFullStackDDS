import React, { useState } from 'react'
import {useForm} from 'react-hook-form'
export default function ModCliente({item, onConfirmar, onCancelar}) {
  const [ID_cliente, setID]= useState('ID')
  const [nombre, setNombre] = useState('Nombre')
  const [direccion, setDir] = useState('Direccion')
  const [apellido, setApe] = useState('Apellido')
  const [fechaNacimiento, setFecha] = useState('')


  const {register, handleSubmit, formState:{errors}} = useForm({values:item})
  
  return (
    <form onSubmit={handleSubmit(onConfirmar)}>
  <div class="form-group">
    <h5 className='card-title'>{item === null? 'Nuevo Cliente':'Modificar cliente'} </h5>
    <label for="nombre">Nombre</label>
    <input type="text" class="form-control" id="nombre" 
    //value={item === null ? nombre : item.nombre}
    {...register('nombre', {required:'El campo nombre es requerido'})}
    onChange={(e)=>setNombre(e.target.value)} />
    <p>
      {errors.nombre && errors.nombre.message}
    </p>
    
  </div>
  <div class="form-group">
    <label for="apellido">Apellido</label>
    <input type="text" class="form-control" id="apellido" 
  //value={item === null ? apellido : item.apellido}
    {...register('apellido',{required:'El campo Apellido es requerido'})} 
    onChange={(e)=>setApe(e.target.value)}/>
    <p>
      {errors.apellido && errors.apellido.message}
    </p>
    
  </div>
  <div class="form-group">
    <label for="direccion">Direccion</label>
    <input type="text" class="form-control" id="direccion" 
    {...register('direccion', {required: 'El campo Dirección es requerido'})}
    onChange={(e)=>setDir(e.target.value)} />
    <p>
      {errors.direccion && errors.direccion.message}
    </p>
    
    
  </div>


  <div class="form-group">
    <label for="fechaNacimiento">Fecha de Nacimiento</label>
    <input type="text" class="form-control" id="fechaNacimiento" 
  //value={item === null ? fechaNacimiento : item.fechaNacimiento}
    {...register('fechaNacimiento', {/*required:'el campo Fecha de Nacimiento es requerido'*/})}
    onChange={(e)=>setFecha(e.target.value)} />
    { /*
      <p>{errors.fechaNacimiento && {errors.fechaNacimiento.message}}</p> 
  */}
      
    
    
  </div>
  <div>
  <button type="submit" class="btn btn-primary">Aceptar</button>
  <button type='button' className='btn btn-secondary' onClick={()=>onCancelar()}>Cancelar</button>
  </div>


</form>
  )
}
