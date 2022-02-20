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

	const onDragEnd = (props: DropResult) => {
		console.log(props);

		const { destination, draggableId, source } = props;
		if (destination?.droppableId === source.droppableId) {
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, draggableId);
				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}
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
