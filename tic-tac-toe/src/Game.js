import Board from "./Board";
import {useState} from "react";

const styles = {
    display: "flex",
    justifyContent: "center",
    fontSize: 20
};

const Game = () => {

    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXisNext] = useState(true);
    const winner = calculateWinner(board);

    const handleClick = (i) => {
        const boardCopy = [...board];
        // if won or square already taken, return
        if (winner || boardCopy[i]) return;

        boardCopy[i] = xIsNext ? "X" : "O";
        setBoard(boardCopy);
        setXisNext(!xIsNext);
    }

    const restart = (_) => {
        setBoard(Array(9).fill(null));
        setXisNext(true);
    }

    return (
        <>
            <Board squares={board} onClick={handleClick}/>
            <div style={styles}>
                <div>
                    <p>
                        {winner ? "Winner: " + winner : "Next Player: " + (xIsNext ? "X" : "O")}
                    </p>
                    <button onClick={restart}>Restart</button>
                </div>
            </div>
        </>
    );
}

export default Game;

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