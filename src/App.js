import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import NotFound from './components/Shared/NotFound';
import RequireAuth from './components/Required/RequirAuth';
import Completed from './components/Secured/Completed';
import ToDo from './components/Secured/ToDo';
import Calender from './components/Pages/Calender';
import AddTask from './components/Secured/AddTask';

function App() {
  return (
    <div className='max-w-7xl mx-auto'>
      <Header></Header>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/calender' element={<Calender />}></Route>
        <Route path='/completed' element={<RequireAuth><Completed></Completed></RequireAuth>}></Route>
        <Route path='/todo' element={<RequireAuth><ToDo></ToDo></RequireAuth>}></Route>
        <Route path='/addtask' element={<RequireAuth><AddTask></AddTask></RequireAuth>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>


      <Footer></Footer>




      <ToastContainer />
    </div>
  );
}

export default App;
