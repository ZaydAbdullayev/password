// ✅ UPDATED & FIXED: Enchanted Password UI with Dynamic Chess Position
import { useState, useEffect, useMemo } from "react";
import "./home.scss";
import { create } from "zustand";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChessRook,
  FaChessPawn,
  FaChessBishop,
  FaChessKing,
  FaChessQueen,
  FaChessKnight,
} from "react-icons/fa";
import maskot_error from "./assets/robot-1.png";
import maskot_warning from "./assets/robot-2.png";
import maskot_loading from "./assets/robot-3.png";
import maskot_success from "./assets/robot-4.png";
import { WordleGame } from "./components/templates/wordle";
import sponsor from "./assets/sponsor.png"
import { RiTwitterXFill } from "react-icons/ri";
import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const randomCaptcha = () =>
  Array.from(
    { length: 5 },
    () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
  ).join("");
const randomGeo = () => {
  const geoList = [
    { lat: 60.1699, lng: 24.9384, city: "Helsinki" },
    { lat: 52.52, lng: 13.405, city: "Berlin" },
    { lat: 35.6895, lng: 139.6917, city: "Tokyo" },
    { lat: 59.9139, lng: 10.7522, city: "Oslo" },
    { lat: 48.8566, lng: 2.3522, city: "Paris" },
    { lat: 51.5074, lng: -0.1278, city: "London" },
    { lat: 40.7128, lng: -74.0060, city: "New York" },
    { lat: 34.0522, lng: -118.2437, city: "Los Angeles" },
    { lat: 37.7749, lng: -122.4194, city: "San Francisco" },
    { lat: 41.9028, lng: 12.4964, city: "Rome" },
    { lat: 55.7558, lng: 37.6176, city: "Moscow" },
  ];
  return geoList[Math.floor(Math.random() * geoList.length)];
};

const captchaValue = randomCaptcha();
const geoValue = randomGeo();

const renderPiece = (piece) => {
  if (!piece) return null;
  const color = piece.side === "white" ? "#fff" : "#000";
  const iconProps = { style: { color, fontSize: "1.8rem" } };
  const icons = {
    pawn: FaChessPawn,
    rook: FaChessRook,
    bishop: FaChessBishop,
    queen: FaChessQueen,
    king: FaChessKing,
    knight: FaChessKnight,
  };
  const Icon = icons[piece.type];
  return Icon ? <Icon {...iconProps} /> : null;
};

const getRandomDialog = (status) => {
  const messages = {
    default: [
      "You're doing great. Let's move to the next level.",
      "Eva is watching... and she's impressed.",
      "Almost there. Keep up the good work!",
    ],
    loading: [
      "You're so close... just a bit more effort!",
      "You got this! Eva believes in you.",
      "Processing... Eva is calculating your genius.",
    ],
    success: [
      "Yes! You nailed it. Well done.",
      "Brilliant move. Eva approves.",
      "Excellent! Eva is proud of you.",
    ],
    error: [
      "Is that really your final answer?",
      "Hmm... are you sure about that?",
      "Come on, friend. We both know that’s not right.",
    ],
  };
  const arr = messages[status] || messages.default;
  return arr[Math.floor(Math.random() * arr.length)];
};

const getRandomChessBoard = () => {
  const board = Array(64).fill(null);
  const pieceCounts = {
    pawn: 8,
    rook: 2,
    knight: 2,
    bishop: 2,
    queen: 1,
    king: 1,
  };
  const sides = ["white", "black"];
  const positions = [...Array(64).keys()].sort(() => Math.random() - 0.5);

  let posIndex = 0;
  for (const type in pieceCounts) {
    for (let i = 0; i < pieceCounts[type]; i++) {
      const pos = positions[posIndex++];
      board[pos] = {
        type,
        side: sides[Math.floor(Math.random() * 2)],
      };
    }
  }
  return board;
};

const getRandomPiecePosition = (board) => {
  const indexes = board
    .map((item, idx) => (item ? idx : null))
    .filter((x) => x !== null);
  const pos = indexes[Math.floor(Math.random() * indexes.length)];
  const col = String.fromCharCode("A".charCodeAt(0) + (pos % 8));
  const row = 8 - Math.floor(pos / 8);
  return { position: `${col}${row}`, piece: board[pos]?.type };
};

