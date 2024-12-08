// export default function App(){
//   return<>
//   </>
// }
jnjnj
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Overview from './components/Overview';
import NewBlog from './components/NewBlog';
import About from './components/About';  // You can define this component similarly

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/new-blog" element={<NewBlog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
