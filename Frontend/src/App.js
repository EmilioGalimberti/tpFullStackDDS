import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Clientes from './components/componentsClientes/Clientes';
import Home from './components/Home';
import Albumes from './components/componentsAlbumes/Albumes'
import Alumnos from './components/componentsAlumnos/Alumnos';

function App() {
  return (
    <BrowserRouter>
     
     <div className='container'>
        <nav>
          <Link className='btn btn-primary mb-2' to='/'>
             Home 
          </Link>
          <Link className='btn btn-primary mb-2' to='/clientes'>
             Clientes 
          </Link>
          <Link className='btn btn-primary mb-2' to='/alumnos'>
             Alumnos 
          </Link>
          <Link className='btn btn-primary mb-2' to='/albumes'>
             Albumes 
          </Link>
        </nav>
     </div>
      
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/clientes' element={<Clientes></Clientes>}> </Route>
        <Route path='/alumnos' element={<Alumnos></Alumnos>}> </Route>
        <Route path='/albumes' element={<Albumes></Albumes>}></Route>
      </Routes>
    </BrowserRouter>

  
    
  );
}

export default App;
