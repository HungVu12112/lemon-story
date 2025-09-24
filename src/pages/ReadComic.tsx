import {useLocation} from "react-router-dom";
import {useReadComic} from "../hooks/useReadComic.tsx";

export function ReadComic() {
    const location = useLocation();
    const api = (location.state as { api: string } | null)?.api;

    const {chapter, cdn, loading} = useReadComic(api)

    if (!api) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-red-500">
                Không có API chương được truyền sang
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-white">
                Đang tải chương...
            </div>
        );
    }

    if (!chapter) {
        return (
            <div className="flex justify-center items-center h-screen bg-black text-red-500">
                Không tìm thấy dữ liệu
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white">
            <div className="sticky top-0 bg-black/80 backdrop-blur text-center py-3 z-10">
                <h1 className="text-xl font-bold">{chapter.comic_name}</h1>
                <p>Chap {chapter.chapter_name}</p>
            </div>

            <div className="flex flex-col items-center gap-4 p-4">
                {chapter.chapter_image.map((img) => (
                    <img
                        key={img.image_page}
                        src={`${cdn}/${chapter.chapter_path}/${img.image_file}`}
                        alt={`Trang ${img.image_page}`}
                        className="w-full max-w-4xl object-contain"
                        loading="lazy"
                    />
                ))}
            </div>
        </div>
    );
}
