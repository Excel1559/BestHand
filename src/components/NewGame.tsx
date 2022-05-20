import React, { useEffect, useState } from "react";

let NewGame = (props: any) => {
  let { deck_id, handleClick, shuffleDeck, hideShuffle } = props;

  const [newGameText, setNewGameText] = useState("Load new deck");

  useEffect(() => {
    if (!!deck_id) {
      setNewGameText("Draw 5 Cards");
    }
  }, [deck_id]);

  return (
    <div className="new-deck">
      <div className="load-new-deck" onClick={() => handleClick()}>
        <p>{newGameText}</p>
      </div>
      {!!deck_id && !hideShuffle && (
        <p
          className="shuffle-new-deck"
          onClick={() => {
            shuffleDeck();
          }}
        >
          Shuffle Deck
        </p>
      )}
    </div>
  );
};

export default NewGame;
