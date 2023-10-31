// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Suspense } from 'react';
// import { Cookies, useCookies } from 'react-cookie';

import Header from './component/main/Header';
import Footer from './component/main/Footer';

import Schedule from './pages/Schedule';
import ScheduleDetail from './component/schedule/ScheduleDetail';
import Doit from './pages/Doit';
import Login from './pages/Login';
import Loading from './pages/Loading';
import DoitBatch from './pages/DoitBatch';

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

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DoitBatchDetail from './component/doit/DoitBatchDetail';


function App() {

  const [user, setUser] = useState({
    userid:'',
    password:'',
    name:'',
    grade:''
  });

  const [page, setPage] = useState('schedule');

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
        
        <Header user={user} />

        <article>
          <div className='App-Main'>
            <Routes>
              <Route path="/" element={<Schedule grade={user.grade} />} />
              <Route path="/login" element={<Login user={user} setUser={setUser} setPage={setPage} />} />
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

        <Footer user={user} page={page} setPage={setPage} />

      </Suspense>
    </div>
  );
}

export default App;
