import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from './Views/Landing/Landing';
import Home from './Views/Home/Home';
import Form from './Views/Form/CreateActivity';
import DetailPage from './Components/DetailPage/DetailPage'

export default function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/Form' element={<Form />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </div>
  );
}