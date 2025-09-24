import Navbar from "../components/Navbar.tsx";
import MangaGrid from "../components/MangaGrid.tsx";
import {useCategories, useSearchComic} from "../hooks/useHome.tsx";
import {useSearchParams} from "react-router-dom";

export function SearchComic() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const {category} = useCategories()
    const {loading, items, cdn, title} = useSearchComic(keyword)
    if (loading) {
        return <div className="text-white text-center mt-10">Đang tìm kiếm...</div>;
    }
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar category={category}/>
            <div className="max-w-7xl mx-auto p-4 mt-8">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                {items.length > 0 ? (
                    <MangaGrid mangas={items} cdn={cdn}/>
                ) : (
                    <p className="text-gray-400">Không tìm thấy kết quả cho "{keyword}"</p>
                )}
            </div>
        </div>
    );
}