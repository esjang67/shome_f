// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Header from './component/Header';
import Footer from './component/Footer';
import Schedule from './pages/Schedule';
import { useState } from 'react';
import ScheduleDetail from './component/ScheduleDetail';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [user, setUser] = useState();

  return (

    <div className="App">
      <header>
        <Header />
      </header>
      
      <div className='App-Main'>
        <Routes>
          <Route path="/" element={<Schedule />} />
          <Route path="/doit" element={<Main />} />
          <Route path="/book" element={<Main />} />
          <Route path="/suggest" element={<Main />} />
          <Route path="/coupon" element={<Main />} />
          <Route path="/schedule/new" element={<ScheduleDetail />} />
          <Route path='/schedule/:id' element={<ScheduleDetail />} />
        </Routes>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
