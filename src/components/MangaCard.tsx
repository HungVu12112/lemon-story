import React from "react";
import {Star} from "lucide-react";

interface MangaCardProps {
    title: string;
    cover: string;
    rating: number;
    chapter: string;
    time: string;
}

const MangaCard: React.FC<MangaCardProps> = ({
                                                 title,
                                                 cover,
                                                 rating,
                                                 chapter,
                                                 time,
                                             }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow hover:scale-[1.02] transition">
            <img src={cover} alt={title} className="w-full h-48 object-cover"/>
            <div className="p-2">
                <h3 className="text-sm font-semibold truncate">{title}</h3>
                <div className="flex items-center text-yellow-400 text-xs mt-1">
                    {Array.from({length: 5}).map((_, i) => (
                        <Star
                            key={i}
                            size={14}
                            fill={i < rating ? "yellow" : "none"}
                            stroke="yellow"
                        />
                    ))}
                    <span className="ml-2 text-gray-300">{rating.toFixed(1)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">{chapter}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default MangaCard;
