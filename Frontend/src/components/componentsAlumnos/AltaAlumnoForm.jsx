import React from 'react'
import {useForm} from 'react-hook-form'

export default function AltaAlumnoForm({onCancelar,onSubmit}) {
  const {register, handleSubmit, formState: {errors}} = useForm()
    return (
    <>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" className="form-control" id="nombre" aria-describedby="emailHelp" placeholder='Nombre del Alumno' {...register('nombre', {required:'El campo es requerido'})} />
                {errors.nombre && <p>{errors.nombre.message} </p>}
            </div>
            <div className="form-group">
                <label htmlFor="edad">Edad:</label>
                <input type="number" className="form-control" id="edad" aria-describedby="emailHelp" placeholder="Edad del Alumno" {...register('edad', {required:'El campo es requerido'})} />
                {errors.edad && <p>{errors.edad.message} </p>}
            </div>
            <div>
                <button onClick={() => {onCancelar()}}>Cancelar</button>
                <button type="submit">Enviar</button>
            </div>
            </form>
        </div>
    </>
  )
}
