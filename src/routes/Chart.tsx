import ApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';

interface ChartProps {
	coinId: string;
}

interface Historical {
	time_open: number;
	time_close: number;
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
	market_cap: number;
}

export function Chart({ coinId }: ChartProps) {
	const { isLoading, data } = useQuery<Historical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId), {
		refetchInterval: 10000,
	});
	return (
		<div>
			{isLoading ? (
				'Loading chart...'
			) : (
				<ApexChart
					type="candlestick"
					series={[
						{
							name: 'Price',
							data: data?.map((price) => {
								return {
									x: price.time_close,
									y: [
										price.open.toFixed(2),
										price.high.toFixed(2),
										price.low.toFixed(2),
										price.close.toFixed(2),
									],
								};
							}),
						},
					]}
					options={{
						theme: {
							mode: 'dark',
						},
						chart: {
							height: 300,
							width: 500,
							background: 'transparent',
							toolbar: {
								show: false,
							},
						},
						grid: {
							show: false,
						},
						stroke: {
							curve: 'smooth',
							width: 4,
						},
						yaxis: {
							show: false,
						},
						xaxis: {
							categories: data?.map((date) => date.time_close),
							labels: {
								show: false,
							},
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: false,
							},
							type: 'datetime',
						},
						fill: {
							type: 'gradient',
							colors: ['purple'],
						},
						tooltip: {
							y: {
								formatter: (value) => `$ ${value.toFixed(2)}`,
							},
						},
					}}
				/>
			)}
		</div>
	);
}
