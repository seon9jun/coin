import React, { useRef } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { TodoProps, toDoState } from '../atom';
import { MemoizedDraggableCard } from './DraggableCard';

const BoardWrapper = styled.div`
	width: 300px;
	padding-top: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 300px;
	display: flex;
	flex-direction: column;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface AreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

const Area = styled.div<AreaProps>`
	background-color: ${(props) =>
		props.isDraggingOver ? '#b2bec3' : props.isDraggingFromThis ? '#dfe6e9' : 'transparent'};
	flex-grow: 1;
	transition: all 0.3s ease-in-out;
	padding: 20px;
`;

const Form = styled.form`
	width: 100%;

	input {
		width: 100%;
	}
`;

interface BoardProps {
	toDos: TodoProps[];
	boardId: string;
}

interface Form {
	toDo: string;
}

export const Board: React.FC<BoardProps> = ({ toDos, boardId }: BoardProps) => {
	const setTodos = useSetRecoilState(toDoState);

	const { register, setValue, handleSubmit } = useForm<Form>();

	const onValid = ({ toDo }: Form) => {
		const newToDo = { id: Date.now(), text: toDo };
		setTodos((allBoards) => {
			console.log('allBoards', [boardId]);
			console.log([boardId], [allBoards[boardId]]);
			return {
				...allBoards,
				[boardId]: [...allBoards[boardId], newToDo],
			};
		});
		setValue('toDo', '');
	};

	return (
		<BoardWrapper>
			<Title>{boardId.toLocaleUpperCase()}</Title>
			<Form onSubmit={handleSubmit(onValid)}>
				<input
					{...register('toDo', {
						required: true,
					})}
					type="text"
					placeholder={`Add task on ${boardId}`}
				/>
			</Form>

			<Droppable droppableId={boardId}>
				{(dndProp, snapShot) => (
					<Area
						isDraggingOver={snapShot.isDraggingOver}
						isDraggingFromThis={Boolean(snapShot.draggingFromThisWith)}
						ref={dndProp.innerRef}
						{...dndProp.droppableProps}
					>
						{toDos.map((toDo, index) => (
							<MemoizedDraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
						))}
						{dndProp.placeholder}
					</Area>
				)}
			</Droppable>
		</BoardWrapper>
	);
};
