import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import SingleCard from "../components/SingleCard";
import { useAuth } from "../context/AuthProvider";
import fetchScore from "../libs/fetchScore.js";

const cardImages = [
  { src: "/imges/american football.jpg", matched: false },
  { src: "/imges/snooker.jpg", matched: false },
  { src: "/imges/football.jpg", matched: false },
  { src: "/imges/tennis.jpg", matched: false },
  { src: "/imges/golf.jpg", matched: false },
  { src: "/imges/basketball.jpg", matched: false },
];

function GamePage() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choicetwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [wonGame, setWonGame] = useState(false);
  const [lastScore, setLastScore] = useState("");
  const [bestScore, setBestScore] = useState("");
  const [newGame, setNewGame] = useState(false);
  const [nickname, setNickname] = useState("");
  const [token, setToken] = useState("");
  const auth = useAuth();

  useEffect(() => {
    setNickname(auth.user);
    setToken(auth.token);
  }, []);
  useEffect(() => {
    const getLastScore = async () => {
      await axios
        .get(`http://localhost:8080/lastScore:`, {
          headers: { Authorization: token, nickname },
        })
        .then((response) => {
          setLastScore(response.data.lastScore);
        });
    };
    const getBestScore = async () => {
      await axios
        .get(`http://localhost:8080/highScore:`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          setBestScore(response.data.bestScore);
        });
    };
    nickname && getLastScore();
    nickname && getBestScore();
  }, [newGame, nickname]);
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setNewGame(true);
    setCards(shuffleCards);
    setTurns(0);
    setWonGame(false);
  };
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  useEffect(() => {
    if (choicetwo) {
      setDisabled(true);
      if (choiceOne.src === choicetwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        reset();
      } else setTimeout(() => reset(), 1000);
    }
  }, [choiceOne, choicetwo]);

  const reset = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
    setWonGame(false);
  };
  useEffect(() => {
    checkWin();
  }, [choiceOne, choicetwo]);

  const checkWin = () => {
    let count = 0;
    cards.forEach((card) => {
      if (card.matched) count++;
    });
    if (count === 12) {
      setWonGame(true);
      fetchScore.postScore(turns,token,nickname);
    }
    setNewGame(false);
  };

  return (
    <div className="App">
      <h1>{nickname && `Welcome ${nickname} to the `}Memory Game</h1>
      <div className="app-score">
        <p>Last score: {lastScore}</p>
        <p>Best score: {bestScore}</p>
      </div>
      <button onClick={shuffleCards}>New Game</button>
      {wonGame && <h3>Great Job!</h3>}
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choicetwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default GamePage;
