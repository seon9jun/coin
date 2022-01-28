import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Coin } from './routes/Coin';
import { Coins } from './routes/Coins';

export function Router() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<Routes>
				<Route path={`${process.env.PUBLIC_URL}/:coinId/*`} element={<Coin />} />
				<Route path={`${process.env.PUBLIC_URL}/`} element={<Coins />} />
			</Routes>
		</BrowserRouter>
	);
}
