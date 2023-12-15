import React from 'react'
import {useForm} from 'react-hook-form'

export default function EditAlumnoForm({onCancelar,item, onSubmit}) {
    const {register, handleSubmit,formState: {errors}} = useForm()

    return (
    <>
     <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" className="form-control" id="nombre" aria-describedby="emailHelp" defaultValue={item.nombre} {...register('nombre', {required:'El campo es requerido'})} />
        {errors.nombre && <p>{errors.nombre.message} </p>}
      </div>
      <div className="form-group">
        <label htmlFor="edad">Edad:</label>
        <input type="number" className="form-control" id="edad" aria-describedby="emailHelp" defaultValue={item.edad}{...register('edad', {required:'El campo es requerido'})} />
        {errors.edad && <p>{errors.edad.message} </p>}
      </div>
      <button type="button" className="btn btn-secondary" onClick={()=>{onCancelar()}}>Cancelar</button>
      <button type="submit" className="btn btn-primary">Enviar</button>
    </form>
    </>
  )
}
