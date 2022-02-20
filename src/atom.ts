import { atom, selector } from 'recoil';

interface ToDoState {
	[key: string]: string[];
}

export const toDoState = atom<ToDoState>({
	key: 'toDo',
	default: {
		to_do: ['a', 'b', 'c'],
		doing: ['d', 'e'],
		done: ['f'],
	},
});
