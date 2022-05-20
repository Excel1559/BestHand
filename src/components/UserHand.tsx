import React, { memo } from "react";

let UserHand = (props: any) => {
  let { cardHand, handIndex } = props;
  const replaceFaceCardsWithNumbers = (cardCode: string) => {
    cardCode = cardCode
      .replace("A", "14")
      .replace("K", "13")
      .replace("Q", "12")
      .replace("J", "11");
    return cardCode;
  };

  /** Create list of card codes */
  let hand = cardHand.map((card: { code: string }) =>
    replaceFaceCardsWithNumbers(card.code)
  );

  /** Check the frequncy that each card number appears */
  let checkFrequencies = (hand: any) => {
    // create an object to store frequencies
    let hashMap: any = {};
    // loop through each card, if the card exists, add it to it's frequency, if not, set it to 1
    hand.forEach((card: string) => {
      let cardNumber = Number(card.slice(0, card.length - 1));
      hashMap[cardNumber]
        ? (hashMap[cardNumber] += 1)
        : (hashMap[cardNumber] = 1);
    });
    // convert the object to an array of tuples
    let frequencies = Object.entries(hashMap);
    // sort the frequencies by it's ... frequencies from max to min and return it
    return frequencies.sort((a: any, b: any) => b[1] - a[1]);
  };

  /** Sort and check to see if they cards are in order */
  let checkRange = (hand: any) => {
    // create a new array of consisting of just the card numbers by slicing off the suit (last character)
    let cardNumbers = hand.map((card: any) =>
      Number(card.slice(0, card.length - 1))
    );
    // sort the arary
    cardNumbers.sort((a: number, b: number) => a - b);
    // create a copy of the array
    let cardNumbersWithAce = cardNumbers.slice();
    // if the array has an Ace, take out the 1 and replace it with the 14, push the 14 to the end so that it's still sorted
    if (cardNumbers.includes(1)) {
      cardNumbersWithAce.shift();
      cardNumbersWithAce.push(14);
    }
    // just using another helper function for modularity.
    cardNumbers = isOrdered(cardNumbers);
    cardNumbersWithAce = isOrdered(cardNumbersWithAce);
    // if any one of the two arrays return true, our hand is a range
    return cardNumbers || cardNumbersWithAce;
  };

  /** Check if the cards are ordered */
  let isOrdered = (array: Array<string>) => {
    // iterate through the array, if at any point after the first card the numbers aren't consecutive, return false
    return array.every((card: any, i: any) => {
      if (i === 0) return true;
      return card === array[i - 1] + 1;
    });
  };

  /** Check if the cards are of the same suit */
  let checkSuited = (hand: any) => {
    // get suit from first card
    let suit = hand[0][hand[0].length - 1];
    // loop through rest of cards...
    for (let i = 1; i < hand.length; i++) {
      let currentSuit = hand[i][hand[i].length - 1];
      // if at any point suit is different, return false
      if (suit !== currentSuit) {
        return false;
      }
    }
    return true;
  };

  /** Calculate the best hand  */
  let bestHand = (hand: string) => {
    let isSuited = checkSuited(hand);
    let isRange = checkRange(hand);
    let frequencies = checkFrequencies(hand);

    if (isSuited && isRange) {
      if (frequencies[4][0] === "13" && frequencies[0][0] === "1") {
        return "Royal Flush";
      } else {
        return "Straight Flush";
      }
    }

    if (frequencies.length === 2) {
      if (frequencies[0][1] === 4) {
        return "Four of a Kind";
      } else {
        return "Full House";
      }
    }

    if (isSuited && !isRange) return "Flush";
    if (isRange && !isSuited) return "Straight";

    if (frequencies.length === 3) {
      if (frequencies[0][1] === 3) {
        return "Three of a Kind";
      } else {
        return "Two Pair";
      }
    }

    if (frequencies.length === 4) return "One Pair";
    return "High Card";
  };

  return (
    <React.Fragment>
      <p>
        Hand #{handIndex} - {bestHand(hand)}{" "}
      </p>
      {cardHand.map(
        (
          card: { value: string; suit: string; image: string; code: string },
          cardIndex: number
        ) => {
          return (
            <React.Fragment key={card.code + cardIndex}>
              <img
                className="card-image"
                alt={`${card.value} of ${card.suit}`}
                src={card.image}
              />
            </React.Fragment>
          );
        }
      )}
    </React.Fragment>
  );
};

export default memo(UserHand);
