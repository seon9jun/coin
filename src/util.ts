import { ToDoState } from './atom';

export const STORAGE_TODO = 'todos';

export const jsonLocalStorage = {
	setItem: (key: string, value: ToDoState) => {
		localStorage.setItem(key, JSON.stringify(value));
	},

	getItem: (key: string) => {
		if (!localStorage.getItem(key)) return null;

		return JSON.parse(localStorage.getItem(key) || '');
	},

	loadItem: () => {
		const localTodos = localStorage.getItem(STORAGE_TODO);
		if (localTodos) {
			return JSON.parse(localTodos);
		}
		return null;
	},
};
