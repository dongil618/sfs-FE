import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './component/Header';
import Home from './page/Home';
import Product from './page/Product';
import GetProducts from './page/GetProducts';
import SaveProducts from './page/SaveProducts';

function App() {
  const menu_list = [
    { id: 1, title: "상품등록", link: "/product" },
  ];

  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          <Header menu_list={menu_list} />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/product' element={<Product />}></Route>
            <Route path='/products' element={<GetProducts />}></Route>
            <Route path='/products/save' element={<SaveProducts />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
