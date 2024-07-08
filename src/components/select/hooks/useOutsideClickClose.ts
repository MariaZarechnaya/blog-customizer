import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};
type UseOutsideClickCloseForm = Pick<
	UseOutsideClickClose,
	'isOpen' | 'rootRef' | 'onClose'
>;

// хук, отвечающий за закрытие по клику вне списка
export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [onClose, onChange, isOpen]);
};

// хук, отвечающий за закрытие по клику вне формы, а так же по клавище Escape
export const useOutsideClickCloseForm = ({
	isOpen,
	rootRef,
	onClose,
}: UseOutsideClickCloseForm) => {
	useEffect(() => {
		if (!isOpen) return;
		// обработчик закрытия  по кнопке клику мыши
		const clickOutsideForm = (event: MouseEvent) => {
			const { target } = event;
			if (target instanceof Node && !rootRef.current?.contains(target)) {
				onClose?.();
			}
		};
		// обработчик закрытия  по кнопке Escape
		const handleEscapeKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				console.log('esc');
				onClose?.();
			}
		};
		document.addEventListener('mousedown', clickOutsideForm);
		document.addEventListener('keydown', handleEscapeKeyDown);
		return () => {
			document.removeEventListener('mousedown', clickOutsideForm);
			document.removeEventListener('keydown', handleEscapeKeyDown);
		};
	}, [isOpen, onClose]);
};
