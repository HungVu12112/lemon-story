import Navbar from "../components/Navbar.tsx";
import MangaGrid from "../components/MangaGrid.tsx";
import Carousel from "../components/Carousel.tsx";
import Footer from "../components/Footer.tsx";
import {useCategories, useHome} from "../hooks/useHome.tsx";


export function Home() {
    const {loading, images, cdn, items} = useHome()
    const {category} = useCategories()
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-white">
                Loading...
            </div>
        );
    }
    return (
        <div className="bg-gray-900 min-h-screen w-full overflow-x-hidden text-white">
            <Navbar category={category} />
            <main className="max-w-7xl mx-auto px-4 py-6">
                {images.length > 0 && <Carousel images={images}/>}
                <h2 className="text-xl font-bold mb-4 mt-4">TRUYỆN TRANH</h2>
                <MangaGrid mangas={items} cdn={cdn}/>
            </main>
            <Footer/>
        </div>
    )
}