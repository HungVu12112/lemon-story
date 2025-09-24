import axios from "axios";

const API_BASE = "https://otruyenapi.com/v1/api";

export const getHomeData = async () => {
    const response = await axios.get(`${API_BASE}/home`);
    return response.data;
};

export const getMangaDetail = async (id: string) => {
    const response = await axios.get(`${API_BASE}/truyen-tranh/${id}`);
    return response.data;
};
export const getCategory = async () => {
    const response = await axios.get(`${API_BASE}/the-loai`);
    return response.data;
};
export const getListComic = async (slug: string) => {
    const response = await axios.get(`${API_BASE}/the-loai/${slug}`);
    return response.data;
};
export const searchComic = async (keyword: string) => {
    const response = await axios.get(`${API_BASE}/tim-kiem/?keyword=${keyword}`);
    return response.data;
};