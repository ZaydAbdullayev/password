import React, { useState } from "react";
import {
  FaChessRook,
  FaChessPawn,
  FaChessBishop,
  FaChessKing,
  FaChessQueen,
  FaChessKnight,
} from "react-icons/fa";
import "./home.scss";
import { fullStartingBoard } from "./context/data";

const getBoardSetup = (status) => {
  if (status === "OPPONENT WAITING" || status === "NEW GAME") {
    return fullStartingBoard;
  }

  if (status === "IN PROGRESS" || status === "WATCHING") {
    const midBoard = [...fullStartingBoard];
    midBoard[28] = { type: "queen", side: "white" };
    midBoard[36] = null;
    midBoard[42] = { type: "rook", side: "black" };
    return midBoard;
  }

  return Array(64).fill(null);
};

// Taş render fonksiyonu (renkli):
const renderPiece = (piece) => {
  if (!piece) return null;

  const color = piece.side === "white" ? "#f90bed" : "#ffe600";

  const iconProps = { className: "chess-piece", style: { color } };

  switch (piece.type) {
    case "pawn":
      return <FaChessPawn {...iconProps} />;
    case "rook":
      return <FaChessRook {...iconProps} />;
    case "bishop":
      return <FaChessBishop {...iconProps} />;
    case "queen":
      return <FaChessQueen {...iconProps} />;
    case "king":
      return <FaChessKing {...iconProps} />;
    case "knight":
      return <FaChessKnight {...iconProps} />;
    default:
      return null;
  }
};
export const ChessBoard = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const boardData = getBoardSetup(activeRoom.status);

  return (
    <div className="game-wrapper">
      <div className="board-body">
        <div
          aria-label="User Login Button"
          tabindex="0"
          role="button"
          class="user-profile"
          onClick={() => setActiveRoom(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setActiveRoom(null);
            }
          }}
        >
          <div class="user-profile-inner">
            <p>Go Back</p>
          </div>
        </div>
        <div className="chess-grid">
          {boardData.map((piece, idx) => (
            <div
              key={idx}
              className={`chess-cell ${
                (Math.floor(idx / 8) + idx) % 2 === 0
                  ? "cell-light"
                  : "cell-dark"
              }`}
            >
              {renderPiece(piece)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
