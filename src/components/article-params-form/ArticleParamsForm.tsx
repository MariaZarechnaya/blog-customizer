import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState, useRef } from 'react';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import clsx from 'clsx';
import { useOutsideClickCloseForm } from '../select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
	OptionType,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

type Props = {
	setData: (option: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setData }: Props) => {
	const [state, setState] = useState(defaultArticleState);
	const [open, setOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	// вызываем хук по закрытию вне формы
	useOutsideClickCloseForm({
		isOpen: open,
		rootRef: rootRef,
		onClose: handleArrowButton,
	});

	// открытие закрытие сайдбара с формой
	function changeOpenForm() {
		setOpen(!open);
	}

	// обработчик клика для кнопки со стрелкой
	function handleArrowButton() {
		changeOpenForm();
	}

	// функция, которая собирает данные в общий state всей формы
	function collectData(option: OptionType, name: string) {
		setState({
			...state,
			[name]: option,
		});
	}
	// обработчик отправки формы
	function onFormSubmit(e: React.FormEvent) {
		e.preventDefault();
		setData(state);
		changeOpenForm();
	}
	// обработчик сброса формы
	function onFormReset() {
		setState(defaultArticleState);
	}

	// функция для отрисовки одинаковых списков с разными параметрами
	function renderSelectComponent(
		options: OptionType[],
		title: string,
		collectData: (option: OptionType, name: string) => void,
		name: keyof ArticleStateType
	) {
		return (
			<Select
				onChange={(option) => {
					collectData(option, name);
				}}
				options={options}
				selected={state[name]}
				title={title}
			/>
		);
	}

	return (
		<>
			<div>
				<ArrowButton OnClick={handleArrowButton} isOpened={open} />
			</div>
			<aside
				className={clsx(styles.container, open && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={onFormSubmit}
					onReset={onFormReset}>
					{renderSelectComponent(
						fontFamilyOptions,
						'шрифт',
						collectData,
						'fontFamilyOption'
					)}
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						onChange={(option) => collectData(option, 'fontSizeOption')}
						selected={state.fontSizeOption}
						title='размер шрифта'
					/>
					{renderSelectComponent(
						fontColors,
						'цвет шрифта',
						collectData,
						'fontColor'
					)}
					<Separator />
					{renderSelectComponent(
						backgroundColors,
						'цвет фона',
						collectData,
						'backgroundColor'
					)}
					{renderSelectComponent(
						contentWidthArr,
						'ширина контента',
						collectData,
						'contentWidth'
					)}
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
