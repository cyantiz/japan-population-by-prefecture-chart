import axios from "axios";

export function getAllPrefecture() {
    return axios.get('/prefectures').then(res => res.data.result);
}