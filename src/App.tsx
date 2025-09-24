import './App.css'
import {Home} from "./pages/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {DetailComic} from "./pages/DetailComic.tsx";
import {ReadComic} from "./pages/ReadComic.tsx";
import {ListComic} from "./pages/ListComic.tsx";
import {SearchComic} from "./pages/SearchComic.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/truyen-tranh/:id" element={<DetailComic/>}/>
                <Route path="/truyen-tranh" element={<ReadComic/>}/>
                <Route path="/the-loai/:slug" element={<ListComic/>}/>
                <Route path="/tim-kiem" element={<SearchComic/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
