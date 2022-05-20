import React from "react";

let ControlPanel = (props: any) => {
  let { remaining, deck_id, loadNewDeck, shuffleDeck, drawCards } = props;
  return (
    <div>
      <div className="controls-panel">
        {!!deck_id && <p>Deck Id - {deck_id}</p>}
        <div className="controls">
          <p> Remaining Card: {remaining}</p>
          <p onClick={() => loadNewDeck()}>New Deck</p>
          <p onClick={() => shuffleDeck()}>Shuffle</p>
          {remaining >= 5 && <p onClick={() => drawCards()}>Draw</p>}
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
