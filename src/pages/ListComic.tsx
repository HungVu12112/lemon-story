import Navbar from "../components/Navbar.tsx";
import {useCategories} from "../hooks/useHome.tsx";
import MangaGrid from "../components/MangaGrid.tsx";
import {useListComic} from "../hooks/useListComic.tsx";
import {useParams} from "react-router-dom";
import Footer from "../components/Footer.tsx";

export function ListComic() {
    const {slug} = useParams<{ slug: string }>();
    const {loading, items, cdn, title} = useListComic(slug)
    const {category} = useCategories()
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Loading...
            </div>
        );
    }
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar category={category}/>
            <main className="max-w-7xl mx-auto px-4 py-6">
                <h2 className="text-xl font-bold mb-4 mt-4">{title}</h2>
                <MangaGrid mangas={items} cdn={cdn}/>
            </main>
            <Footer/>
        </div>
    )
}