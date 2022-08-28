import axios from "axios";

export function getAllPrefecture() {
    try {
        return axios.get('/prefectures').then(res => res.data.result);
    }
    catch (err) {
        console.log(err);
        alert('エラーが発生しました');
    }
}