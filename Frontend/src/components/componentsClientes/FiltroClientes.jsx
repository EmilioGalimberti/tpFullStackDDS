import React from 'react'
import {useForm} from 'react-hook-form'

export default function FiltroClientes({ onConsultar, onNuevo}) {
    const {register, handleSubmit} = useForm()
    //const [nombre, setNombre] = useState('')

  const onSubmit = (data)=>{
    if(data.nombre || data.apellido){
      onConsultar(data)
    }
    else{
      onConsultar()
    }
   
  }
  return (
    <>
    <div className='row'>
        <div className='col-6'>
            <div className='card'>
                <div className='card-body d-flex align-items-center'>
                    

                        <h5 className='card-title'>Filtrar por nombre:</h5>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className='form-row'>
                            <div className='col'>
                                <input className="form-control mr-sm-2"  type="text" placeholder="Nombre" aria-label="Search"
                                {...register('nombre')} />
                            </div>
                              <div className='col'>
                                <input type="text" className='form-control' placeholder='Apellido' 
                                {...register('apellido')} />
                              </div>
                              <div className='col'>
                                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Filtrar</button>
                              </div>
                             
                          </div>
                       
                        </form>
                        
                        <div>
                          <button className='btn btn-primary' type='button' onClick={()=>onNuevo()}>Nuevo Cliente</button>
                        </div>
                
                        
                    
                    
                </div>
                
               
            </div>
        </div> 
    </div>
   
    </>
    
  )
}