const ChessComponent = () => {
  const board = useMemo(() => getRandomChessBoard(), []);
  const target = useMemo(() => getRandomPiecePosition(board), [board]);
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="rule-special">
      <div className="chess-grid-wrapper">
        <p className="chess-hint">
          Find the piece on square <strong>{target.position}</strong> and
          include its name (e.g., <em>{target.piece}</em>) in your password.
        </p>
        <div className="chess-grid">
          {board.map((piece, i) => (
            <div
              key={i}
              className={`chess-cell ${(Math.floor(i / 8) + i) % 2 === 0 ? "cell-light" : "cell-dark"
                }`}
            >
              {renderPiece(piece)}
            </div>
          ))}
          {numbers.map((n, i) => (
            <div
              key={`n-${i}`}
              className="grid-label row-label"
              style={{ top: `${i * 37 + 24}px` }}
            >
              {n}
            </div>
          ))}
          {letters.map((l, i) => (
            <div
              key={`l-${i}`}
              className="grid-label col-label"
              style={{ left: `${i * 37 + 24}px` }}
            >
              {l}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SponsorComponent = () => (
  <div className="rule-special">
    <span>Include any sponsor name your password</span>
    <img src={sponsor} alt="Sponsor" className="w100 sponsor-logo" style={{ background: "#ffffff50", borderRadius: "5px" }} />
  </div>
);
export const CaptchaComponent = () => {
  const letters = captchaValue.split("").map((char, i) => (
    <span key={i} className={`captcha-char char-${i}`}>{char}</span>
  ));

  return (
    <div className="captcha-wrapper">
      <span className="captcha-text">Include the CAPTCHA in your password</span>
      <div className="captcha-box">{letters}</div>
    </div>
  );
};

const GeoComponent = () => (
  <div className="rule-special">
    <span className="geo-text">Include the name of the country to which these coordinates belong</span>
    <span className="geo-text">
      Geo Coordinates: {geoValue.lat}, {geoValue.lng}
    </span>
  </div>
);

const Words = ["leech", "close", "tenth", "pecan", "droit", "grail", "clone", "guise", "ralph", "tango", "biddy", "smith", "mower", "payee", "serif", "drape", "fifth", "spank", "glaze", "allot", "truck", "kayak", "virus", "testy", "tepee", "fully", "zonal", "metro", "curry", "grand"];

const getRandomWord = () => Words[Math.floor(Math.random() * Words.length)].toUpperCase();
const word = getRandomWord();
const WordleComponent = ({ setOpenWordle }) => {
  return <div className="rule special">
    <span className="wordle-text">
      Include the answer to the Wordle puzzle in your password
    </span> <br />
    <button className="wordle-btn" onClick={() => setOpenWordle(true)}>
      {"Open Wordle"}
    </button>
  </div>
}
const usePasswordStore = create((set) => ({
  password: "",
  setPassword: (pwd) => set({ password: pwd }),
}));

const rules = [
  {
    id: 1,
    desc: "Password must be at least 8 characters.",
    validate: (pwd) => pwd.length >= 8,
  },
  {
    id: 2,
    desc: "Include an uppercase letter.",
    validate: (pwd) => /[A-Z]/.test(pwd),
  },
  {
    id: 3,
    desc: "Include a lowercase letter.",
    validate: (pwd) => /[a-z]/.test(pwd),
  },
  { id: 4, desc: "Include a number.", validate: (pwd) => /\d/.test(pwd) },
  {
    id: 5,
    desc: "Include a special character.",
    validate: (pwd) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(pwd),
  },
  {
    id: 6,
    desc: "Digits must sum up to 25.",
    validate: (pwd) =>
      pwd
        .split("")
        .filter((c) => /\d/.test(c))
        .reduce((s, d) => s + +d, 0) === 25,
  },
  {
    id: 7,
    desc: "Include a month name.",
    validate: (pwd) =>
      /(january|february|march|april|may|june|july|august|september|october|november|december)/i.test(
        pwd
      ),
  },
  {
    id: 8,
    desc: "Include Roman numeral.",
    validate: (pwd) => /[IVXLCDM]/.test(pwd),
  },
  {
    id: 9,
    desc: "Include any sponsor name your password",
    validate: (pwd) => ["netflix", "spacex", "openai", "tesla", "starbucks"].includes(pwd.toLowerCase()),
    component: SponsorComponent,
  },
  {
    id: 10,
    desc: "Include leap year.",
    validate: (pwd) => /(2020|2024|2028|2032)/.test(pwd),
  },
  {
    id: 11,
    desc: "Include Wordle answer.",
    validate: (pwd) => new RegExp(word, "i").test(pwd),
    component: WordleComponent,
  },
  {
    id: 12,
    desc: "Include periodic element symbol.",
    validate: (pwd) => /(Ag|Zn|Fe|Cu|Au|Hg|Pb|Sn|Na|K)/.test(pwd),
  },
  {
    id: 13,
    desc: "Include CAPTCHA.",
    validate: (pwd) => new RegExp(captchaValue, "i").test(pwd),
    component: CaptchaComponent,
  },
  { id: 14, desc: "Include moon emoji 🌑.", validate: (pwd) => /🌑/.test(pwd) },
  {
    id: 15,
    desc: "Include geo coords.",
    validate: (pwd) => new RegExp(`${geoValue.city}`).test(pwd),
    component: GeoComponent,
  },
  {
    id: 16,
    desc: "Include chess piece name from a specific position.",
    validate: (pwd) => /(pawn|rook|knight|bishop|queen|king)/i.test(pwd),
    component: ChessComponent,
  },
  {
    id: 17,
    desc: "Include any emoji.",
    validate: (pwd) => /[\u{1F600}-\u{1F64F}]/u.test(pwd),
  },
  {
    id: 18,
    desc: "Include palindrome.",
    validate: (pwd) => /(level|radar|civic|madam|refer)/i.test(pwd),
  },
  {
    id: 19,
    desc: "Include color name.",
    validate: (pwd) => /(red|blue|green|yellow)/i.test(pwd),
  },
  {
    id: 20,
    desc: "Include Fibonacci number.",
    validate: (pwd) => /(1|2|3|5|8|13|21)/.test(pwd),
  },
];

export const App = () => {
  const { password, setPassword } = usePasswordStore();
  const [activeRule, setActiveRule] = useState(0);
  const [status, setStatus] = useState("default");
  const [dialog, setDialog] = useState(getRandomDialog("default"));
  const [openWordle, setOpenWordle] = useState(false);

  useEffect(() => {
    if (activeRule >= rules.length) return;
    const rule = rules[activeRule];
    setStatus("loading");
    setDialog(getRandomDialog("loading"));
    const timeout = setTimeout(() => {
      const valid = rule.validate(password);
      const newStatus = valid ? "success" : "error";
      setStatus(newStatus);
      setDialog(getRandomDialog(newStatus));
      if (valid) setTimeout(() => setActiveRule((prev) => prev + 1), 800);
    }, 500);
    return () => clearTimeout(timeout);
  }, [password, activeRule]);

  return (
    <div className="app-wrapper">
      <span className="df aic jcc follow">
        <RiTwitterXFill />
      </span>
      <div className="df fdc aic gap-5">
        <h1 className="title">The Enchanted Password</h1>
        <span>
          Try to come up with the perfect password that meets all the rules below.
        </span>
      </div>
      <div className="glass-card">
        <input
          type="text"
          className="password-input"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="maskot-wrapper">
        <div className="df dialog-box">
          {/* <img
            src={
              {
                loading: maskot_loading,
                success: maskot_success,
                error: maskot_error,
                default: maskot_warning,
              }[status]
            }
            alt="Maskot"
            className="maskot"
          /> */}
          <span>{dialog}</span>
        </div>
      </div>
      <div className="rules-list">
        <AnimatePresence>
          {[...rules.slice(0, activeRule + 1)].reverse().map((rule, i) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rule ${i === 0
                ? status
                : rule.validate(password)
                  ? "passed"
                  : "pending"
                } df fdc gap-5 glass-card`}
            >
              <span className="w100 df aic gap-5">{rule.validate(password) ? <BsCheck2 className="check" /> : <RxCross2 className="cross" />}Rule #{rule.id}</span>
              {rule.component ? <rule.component setOpenWordle={setOpenWordle} /> : rule.desc}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {openWordle && (
        <WordleGame newWord={word} onClose={() => setOpenWordle(false)} />
      )}
    </div>
  );
};
