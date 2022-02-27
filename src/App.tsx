import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { toDoState } from './atom';
import { Board } from './Components/Board';
import { jsonLocalStorage } from './util';

const Wrapper = styled.div`
	display: flex;
	max-width: 1080px;
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
		const { destination, source } = props;
		if (!destination) return;

		if (destination?.droppableId === source.droppableId) {
			setToDos((allBoards) => {
				const boardCopy = [...allBoards[source.droppableId]];
				const taskObj = boardCopy[source.index];

				boardCopy.splice(source.index, 1);
				boardCopy.splice(destination?.index, 0, taskObj);

				jsonLocalStorage.setItem('todos', {
					...allBoards,
					[source.droppableId]: boardCopy,
				});

				return {
					...allBoards,
					[source.droppableId]: boardCopy,
				};
			});
		}

		if (destination?.droppableId !== source.droppableId) {
			setToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				const destinationBoard = [...allBoards[destination.droppableId]];
				const taskObj = sourceBoard[source.index];

				sourceBoard.splice(source.index, 1);
				destinationBoard.splice(destination?.index, 0, taskObj);

				jsonLocalStorage.setItem('todos', {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destinationBoard,
				});

				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destinationBoard,
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
