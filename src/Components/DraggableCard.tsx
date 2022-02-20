import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Card = styled.div`
	border-radius: 5px;
	margin-bottom: 5px;
	padding: 10px 10px;
	background-color: ${(props) => props.theme.cardColor};
`;

interface DraggableCardProps {
	toDo: string;
	index: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ toDo, index }: DraggableCardProps) => {
	return (
		<Draggable key={toDo} draggableId={toDo} index={index}>
			{(dndProp) => (
				<Card ref={dndProp.innerRef} {...dndProp.draggableProps} {...dndProp.dragHandleProps}>
					{toDo}
				</Card>
			)}
		</Draggable>
	);
};

export const MemoizedDraggableCard = React.memo(DraggableCard);
