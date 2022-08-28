import React, { useEffect, useState } from "react";
import "./style.css";
import { getAllPrefecture } from "@/utils/api";
import Prefectures from "@/components/Population/Prefectures";
import Chart from "@/components/Population/Chart";
export default function Population() {
    const [prefectures, setPrefectures] = useState(Array<Prefecture>());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedPrefecture, setSelectedPrefecture] = useState(
        Array<number>()
    );

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await getAllPrefecture();
                console.log(result);
                setPrefectures(result);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Population</h1>
            {loading && <div>Loading...</div>}
            {error && <div>Error</div>}
            <div className="flex">
                <div className="prefecture-list-wrapper">
                    {!loading && !error && (
                        <Prefectures
                            prefectures={prefectures}
                            selectedPrefecture={selectedPrefecture}
                            setSelectedPrefecture={setSelectedPrefecture}
                        />
                    )}
                </div>
                <div className="chart-wrapper">
                    <Chart />
                </div>
            </div>
        </div>
    );
}
