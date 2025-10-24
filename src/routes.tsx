import { Route, Router } from '@solidjs/router';
import HomePage from './pages/HomePage';

export const Routes = () => (
	<Router>
		<Route path="/" component={HomePage} />
	</Router>
);
