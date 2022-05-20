import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getNewDeck,
  shuffleCardsInDeck,
  drawFiveCards,
} from "../redux/reducers/deckReducer";
import { AppDispatch } from "../redux/store";

/** Components */
import UserHand from "./UserHand";
import NewGame from "./NewGame";
import ControlPanel from "./ControlPanel";

let Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const [hideShuffle, setHideShuffle] = useState(false);

  let { loading, error, deck_id, remaining, all_hands } = useSelector(
    (store: any) => {
      return store.deck;
    }
  );

  /** Load New Deck */
  const loadNewDeck = () => {
    const promise = dispatch(getNewDeck());
    setHideShuffle(false);
    return () => {
      promise.abort();
    };
  };

  /** Shuffle Deck */
  const shuffleDeck = () => {
    const promise = dispatch(shuffleCardsInDeck(deck_id));
    setHideShuffle(true);
    return () => {
      promise.abort();
    };
  };

  /** Draw Five Cards */
  const drawCards = () => {
    if (remaining >= 5) {
      const promise = dispatch(drawFiveCards(deck_id));
      return () => {
        promise.abort();
      };
    }
  };

  return (
    <div className="container">
      <ControlPanel
        remaining={remaining}
        deck_id={deck_id}
        loadNewDeck={loadNewDeck}
        shuffleDeck={shuffleDeck}
        drawCards={drawCards}
      />

      {remaining % 52 === 0 && (
        <NewGame
          hideShuffle={hideShuffle}
          deck_id={deck_id}
          handleClick={() => {
            remaining === 0 ? loadNewDeck() : drawCards();
          }}
          shuffleDeck={shuffleDeck}
        />
      )}

      {loading && <div className="loader"></div>}
      {!loading && !!error && error.length > 0 && (
        <p className="errror-message">{error}</p>
      )}
      <div className="hands-container">
        {all_hands.map((hand: Object, handIndex: number) => {
          return (
            <UserHand
              cardHand={hand}
              key={handIndex}
              handIndex={handIndex + 1}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
