import { atom, selector } from 'recoil';
import { jsonLocalStorage } from './util';

export interface TodoProps {
	id: number;
	text: string;
}

export interface ToDoState {
	[key: string]: TodoProps[];
}

export const toDoState = atom<ToDoState>({
	key: 'toDo',
	default: jsonLocalStorage.loadItem() ?? {
		to_do: [],
		doing: [],
		done: [],
	},
});
