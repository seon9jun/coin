import React from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from '../atom';
import { jsonLocalStorage } from '../util';

interface Form {
	category: string;
}
const Form = styled.form`
	width: 100%;

	input {
		width: 100%;
	}
`;

export const AddBoard: React.FC<any> = () => {
	const [_, setToDo] = useRecoilState(toDoState);

	const { register, setValue, handleSubmit } = useForm<Form>();

	const onValid = ({ category }: Form) => {
		const newCategory = category;

		console.log(newCategory);
		console.log([newCategory]);
		setToDo((allBoards) => {
			jsonLocalStorage.setItem('todos', {
				...allBoards,
				[newCategory]: [],
			});

			return {
				...allBoards,
				[newCategory]: [],
			};
		});
		setValue('category', '');
	};

	return (
		<Form onSubmit={handleSubmit(onValid)}>
			<input
				{...register('category', {
					required: true,
				})}
				type="text"
				placeholder={'Add task on category'}
			/>
		</Form>
	);
};
