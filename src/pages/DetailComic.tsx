import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import {useDetailComic} from "../hooks/useDetailComic.tsx";
import {useCategories} from "../hooks/useHome.tsx";

export function DetailComic() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {manga, chaptersFlat, cdn, loading, error} = useDetailComic(id);
    const {category} = useCategories()

    if (loading) {
        return <p className="text-center text-gray-400">Đang tải...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Lỗi: {error}</p>;
    }

    if (!manga) {
        return <p className="text-center text-red-500">Không tìm thấy truyện</p>;
    }
    const parser = new DOMParser();

    return (
        <div className="bg-gray-900 min-h-screen text-gray-200">
            <Navbar category={category}/>
            <div className="container mx-auto p-6">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={`${cdn}/uploads/comics/${manga.thumb_url}`}
                        alt={manga.name}
                        className="w-56 h-80 object-cover rounded-lg shadow-lg"
                    />

                    <div className="flex-1 space-y-3">
                        <h1 className="text-3xl font-bold">{manga.name}</h1>
                        <p>
                            <span className="font-semibold">Thể loại:</span>{" "}
                            {manga.category.map((c) => c.name).join(", ")}
                        </p>
                        <p>
                            <span className="font-semibold">Tác giả:</span>{" "}
                            {manga.author.filter(Boolean).join(", ") || "Đang cập nhật"}
                        </p>
                        <p>
                            <span className="font-semibold">Tình trạng:</span>{" "}
                            {manga.status === "ongoing" ? "Đang tiến hành" : "Hoàn thành"}
                        </p>
                        <p>
                            <span className="font-semibold">Cập nhật:</span>{" "}
                            {new Date(manga.updatedAt).toLocaleString("vi-VN")}
                        </p>
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">Thông tin truyện</h2>
                    {manga.content == "<p>" || manga.content == "</p>" ? ( //// đề phòng trường hợp server trả về dạng html
                        <p className="text-gray-300 whitespace-pre-wrap">{manga.content}</p>
                    ) : (
                        <p className="text-gray-300 whitespace-pre-wrap">{parser.parseFromString(manga.content, "text/html").body.textContent || ""}</p>
                    )}
                    <div className="flex gap-3 mt-4">
                        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
                            Chương đầu
                        </button>
                        <button className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
                            Chương cuối
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Danh sách chương</h2>

                    {chaptersFlat.length === 0 ? (
                        <p className="text-gray-400">Chưa có chương nào</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-700">
                                <tr>
                                    <th className="p-2">Chap</th>
                                    <th className="p-2">Tên file</th>
                                    <th className="p-2">Server</th>
                                    <th className="p-2">API</th>
                                </tr>
                                </thead>
                                <tbody>
                                {chaptersFlat.map((ch, idx) => (
                                    <tr
                                        key={`${ch.apiData}-${idx}`}
                                        className="border-b border-gray-700 hover:bg-gray-800"
                                    >
                                        <td className="p-2 text-blue-400 cursor-pointer hover:underline">
                                            {ch.name}
                                        </td>
                                        <td className="p-2">{ch.filename}</td>
                                        <td className="p-2">{ch.serverName}</td>
                                        <td className="p-2"
                                            onClick={() => navigate("/truyen-tranh", {state: {api: ch.apiData}})}>
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-indigo-400 hover:underline"
                                            >
                                                Đọc
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
