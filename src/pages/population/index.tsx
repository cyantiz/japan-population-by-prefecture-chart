import React from "react";
import "./style.css";
import { getAllPrefecture, getNumberOfPopulation } from "@/utils/api";
import Prefectures from "@/components/Population/PrefectureList";
import PopulationChart from "@/components/Population/Chart";
import MenuIcon from '@/assets/menu-icon.svg'
import _ from "lodash";

export default function Population() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isError, setIsError] = React.useState(false);
    const [isShowListMobile, setIsShowListMobile] = React.useState(false);

    // store population data get from api
    const [chartData, setChartData] = React.useState<ChartDataPoint[]>([]);

    // store list of prefecture (include name and code)
    const [prefectures, setPrefectures] = React.useState<Prefecture[]>([]);

    // store list of  selected prefecture (change when user toggle the prefecture)
    const [selectedPrefectures, setSelectedPrefecture] = React.useState<Prefecture[]>([]);

    // store list of prefecture that is currently showing on the chart
    const [showPrefectures, setShowPrefectures] = React.useState<Prefecture[]>([]);

    // store list of prefecture that is loaded and has been stored in chartData
    // => in order to prevent duplicate loading of data
    const [loadedPrefectures, setLoadedPrefectures] = React.useState<Prefecture[]>(
        []
    );

    /* FLOW: 
        * RUN ON INITIAL (useEffect)
            + check if data is existed in localStorage, if existed -> use it
            + get all prefecture data from api => store in prefectures
        * EVENT: user toggle [ON] a prefecture:
            + add prefecture to selectedPrefectures
            + load data for the prefecture if it is not loaded yet (using function addData)
            + add data to chartData
            + add prefecture to showPrefectures
        * EVENT: user toggle [OFF] a prefecture
            + remove prefecture from selectedPrefectures
            + remove prefecture from showPrefectures
            (data still in chartData)
    */

    React.useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // get data from localStorage, if it is not exist, get from api
                const numberOfPref = 47;
                let prefs = JSON.parse(
                    localStorage.getItem("prefectures") || "[]"
                );
                if (!prefs || prefs.length !== numberOfPref) {
                    prefs = await getAllPrefecture();
                    setPrefectures(prefs);
                    localStorage.setItem("prefectures", JSON.stringify(prefs));
                } else {
                    setPrefectures(prefs);
                }

                const chartData = JSON.parse(
                    localStorage.getItem("chartData") || "[]"
                );
                if (chartData.length > 0) {
                    setChartData(chartData);
                    
                    const loadedPrefs = JSON.parse(
                        localStorage.getItem("loadedPrefectures") || "[]"
                    );

                    if (loadedPrefs.length > 0) {
                        setLoadedPrefectures(loadedPrefs);
                    }
                } else {
                    // init data for chartData
                    const firstYearInData = 1960;
                    const lastYearInData = 2045;
                    const tmpData = [];
                    
                    for ( let year = firstYearInData; year <= lastYearInData; year += 5) {
                        tmpData.push({ year });
                    }
                    setChartData(tmpData);
                }
            } catch (e) {
                setIsError(true);
                localStorage.clear();
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const addData = async (pref: Prefecture) => {
        // check if data is already loaded, if not, load data from api
        if (loadedPrefectures.includes(pref)) {
            return;
        }
        let newChartData = chartData;
        let prefPopulation = await getNumberOfPopulation(pref.prefCode);
        prefPopulation = _.map(prefPopulation, (item: any) => ({
            year: item.year,
            [pref.prefName]: item.value,
        }));
        newChartData = _.merge(newChartData, prefPopulation);
        setChartData(newChartData);
        setLoadedPrefectures([...loadedPrefectures, pref]);
        localStorage.setItem("chartData", JSON.stringify(newChartData));
        localStorage.setItem("loadedPrefectures", JSON.stringify([...loadedPrefectures, pref])
        );
    };

    const handleToggleListMobile = () => {
        setIsShowListMobile(!isShowListMobile);
    }

    return (
        <div className="population__container">
            <div className="population__navbar">
                <div className="population__navbar__title">
                    <h2>都道府県別の総人口推移グラフ</h2>
                </div>
                <div className="population__navbar__toggle-show-pref-list">
                    <img className="menu-icon" src={MenuIcon} alt="#" onClick={handleToggleListMobile} />
                </div>
            </div>
            {isLoading && <div className="population__loading">Loading...</div>}
            {isError && <div> There is an error. Please refresh the page. </div>}
            {!isLoading && !isError && (
                <>
                    <div className="population__content">
                        <div className={"population__prefecture-list-wrapper" + (isShowListMobile ? " mobile-active" : "") }>
                            <Prefectures
                                prefectures={prefectures}
                                selectedPrefectures={selectedPrefectures}
                                setShowPrefectures={setShowPrefectures}
                                setSelectedPrefectures={setSelectedPrefecture}
                                addData={addData}
                            />
                        </div>
                        <div className="population__chart-wrapper">
                            <PopulationChart
                                showPrefectures={showPrefectures}
                                data={chartData}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
