import {Link} from "react-router-dom";
import React from "react";

interface Category {
    _id: string;
    name: string;
    slug: string;
}

interface Manga {
    _id: string;
    name: string;
    slug: string;
    thumb_url: string;
    status: string;
    category: Category[];
    updatedAt: string;
}

interface MangaGridProps {
    mangas: Manga[];
    cdn: string;
}

const MangaGrid: React.FC<MangaGridProps> = ({mangas, cdn}) => {
    if (!mangas || mangas.length === 0) {
        return <p>Đang tải truyện...</p>;
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mangas.map((manga) => (
                <Link key={manga._id} to={`/truyen-tranh/${manga.slug}`} className="block">
                    <div
                        key={manga._id}
                        className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow h-65">
                        <img
                            src={`${cdn}/uploads/comics/${manga.thumb_url}`}
                            alt={manga.name}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-2">
                            <h3 className="text-sm font-semibold line-clamp-1">{manga.name}</h3>
                            <p className="text-xs text-gray-400 line-clamp-2">
                                {manga.category.map((c) => c.name).join(", ")}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default MangaGrid;
