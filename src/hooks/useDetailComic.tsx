import {useEffect, useState} from "react";
import {getMangaDetail} from "../services/ApiService.tsx";

type RawChapterData = {
    filename: string;
    chapter_name: string;
    chapter_title?: string;
    chapter_api_data: string;

};

type RawChapterServer = {
    server_name: string;
    server_data: RawChapterData[];
};

type ChapterFlat = {
    serverName: string;
    filename: string;
    name: string;
    title?: string;
    apiData: string;
    updatedAt?: string;
    view?: number;
    user?: string;
};

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface MangaItem {
    _id: string;
    name: string;
    slug: string;
    origin_name: string[];
    content: string;
    status: string;
    thumb_url: string;
    author: string[];
    category: Category[];
    chapters?: RawChapterServer | RawChapterServer[] | null;
    updatedAt: string;
}

export function useDetailComic(id: string | undefined) {
    const [manga, setManga] = useState<MangaItem | null>(null);
    const [chaptersFlat, setChaptersFlat] = useState<ChapterFlat[]>([]);
    const [cdn, setCdn] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        (async () => {
            try {
                const res = await getMangaDetail(id);
                const item: MangaItem = res?.data?.item;
                const appCdn: string = res?.data?.APP_DOMAIN_CDN_IMAGE ?? "";
                if (!item) {
                    new Error("API trả về không có item");
                }
                setManga(item);
                setCdn(appCdn);
                const rawChapters = item.chapters;
                let flat: ChapterFlat[] = [];

                if (rawChapters) {
                    if (Array.isArray(rawChapters)) {
                        flat = rawChapters.flatMap((server) =>
                            (server.server_data ?? []).map((d) => ({
                                serverName: server.server_name,
                                filename: d.filename,
                                name: d.chapter_name,
                                title: d.chapter_title,
                                apiData: d.chapter_api_data,
                            }))
                        );
                    } else {
                        const server = rawChapters as RawChapterServer;
                        flat = (server.server_data ?? []).map((d) => ({
                            serverName: server.server_name,
                            filename: d.filename,
                            name: d.chapter_name,
                            title: d.chapter_title,
                            apiData: d.chapter_api_data,
                        }));
                    }
                }

                setChaptersFlat(flat);
            } catch (err: unknown) {
                console.error("Lỗi khi load chi tiết:", err);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);
    return {manga, chaptersFlat, cdn, loading, error};
}