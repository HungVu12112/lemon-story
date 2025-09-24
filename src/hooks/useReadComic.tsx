import {useEffect, useState} from "react";

interface ChapterImage {
    image_page: number;
    image_file: string;
}

interface ChapterData {
    _id: string;
    comic_name: string;
    chapter_name: string;
    chapter_title: string;
    chapter_path: string;
    chapter_image: ChapterImage[];
}

interface ApiResponse {
    data: {
        domain_cdn: string;
        item: ChapterData;
    };
}

export function useReadComic(api: string | undefined) {

    const [chapter, setChapter] = useState<ChapterData | null>(null);
    const [cdn, setCdn] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!api) return;

        const fetchChapter = async () => {
            try {
                setLoading(true);
                const res = await fetch(api);
                const json: ApiResponse = await res.json();
                setChapter(json.data.item);
                setCdn(json.data.domain_cdn);
            } catch (err: unknown) {
                console.error("Lỗi khi load chapter:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchChapter();
    }, [api]);
    return {chapter, cdn, loading};
}