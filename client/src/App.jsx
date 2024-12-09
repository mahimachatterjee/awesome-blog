import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Overview from './components/Overview';
import NewBlog from './components/NewBlog';
import About from './components/About';
import { BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}// export default function App(){
//   return<>
//   </>
// }

// import { Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Overview from './components/Overview';
// import NewBlog from './components/NewBlog';
// import About from './components/About';  // You can define this component similarly

// export default function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         <Route path="/" element={<Overview />} />
//         <Route path="/new-blog" element={<NewBlog />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </>
//   );
// }
