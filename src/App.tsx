import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';
import { Board } from './Components/Board';

const Wrapper = styled.div`
	display: flex;
	max-width: 680px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	width: 100%;
	gap: 10px;
	grid-template-columns: repeat(3, 1fr);
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);

	const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
		// console.log('Dragging finished');
		// setToDos((oldToDos) => {
		// 	const toDosCopy = [...oldToDos];
		// 	// 1) Delete item on source.index
		// 	console.log('Delete item on', source.index);
		// 	console.log(toDosCopy);
		// 	toDosCopy.splice(source.index, 1);
		// 	console.log('Deleted item');
		// 	console.log(toDosCopy);
		// 	// 2) Put back the item on the destination.index
		// 	console.log('Put back', draggableId, 'on ', destination.index);
		// 	toDosCopy.splice(destination?.index, 0, draggableId);
		// 	console.log(toDosCopy);
		// 	return toDosCopy;
		// });
	};

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Wrapper>
					<Boards>
						{Object.keys(toDos).map((boardId) => (
							<Board key={boardId} boardId={boardId} toDos={toDos[boardId]} />
						))}
					</Boards>
				</Wrapper>
			</DragDropContext>
		</>
	);
}

export default App;
