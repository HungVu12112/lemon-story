import {useEffect, useState} from "react";
import {getCategory, getHomeData, searchComic} from "../services/ApiService.tsx";
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
export function useHome(){
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<string[]>([]);
    const [items, setItems] = useState<MangaItem[]>([]);
    const [cdn, setCdn] = useState<string>("");
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            getHomeData().then((data) => {
                setImages(
                    data.data.seoOnPage.og_image.map(
                        (img: string) => `${data.data.APP_DOMAIN_CDN_IMAGE}${img}`
                    )
                );
                setItems(data.data.items);
                setCdn(data.data.APP_DOMAIN_CDN_IMAGE);
            }).catch(
                console.error
            )
                .finally(() => setLoading(false))
        }
        fetchData();
    }, []);
    return {loading,images,items,cdn};
}
export function useCategories(){
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<Category[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            getCategory().then((data) => {
                setCategory(data.data.items);
            }).catch(
                console.error
            )
                .finally(() => setLoading(false))
        }
        fetchData();
    }, []);
    return {loading,category};
}
export  function useSearchComic(keyword: string| undefined){
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<MangaItem[]>([]);
    const [cdn, setCdn] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    useEffect(() => {
        if (!keyword) return;
        const fetchData = async () => {
            setLoading(true);
            searchComic(keyword).then((data) => {
                setItems(data.data.items);
                setCdn(data.data.APP_DOMAIN_CDN_IMAGE);
                setTitle(data.data.seoOnPage.titleHead);
            }).catch(
                console.error
            )
                .finally(() => setLoading(false))
        }
        fetchData();
    }, [keyword]);
    return{loading,items,cdn,title};
}