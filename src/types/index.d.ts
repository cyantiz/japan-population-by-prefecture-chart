interface Prefecture {
    prefCode: number;
    prefName: string;
}
interface ChartDataPoint {
    year: number;
    [key: string]: number;
}