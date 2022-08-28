import React from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "./style.css";
import _ from "lodash";
import colors from "@/utils/colors";

interface PopulationChartProps {
    showPrefectures: Prefecture[];
    data: ChartDataPoint[];
}

export default function PopulationChart(props: PopulationChartProps) {
    return (
        <>
            {/* {props.data.length && ( */}
                <ResponsiveContainer width="99%" height={1000}>
                    <LineChart
                        data={props.data}
                        margin={{ top: 5, right: 40, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {props.showPrefectures.map((prefecture: Prefecture) => {
                            return (
                                <Line
                                    type="monotone"
                                    dataKey={prefecture.prefName}
                                    stroke={colors[prefecture.prefCode]}
                                    key={prefecture.prefName}
                                />
                            );
                        }
                        )}
                    </LineChart>
                </ResponsiveContainer>
            {/* )} */}
        </>
    );
}