import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './component/Header';
import Home from './page/Home';
import Product from './page/Product';
import GetProducts from './page/GetProducts';
import SaveProducts from './page/SaveProducts';
import Keyword from './page/Keyword';
import Coordie from './page/Coordie';
import Gif from './page/Gif';
import Image from './page/Image';
import Wholesale from './page/Wholesale';

function App() {
  const menu_list = [
    { id: 1, title: "상품등록", link: "/product" },
    { id: 2, title: "키워드 관리", link: "/keyword" },
    { id: 3, title: "이미지 조절", link: "/image" },
    { id: 4, title: "GIF 생성", link: "/gif" },
    { id: 5, title: "코디 관리", link: "/coordie" },
    { id: 6, title: "거래처 관리", link: "/wholesale" },
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
            <Route path='/keyword' element={<Keyword />}></Route>
            <Route path='/image' element={<Image />}></Route>
            <Route path='/gif' element={<Gif />}></Route>
            <Route path='/coordie' element={<Coordie />}></Route>
            <Route path='/wholesale' element={<Wholesale />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
