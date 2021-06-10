import React, {useEffect, useState} from 'react';
import {Alert, Button} from "react-bootstrap";

const Card = () => {
    const [deckId, setDeckId] = useState();
    const [remaining, setRemaining] = useState(52);
    const [error, setError] = useState(false);
    const [cards, setCards] = useState([]);

    useEffect(() => {
            fetch("https://deckofcardsapi.com/api/deck/new/shuffle")
                .then(response => response.json())
                .then(data => setDeckId(data.deck_id))
                .catch(() => setError(true))
        }
        , []);

    const drawCard = () => {
        if (remaining !== 0) {
            fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
                .then(response => response.json())
                .then(data => {
                    setRemaining(data.remaining);
                    setCards(cards => [...cards, data.cards[0]]);
                    setError(false);
                })
                .catch(() => setError(true))
        }
    }

    return (
        <div>
            <Button onClick={drawCard}>Draw Card</Button>
            <Cards cards={cards}/>
            <br/>
            {error && <Alert variant={"danger"}>Es ist ein Fehler aufgetreten. Versuche es erneut.</Alert>}
            {(remaining === 0) && <Alert variant={"info"}>Keine Karten mehr auf dem Stapel</Alert>}
        </div>
    );
};

const Cards = props => {
    const cards = ["CLUBS", "DIAMONDS", "HEARTS", "SPADES"].map(suit =>
        props.cards.filter(card => card.suit === suit)
    );

    return (
        <div>
            {cards.map(variant =>
                <div>
                    {variant.sort(cardComparator).map(card =>
                        <img key={card.code} src={card.image} alt={card.code} height={150}/>)}
                </div>
            )}
        </div>
    )
}

const values = ['ACE', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'JACK', 'QUEEN', 'KING'];

function cardComparator(a, b) {
    const aVal = values.indexOf(a.value);
    const bVal = values.indexOf(b.value);

    return aVal - bVal;
}

export default Card;