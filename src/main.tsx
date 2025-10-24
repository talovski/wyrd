/* @refresh reload */
import { render } from 'solid-js/web';
import './index.css';
import { Routes } from './Routes';

const app = document.getElementById('app');

if (!app) {
	throw new Error('Wrapper div not found');
}

render(() => <Routes />, app!);
