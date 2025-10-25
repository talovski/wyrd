import { type JSX, type ParentProps, splitProps } from 'solid-js';
import { merge } from '../../lib/cn-merge';

type ButtonOwnProps = ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>;
type ButtonSize = { size?: 'sm' | 'lg' | 'xxl' };

type ButtonProps = ButtonOwnProps & ButtonSize;

const ButtonPrimitive = (props: ButtonProps) => {
	const [local, rest] = splitProps(props, ['size', 'children']);
	return (
		<button
			{...rest}
			class={merge(
				'inline-flex items-center rounded-xs border border-solid bg-linear-150 px-2 py-1 transition-all duration-100 ease-in-out active:scale-[0.97] active:shadow-pressed',
				props.size === 'sm' && 'px-1 text-sm',
				props.size === 'lg' && 'rounded-2 px-3 text-2xl',
				props.size === 'xxl' && 'rounded-3 px-4 py-2 text-4xl',
				props.class,
			)}
		>
			{local.children}
		</button>
	);
};

export const DangerButton = (props: ButtonProps) => (
	<ButtonPrimitive
		{...props}
		class={merge(
			'border-red-600 from-red-300 to-red-400 text-red-950 hover:from-red-400 hover:to-red-300',
			props.class,
		)}
		style={{
			'--sh-start': 'var(--color-red-500)',
			'--sh-end': 'var(--color-red-200)',
		}}
	>
		{props.children}
	</ButtonPrimitive>
);

export const SuccessButton = (props: ButtonProps) => (
	<ButtonPrimitive
		{...props}
		class={merge(
			'border-green-500 from-green-300 to-green-400 text-green-950 hover:from-green-400 hover:to-green-300',
			props.class,
		)}
		style={{
			'--sh-start': 'var(--color-green-500)',
			'--sh-end': 'var(--color-green-200)',
		}}
	>
		{props.children}
	</ButtonPrimitive>
);

export const NeutralButton = (props: ButtonProps) => (
	<ButtonPrimitive
		{...props}
		class={merge(
			'border-stone-500 from-stone-100 to-stone-300 text-stone-950 hover:from-stone-300 hover:to-stone-400',
			props.class,
		)}
		style={{
			'--sh-start': 'var(--color-stone-500)',
			'--sh-end': 'var(--color-stone-200)',
		}}
	>
		{props.children}
	</ButtonPrimitive>
);
