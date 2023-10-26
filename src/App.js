// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/main/Header';
import Footer from './component/main/Footer';
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
// import { Cookies, useCookies } from 'react-cookie';
import DoitBatchDetail from './component/DoitBatchDetail';
import Collect from './component/bookAdmin/Collect';
import CollectDetail from './component/bookAdmin/CollectDetail';
import LibraryAdmin from './pages/LibraryAdmin';
import Library from './pages/Library';
import Books from './component/bookAdmin/Books';
import BookDetail from './component/bookAdmin/BookDetail';
import Report from './component/book/Report';
import Suggest from './pages/Suggest';
import SuggestDetail from './component/suggest/SuggestDetail';
import Coupon from './pages/Coupon';
import CouponAdmin from './pages/CouponAdmin';

function App() {
  // const [user, setUser] = useCookies({
  //   userid:'',
  //   password:'',
  //   name:'',
  //   grade:''
  // });

  // const [isLogin, setIsLogin] = useState(false);
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
              <Route path="/schedule/new" element={<ScheduleDetail />} />
              <Route path='/schedule/:id' element={<ScheduleDetail />} />
              <Route path="/doit" element={<Doit user={user} />} />
              <Route path="/doit/batch" element={<DoitBatch user={user} />} />
              <Route path="/doit/batch/new" element={<DoitBatchDetail />} />
              <Route path='/doit/batch/:id' element={<DoitBatchDetail />} />
              <Route path="/library" element={<Library user={user} />} />
              <Route path="/library/report/:id/:userid" element={<Report user={user} />} />  {/* 선택한 책id */}
              <Route path="/library/admin" element={<LibraryAdmin />} />
              <Route path="/library/admin/books" element={<Books />} />
              <Route path="/library/admin/books/new/:colid" element={<BookDetail />} />
              <Route path="/library/admin/books/:id/:colid" element={<BookDetail />} />
              <Route path="/library/admin/collect" element={<Collect />} />
              <Route path="/library/admin/collect/new" element={<CollectDetail />} />
              <Route path="/library/admin/collect/:id" element={<CollectDetail />} />
              <Route path="/suggest" element={<Suggest user={user} />} />
              <Route path="/suggest/new" element={<SuggestDetail user={user} />} />
              <Route path="/coupon" element={<Coupon user={user} />} />
              <Route path="/coupon/admin" element={<CouponAdmin />} />
            </Routes>
              {/* <Route path='/board/:id' element={
                    isAuth ? <BoardDetail userInfo={userInfo} /> : <LoginMsg /> }/> */}
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
