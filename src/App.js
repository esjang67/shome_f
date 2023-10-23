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
import Doit from './pages/Doit';
import { useEffect } from 'react';
import Login from './pages/Login';
import { Suspense } from 'react';
import Loading from './pages/Loading';
import DoitBatch from './pages/DoitBatch';
import { Cookies, useCookies } from 'react-cookie';

function App() {
  // const [user, setUser] = useCookies({
  //   userid:'',
  //   password:'',
  //   name:'',
  //   grade:''
  // });

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    userid:'',
    password:'',
    name:'',
    grade:''
  });

  useEffect(()=> {
    const tmp = JSON.parse(sessionStorage.getItem("user"))
    // const tmp = Cookies.get("user");
    if(tmp !== null){
      setUser(tmp);
      // setIsLogin(true); 
    }
  }, [])

  return (

    <div className="App">
      <Suspense fallback={ <Loading /> }>
        <header>
          <Header user={user} />
        </header>
        <article>
          <div className='App-Main'>
            <Routes>
              <Route path="/" element={<Schedule grade={user.grade} />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} />} />
              <Route path="/doit" element={<Doit user={user} />} />
              <Route path="/doit/batch" element={<DoitBatch user={user} />} />
              <Route path="/book" element={<Main />} />
              <Route path="/suggest" element={<Main />} />
              <Route path="/coupon" element={<Main />} />
              <Route path="/schedule/new" element={<ScheduleDetail />} />
              <Route path='/schedule/:id' element={<ScheduleDetail />} />
            </Routes>
          </div>
        </article>
        <footer>
          <Footer user={user} />
        </footer>
      </Suspense>
    </div>
  );
}

export default App;
