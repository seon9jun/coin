import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

interface CardProps {
	isDragging: boolean;
}

const Card = styled.div<CardProps>`
	border-radius: 5px;
	margin-bottom: 5px;
	padding: 10px 10px;
	background-color: ${(props) => (props.isDragging ? 'skyblue' : props.theme.cardColor)};
	box-shadow: ${(props) => (props.isDragging ? '0px 2px 10px rgba(0, 0 , 0, .5)' : 'none')};
`;

interface DraggableCardProps {
	toDoId: number;
	toDoText: string;
	index: number;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ toDoId, toDoText, index }: DraggableCardProps) => {
	return (
		<Draggable key={toDoId} draggableId={toDoId.toString()} index={index}>
			{(dndProp, snapShot) => (
				<Card
					isDragging={snapShot.isDragging}
					ref={dndProp.innerRef}
					{...dndProp.draggableProps}
					{...dndProp.dragHandleProps}
				>
					{toDoText}
				</Card>
			)}
		</Draggable>
	);
};

export const MemoizedDraggableCard = React.memo(DraggableCard);
