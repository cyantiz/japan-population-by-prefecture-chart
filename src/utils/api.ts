import axios from "axios";

// get prefecture list
export async function getAllPrefecture() {
    try {
        return axios.get("/prefectures").then((res) => res.data.result);
    } catch (err) {
        console.log(err);
        alert("エラーが発生しました");
    }
}

// get population number of prefecture by prefCode, if prefCode == 0, return data of the country
export async function getNumberOfPopulation(prefCode: number) {
    try {
        return axios
            .get(`/population/composition/perYear?prefCode=${prefCode}`)
            .then((res) => res.data.result.data[0].data);
    } catch (err) {
        console.log(err);
        alert("エラーが発生しました");
    }
}
