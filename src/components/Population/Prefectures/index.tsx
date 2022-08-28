import React from "react";
import "./style.css";
import Switch from "@/components/common/Switch";
import _ from 'lodash'
import Button from "@/components/common/Button";
interface PrefecturesProp {
    prefectures: Array<Prefecture>;
    selectedPrefecture: Array<number>;
    setSelectedPrefecture: (prefCode: number[]) => void;
}

export default function Prefectures(props: PrefecturesProp) {
    const handleToggle = (prefCode: number) => {
        const { selectedPrefecture, setSelectedPrefecture } = props;
        const newSelectedPrefecture = _.xor(selectedPrefecture, [prefCode]);
        setSelectedPrefecture(newSelectedPrefecture);
    };
    const handleToggleOffAll = () => {
        const { setSelectedPrefecture } = props;
        setSelectedPrefecture([]);
    }

    return (
        <>
            <ul className="prefecture-list">
                {props.prefectures.map((prefecture: Prefecture) => {
                    return (
                        <li key={prefecture.prefCode} className="prefecture-list__item">
                            <Switch
                                checked={props.selectedPrefecture.includes(prefecture.prefCode)}
                                onChange={() => handleToggle(prefecture.prefCode)}
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
