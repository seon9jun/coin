import { atom, selector } from 'recoil';

export interface TodoProps {
	id: number;
	text: string;
}

interface ToDoState {
	[key: string]: TodoProps[];
}

export const toDoState = atom<ToDoState>({
	key: 'toDo',
	default: {
		to_do: [],
		doing: [],
		done: [],
	},
});
