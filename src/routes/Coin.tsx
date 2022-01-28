import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link, Route, Routes, useLocation, useMatch, useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinsTickers } from '../api';
import { theme } from '../theme';
import { Chart } from './Chart';
import { Price } from './Price';

const Header = styled.div`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const HistoryBack = styled.button`
	background: ${theme.accentColor};
	outline: none;
	border: none;
	height: 25px;
	width: 25px;
	border-radius: 50%;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease-in-out;
	position: absolute;
	left: 0;

	&&:hover {
		background: ${theme.textColor};
		color: ${theme.bgColor};
	}
`;

const Container = styled.div`
	padding: 0 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 48px;
`;

const Overview = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: rgba(0, 0, 0, 0.5);
	padding: 10px 20px;
	border-radius: 10px;
`;

const OverviewItem = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 33%;

	span:first-child {
		font-size: 10px;
		font-weight: 400;
		text-transform: uppercase;
		margin-bottom: 5px;
	}
`;

const Description = styled.p`
	margin: 20px 0;
`;

const Tabs = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	margin: 25px 0;
	gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
	text-align: center;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: 400;
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 10px;
	color: ${(props) => (props.isActive ? props.theme.accentColor : props.theme.textColor)};

	a {
		padding: 7px 0;
		display: block;
	}
`;

const Loader = styled.div`
	text-align: center;
`;

interface RouteState {
	state: {
		name: string;
	};
}

interface InfoData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
	description: string;
	message: string;
	open_source: boolean;
	started_at: string;
	development_status: string;
	hardware_wallet: boolean;
	proof_type: string;
	org_structure: string;
	hash_algorithm: string;
	first_data_at: string;
	last_data_at: string;
}

interface PriceData {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	circulating_supply: number;
	total_supply: number;
	max_supply: number;
	beta_value: number;
	first_data_at: string;
	last_updated: string;
	quotes: {
		USD: {
			ath_date: string;
			ath_price: number;
			market_cap: number;
			market_cap_change_24h: number;
			percent_change_1h: number;
			percent_change_1y: number;
			percent_change_6h: number;
			percent_change_7d: number;
			percent_change_12h: number;
			percent_change_15m: number;
			percent_change_24h: number;
			percent_change_30d: number;
			percent_change_30m: number;
			percent_from_price_ath: number;
			price: number;
			volume_24h: number;
			volume_24h_change_24h: number;
		};
	};
}

export function Coin() {
	// react-router-dom v5 에선 usehistory 에서 useNavigate로 변경됨
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/');
	};
	const { coinId } = useParams();
	const { state } = useLocation() as RouteState;
	// react-router-dom v6 부턴 제네릭 지원암함
	//https://typescript.tv/react/upgrade-to-react-router-v6/
	const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(['info', coinId], () =>
		fetchCoinInfo(coinId as string)
	);
	const priceData = useQuery<PriceData>(['tickers', coinId], () => fetchCoinsTickers(coinId as string), {
		refetchInterval: 5000,
	});
	const { isLoading: tickersLoading, data: tickersData } = priceData;
	const priceDataProps = {
		tickersLoading,
		tickersData,
	};
	const priceMatch = useMatch('/:coidId/price');
	const chartMatch = useMatch('/:coidId/chart');

	const loading = infoLoading || tickersLoading;

	return (
		<Container>
			<HelmetProvider>
				<Helmet>
					<title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>
				</Helmet>
			</HelmetProvider>
			<Header>
				<HistoryBack onClick={goHome}>&larr;</HistoryBack>
				<Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
			</Header>
			{loading ? (
				<Loader>Loading...</Loader>
			) : (
				<>
					<Overview>
						<OverviewItem>
							<span>Rank:</span>
							<span>{infoData?.rank}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Symbol:</span>
							<span>${infoData?.symbol}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Price:</span>
							<span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
						</OverviewItem>
					</Overview>
					<Description>{infoData?.description}</Description>
					<Overview>
						<OverviewItem>
							<span>Total Suply:</span>
							<span>{tickersData?.total_supply}</span>
						</OverviewItem>
						<OverviewItem>
							<span>Max Supply:</span>
							<span>{tickersData?.max_supply}</span>
						</OverviewItem>
					</Overview>
					<Tabs>
						<Tab isActive={chartMatch !== null}>
							<Link to={`/${coinId}/chart`}>Chart</Link>
						</Tab>
						<Tab isActive={priceMatch !== null}>
							<Link to={`/${coinId}/price`}>price</Link>
						</Tab>
					</Tabs>

					<Routes>
						<Route path="price" element={<Price {...priceDataProps} children={''} />} />
						<Route path="chart" element={<Chart coinId={coinId as string} />} />
					</Routes>
				</>
			)}
		</Container>
	);
}
