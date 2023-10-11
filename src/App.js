// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Nav from './component/Nav';
import Top from './component/Top';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <header>
        <Top />
      </header>
      <div className='App-Main'>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
      <footer>
        <Nav />
      </footer>
    </div>
  );
}

export default App;
