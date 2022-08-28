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
            <ResponsiveContainer width="99%" height={500}>
                <LineChart
                    data={props.data}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis domain={[0, 15000000]} />
                    <Legend
                        layout="horizontal"
                        verticalAlign="bottom"
                        align="right"
                    />
                    <Tooltip />
                    {props.showPrefectures.map((prefecture: Prefecture) => {
                        return (
                            <Line
                                type="monotone"
                                dataKey={prefecture.prefName}
                                stroke={colors[prefecture.prefCode]}
                                key={prefecture.prefName}
                                dot={false}
                            >
                            </Line>
                        );
                    })}
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}
