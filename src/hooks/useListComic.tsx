import {useEffect, useState} from "react";
import {getListComic} from "../services/ApiService.tsx";

interface MangaItem {
    _id: string;
    name: string;
    slug: string;
    thumb_url: string;
    status: string;
    category: Category[];
    updatedAt: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
}

export function useListComic(slug: string | undefined) {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<MangaItem[]>([]);
    const [cdn, setCdn] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        if (!slug) return;
        const fetchData = async () => {
            setLoading(true);
            getListComic(slug).then((data) => {
                setItems(data.data.items);
                setCdn(data.data.APP_DOMAIN_CDN_IMAGE);
                setTitle(data.data.seoOnPage.titleHead)
            }).catch(
                console.error
            )
                .finally(() => setLoading(false))
        }
        fetchData();
    }, [slug]);
    return {loading, items, cdn, title};
}