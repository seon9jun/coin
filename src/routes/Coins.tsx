// import { useEffect, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

const Title = styled.h1`
	color: ${(props) => props.theme.accentColor};
	font-size: 48px;
`;
const Header = styled.div`
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Container = styled.div`
	padding: 0 20px;
	max-width: 480px;
	margin: 0 auto;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
	background-color: white;
	color: ${(props) => props.theme.bgColor};
	padding: 20px;
	margin-bottom: 10px;
	border-radius: 15px;

	a {
		transition: color 0.5s ease-in;
		display: block;
	}

	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;
const Loader = styled.div`
	text-align: center;
`;

const CoinWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

export function Coins() {
	const { isLoading, data } = useQuery<CoinInterface[]>('allCoins', fetchCoins);
	//react query 는 data를 없애지 않고 data를 캐시해서 저장 해놓음.

	return (
		<Container>
			<HelmetProvider>
				<Helmet>
					<title>코인</title>
				</Helmet>
			</HelmetProvider>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinsList>
					{data?.map((coin) => (
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={{ name: coin.name }}>
								<CoinWrapper>
									<Img
										src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
										alt="symbol img"
									/>
									{coin.name} &rarr;
								</CoinWrapper>
							</Link>
						</Coin>
					))}
				</CoinsList>
			)}
		</Container>
	);
}
