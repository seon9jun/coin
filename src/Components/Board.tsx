import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { MemoizedDraggableCard } from './DraggableCard';

const BoardWrapper = styled.div`
	padding: 30px 10px 20px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

const Title = styled.h2`
	text-align: center;
	font-weight: 600;
	margin-bottom: 10px;
	font-size: 18px;
`;

interface BoardProps {
	toDos: string[];
	boardId: string;
}

export const Board: React.FC<BoardProps> = ({ toDos, boardId }: BoardProps) => {
	return (
		<BoardWrapper>
			<Title>{boardId.toLocaleUpperCase()}</Title>
			<Droppable droppableId={boardId}>
				{(dndProp) => (
					<div ref={dndProp.innerRef} {...dndProp.droppableProps}>
						{toDos.map((toDo, index) => (
							<MemoizedDraggableCard key={toDo} toDo={toDo} index={index} />
						))}
						{dndProp.placeholder}
					</div>
				)}
			</Droppable>
		</BoardWrapper>
	);
};
