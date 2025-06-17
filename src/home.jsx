// Vite + React + Zustand + SCSS + Framer Motion + Full Dynamic Logic with Professional Components (Upgraded Chess)

import React, { useState, useEffect } from "react";
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

// Utils
const randomSponsor = () => {
  const sponsors = ["Netflix", "SpaceX", "OpenAI", "Tesla", "Starbucks"];
  return sponsors[Math.floor(Math.random() * sponsors.length)];
};

const randomCaptcha = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
};

const randomGeo = () => {
  const locations = [
    { lat: 60.1699, lng: 24.9384 },
    { lat: 52.52, lng: 13.405 },
    { lat: 35.6895, lng: 139.6917 },
    { lat: 59.9139, lng: 10.7522 },
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

const sponsorValue = randomSponsor();
const captchaValue = randomCaptcha();
const geoValue = randomGeo();

// Mini Components

const renderPiece = (piece) => {
  if (!piece) return null;
  const color = piece.side === "white" ? "#f90bed" : "#ffe600";
  const iconProps = { style: { color, fontSize: "1.8rem" } };
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

const ChessComponent = () => {
  const fullStartingBoard = [
    { type: "rook", side: "black" },
    { type: "knight", side: "black" },
    { type: "bishop", side: "black" },
    { type: "queen", side: "black" },
    { type: "king", side: "black" },
    { type: "bishop", side: "black" },
    { type: "knight", side: "black" },
    { type: "rook", side: "black" },
    ...Array(8).fill({ type: "pawn", side: "black" }),
    ...Array(32).fill(null),
    ...Array(8).fill({ type: "pawn", side: "white" }),
    { type: "rook", side: "white" },
    { type: "knight", side: "white" },
    { type: "bishop", side: "white" },
    { type: "queen", side: "white" },
    { type: "king", side: "white" },
    { type: "bishop", side: "white" },
    { type: "knight", side: "white" },
    { type: "rook", side: "white" },
  ];

  return (
    <div className="rule-special">
      <div className="chess-grid">
        {fullStartingBoard.map((piece, idx) => (
          <div
            key={idx}
            className={`chess-cell ${
              (Math.floor(idx / 8) + idx) % 2 === 0 ? "cell-light" : "cell-dark"
            }`}
          >
            {renderPiece(piece)}
          </div>
        ))}
      </div>
    </div>
  );
};

const CaptchaComponent = () => (
  <div className="rule-special captcha">
    {captchaValue.split("").map((char, idx) => (
      <span
        key={idx}
        style={{
          display: "inline-block",
          transform: `rotate(${Math.random() * 30 - 15}deg) translate(${
            Math.random() * 4 - 2
          }px, ${Math.random() * 4 - 2}px)`,
          fontSize: `${20 + Math.random() * 10}px`,
        }}
      >
        {char}
      </span>
    ))}
  </div>
);

const SponsorComponent = () => (
  <div className="rule-special">
    Today's Sponsor: <strong>{sponsorValue}</strong>
  </div>
);

const GeoComponent = () => (
  <div className="rule-special">
    Coordinates:{" "}
    <strong>
      {geoValue.lat}, {geoValue.lng}
    </strong>
  </div>
);

// Zustand store
const usePasswordStore = create((set) => ({
  password: "",
  setPassword: (pwd) => set({ password: pwd }),
}));

const rules = [
//   {
//     id: 1,
//     desc: "Password must be at least 8 characters.",
//     validate: (pwd) => pwd.length >= 8,
//   },
//   {
//     id: 2,
//     desc: "Password must include an uppercase letter.",
//     validate: (pwd) => /[A-Z]/.test(pwd),
//   },
//   {
//     id: 3,
//     desc: "Password must include a lowercase letter.",
//     validate: (pwd) => /[a-z]/.test(pwd),
//   },
//   {
//     id: 4,
//     desc: "Password must include a number.",
//     validate: (pwd) => /\d/.test(pwd),
//   },
//   {
//     id: 5,
//     desc: "Password must include a special character.",
//     validate: (pwd) => /[!@#$%^&*()_+\-=[\]{};':\"\\|,.<>/?]+/.test(pwd),
//   },
//   {
//     id: 6,
//     desc: "Digits must sum up to 25.",
//     validate: (pwd) =>
//       pwd
//         .split("")
//         .filter((ch) => /\d/.test(ch))
//         .reduce((sum, d) => sum + parseInt(d), 0) === 25,
//   },
//   {
//     id: 7,
//     desc: "Include a month name.",
//     validate: (pwd) =>
//       /(january|february|march|april|may|june|july|august|september|october|november|december)/i.test(
//         pwd
//       ),
//   },
//   {
//     id: 8,
//     desc: "Include a Roman numeral.",
//     validate: (pwd) => /[IVXLCDM]/.test(pwd),
//   },
//   {
//     id: 9,
//     desc: "Include sponsor name.",
//     validate: (pwd) => new RegExp(sponsorValue, "i").test(pwd),
//     component: SponsorComponent,
//   },
//   {
//     id: 10,
//     desc: "Include leap year.",
//     validate: (pwd) => /(2020|2024|2028|2032)/.test(pwd),
//   },
//   {
//     id: 11,
//     desc: "Include today's Wordle.",
//     validate: (pwd) => /grape/i.test(pwd),
//   },
//   {
//     id: 12,
//     desc: "Include periodic element symbol.",
//     validate: (pwd) => /(Ag|Zn|Fe|Cu|Au|Hg|Pb|Sn|Na|K)/.test(pwd),
//   },
//   {
//     id: 13,
//     desc: "Include CAPTCHA.",
//     validate: (pwd) => new RegExp(captchaValue, "i").test(pwd),
//     component: CaptchaComponent,
//   },
//   {
//     id: 14,
//     desc: "Include moon phase emoji.",
//     validate: (pwd) => /🌑/.test(pwd),
//   },
//   {
//     id: 15,
//     desc: "Include geo coordinates.",
//     validate: (pwd) => new RegExp(`${geoValue.lat}, ${geoValue.lng}`).test(pwd),
//     component: GeoComponent,
//   },
  {
    id: 16,
    desc: "Include chess move.",
    validate: (pwd) => /Qxf7/.test(pwd),
    component: ChessComponent,
  },
  {
    id: 17,
    desc: "Include any emoji.",
    validate: (pwd) => /[\u{1F600}-\u{1F64F}]/u.test(pwd),
  },
  {
    id: 18,
    desc: "Include palindrome word.",
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

  useEffect(() => {
    if (activeRule >= rules.length) return;
    const rule = rules[activeRule];
    setStatus("loading");
    const timeout = setTimeout(() => {
      const valid = rule.validate(password);
      setStatus(valid ? "success" : "error");
      if (valid) {
        setTimeout(() => setActiveRule(activeRule + 1), 800);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [password, activeRule]);

  return (
    <div className="app-wrapper">
      <h1 className="title">The Enchanted Password</h1>
      <input
        type="text"
        className="password-input"
        placeholder="Enter your password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="maskot-wrapper">
        <img
          src={
            status === "loading"
              ? maskot_loading
              : status === "success"
              ? maskot_success
              : status === "error"
              ? maskot_error
              : maskot_warning
          }
          alt="Maskot"
          className="maskot"
        />
      </div>
      <div className="rules-list">
        <AnimatePresence>
          {rules.slice(0, activeRule + 1).map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rule ${
                index === activeRule
                  ? status
                  : rule.validate(password)
                  ? "passed"
                  : "pending"
              }`}
            >
              {rule.component ? <rule.component /> : rule.desc}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
