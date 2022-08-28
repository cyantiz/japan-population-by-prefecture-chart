import React from "react";
import _ from 'lodash'
import "./style.css";
import Switch from "@/components/common/Switch";
import Button from "@/components/common/Button";
interface PrefecturesProp {
    prefectures: Array<Prefecture>;
    selectedPrefectures: Array<Prefecture>;
    setSelectedPrefectures: (prefectures: Array<Prefecture>) => void;
    setShowPrefectures: (prefectures: Array<Prefecture>) => void;
    addData: (pref: Prefecture) => Promise<void>
}

export default function Prefectures(props: PrefecturesProp) {
    const handleToggle = async (pref: Prefecture) => {
        const newSelectedPrefecture = _.xor(props.selectedPrefectures, [pref]);
        props.setSelectedPrefectures(newSelectedPrefecture);
        await props.addData(pref);
        props.setShowPrefectures(newSelectedPrefecture);
    };
    const handleToggleOffAll = () => {
        const { setSelectedPrefectures } = props;
        setSelectedPrefectures([]);
    }

    return (
        <>
            <ul className="prefecture-list">
                {props.prefectures.map((prefecture: Prefecture) => {
                    return (
                        <li key={prefecture.prefCode} className="prefecture-list__item">
                            <Switch
                                checked={_.includes(props.selectedPrefectures, prefecture)}
                                onChange={() => handleToggle(prefecture)}
                            />
                            {prefecture.prefName}
                        </li>
                    );
                })}
            </ul>
            <div className="buttons-wrapper flex">
                <div className="toggle-off-all-btn">
                    <Button onClick={handleToggleOffAll}>
                        Toggle Off All
                    </Button>
                </div>
            </div>
        </>

    );
}
