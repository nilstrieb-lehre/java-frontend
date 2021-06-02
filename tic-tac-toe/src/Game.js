import Board from "./Board";
import {useState} from "react";

const styles = {
    display: "flex",
    justifyContent: "center",
    fontSize: 20,
};

const buttonStyle = {
    display: "block"
}

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [oldBoards, setOldBoards] = useState([board]);
    const [xIsNext, setXisNext] = useState(true);
    const [currentStep, setCurrentStep] = useState(null);
    const winner = calculateWinner(board);

    const handleClick = (i) => {
        // if won or square already taken, return
        const boardCopy = [...board];
        if (winner || boardCopy[i]) return;
        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext);

        if (currentStep) {
            setOldBoards([...oldBoards.filter((_, i) => i <= currentStep), boardCopy]);
            setCurrentStep(null);
        } else {
            setOldBoards([...oldBoards, boardCopy]);
        }
    }

    const revert = (i) => {
        setBoard(oldBoards[i]);
        if (i === oldBoards.length - 1) {
            setCurrentStep(null);
        } else {
            setCurrentStep(i);
        }
    };

    const restart = (_) => {
        setBoard(Array(9).fill(null));
        setXisNext(true);
        setOldBoards([board]);
    };

    return (
        <>
            <Board squares={board} onClick={handleClick}/>
            <div style={styles}>
                <div>
                    <p>
                        {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
                    </p>
                    <button onClick={restart}>Restart</button>
                    <p>
                        {oldBoards.map((_, i) => <button style={buttonStyle} onClick={_ => revert(i)}>Go back to
                            round {i}</button>)}
                    </p>
                </div>
            </div>
        </>
    );
}


export function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Game;