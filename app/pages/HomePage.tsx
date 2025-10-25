import {
	DangerButton,
	NeutralButton,
	SuccessButton,
} from '../components/ui/Button';

const HomePage = () => {
	return (
		<div>
			<p>Wyrd</p>
			<p>the character sheet management app</p>
			<DangerButton>Danger button</DangerButton>
			<DangerButton size="lg">Danger button</DangerButton>
			<NeutralButton>Neutral button</NeutralButton>
			<NeutralButton size="sm">Neutral button</NeutralButton>
			<SuccessButton size="xxl">Success button</SuccessButton>
		</div>
	);
};

export default HomePage;
