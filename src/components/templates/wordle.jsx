// React Component Version of Wordle UI (with Hint System)
import { useEffect, useState } from "react";
import "../index.scss";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const WordleGame = ({ newWord, onClose }) => {
    const [word, setWord] = useState("");
    const [grid, setGrid] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [input, setInput] = useState("");
    const [message, setMessage] = useState("");
    const [hintUsed, setHintUsed] = useState(false);
    const [hint, setHint] = useState(null);

    const maxRows = 6;
    const wordLength = 5;

    useEffect(() => {
        resetGame();
    }, []);

    const resetGame = () => {
        console.log(`Cheater! The word is: ${newWord}`);
        setWord(newWord);
        setGrid(Array(maxRows).fill(""));
        setCurrentRow(0);
        setInput("");
        setMessage("");
        setHintUsed(false);
        setHint(null);
    };

    const handleSubmit = async () => {
        if (input.length !== wordLength) {
            setMessage("Word must be 5 letters long");
            return;
        }

        const newGrid = [...grid];
        newGrid[currentRow] = input;
        setGrid(newGrid);

        if (input === word) {
            setMessage("Congratulations! You guessed the word!");
            await delay(3000);
            resetGame();
            onClose();
        } else if (currentRow + 1 >= maxRows) {
            setMessage(`You lost! The word was ${word}`);
            await delay(3000);
            resetGame();
        } else {
            setCurrentRow(currentRow + 1);
            setInput("");
            setMessage("");
        }
    };

    const handleHint = () => {
        if (hintUsed || !word) return;
        const index = Math.floor(Math.random() * wordLength);
        setHint({ letter: word[index], index });
        setHintUsed(true);
        setMessage(`Hint: Letter '${word[index]}' is at position ${index + 1}`);
    };

    const renderRow = (wordGuess, rowIndex) => {
        const letters = wordGuess.padEnd(wordLength).split("");
        return (
            <div className="row" key={rowIndex}>
                {letters.map((letter, i) => {
                    let status = "";
                    if (rowIndex < currentRow) {
                        if (letter === word[i]) {
                            status = "correct";
                        } else if (word.includes(letter)) {
                            status = "present";
                        } else {
                            status = "absent";
                        }
                    }
                    return (
                        <div key={i} className={`cell ${status}`}>{letter}</div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="game-wrapper">
            <div className="wordle-container">
                <h1>WORDLE</h1>
                <div className="grid">
                    {grid.map((guess, idx) => renderRow(guess, idx))}
                </div>
                <input
                    type="text"
                    maxLength={wordLength}
                    value={input}
                    onChange={(e) => setInput(e.target.value.toUpperCase())}
                    className="guess-input"
                    placeholder="Type your guess..."
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                        }
                    }}
                />
                <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                    <button onClick={handleSubmit} className="submit-btn">Submit</button>
                    <button onClick={handleHint} className="submit-btn" disabled={hintUsed} style={{ opacity: hintUsed ? 0.5 : 1 }}>
                        {hintUsed ? "Hint Used" : "Get Hint"}
                    </button>
                </div>
                <div className={`message`}>{message}</div>
            </div>
        </div>
    );
};