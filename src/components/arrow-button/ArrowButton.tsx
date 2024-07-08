import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';

import styles from './ArrowButton.module.scss';

type BtnProp = {
	OnClick: () => void;
	isOpened: boolean;
};

export const ArrowButton = ({ OnClick, isOpened }: BtnProp) => {
	return (
		<div
			role='button'
			onClick={OnClick}
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpened && styles.container_open)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpened && styles.arrow_open)}
			/>
		</div>
	);
};
