//Create cards depending on settings. (we'll do 3x3 temporarily)
//Create card pairs
//Give card pairs an emoji.

const EMOJIS = ["🥶", "😎", "🤢", "😤", "🤠", "☠️", "😹", "💩", "🤖", "🫥", "👿", "🥵", "🥸",
"😇", "🤪", "🤬", "😱", "🐨", "🍠", "🍙", "🍳"];

let clicks = 0;

let cardsId = [];
const cardSetup = (rowsAndCollumns) => {
    let totalCards = 0;
    clicks = 0;
    cardsId = [];

    for (let i = 0; i < rowsAndCollumns; i++) {
        for (let t = 0; t < rowsAndCollumns; t++) {
            //const randomIndex = Math.floor(Math.random()*EMOJIS.length);

            const newButton = document.createElement('button');

            newButton.addEventListener('click', clicked);
            newButton.innerHTML = "<h1></h1>";
    
            const addingNewButton = document.getElementById("cardsid").appendChild(newButton);
            cardsId.push(newButton);
            if (t == 0 && i == 0) {
                cardsId[t].setAttribute('id', 'TopLeft');
            } else if (t == rowsAndCollumns-1 && i == 0) {
                cardsId[t].setAttribute('id', 'TopRight');
                console.log(i, t);
            } else if (i == rowsAndCollumns-1 && t == 0) {
                cardsId[rowsAndCollumns*rowsAndCollumns-rowsAndCollumns].setAttribute('id', 'bottomLeft');
            } else if (i == rowsAndCollumns-1 && t == rowsAndCollumns-1) {
                cardsId[rowsAndCollumns*rowsAndCollumns-1].setAttribute('id', 'BottomRight');
            }
        }
        document.getElementById("cardsid").appendChild(document.createElement("br"));
    }

    const cardsIdAvailable = [...cardsId];
    const emojiAvailable = [...EMOJIS];
    for (i = 0; i <= Math.floor(cardsId.length/2)-1; i++) {
        let randomIndex = Math.floor(Math.random()*emojiAvailable.length);
        let chosenEmoji = emojiAvailable[randomIndex];
        emojiAvailable.splice(randomIndex, 1);

        randomIndex = Math.floor(Math.random() * cardsIdAvailable.length);
        let chosenCard = cardsIdAvailable[randomIndex];
        chosenCard.innerHTML = `<h1>🐑</h1>`;
        chosenCard.setAttribute('gameValue', `${chosenEmoji}`)
        cardsIdAvailable.splice(randomIndex, 1);
        
        randomIndex = Math.floor(Math.random()*cardsIdAvailable.length);
        chosenCard = cardsIdAvailable[randomIndex];
        chosenCard.innerHTML = `<h1>🐑</h1>`;
        chosenCard.setAttribute('gameValue', `${chosenEmoji}`)
        cardsIdAvailable.splice(randomIndex, 1);
    }

    if (cardsIdAvailable != []) {
        cardsIdAvailable[0].innerHTML = `<h1>🐑</h1>`
        cardsIdAvailable[0].setAttribute('gameValue', `🐑`);
    }

    //playGame();
};


const openCards = [];
const clicked = (button) => {
    const buttonClicked = button.currentTarget;


    if (buttonClicked.getAttribute("class") == "clicked" && buttonClicked.getAttribute("class") != "finished") {
        buttonClicked.removeAttribute("class");

        buttonClicked.innerHTML = `<h1>🐑</h1>`
        openCards.splice(openCards.indexOf(buttonClicked.getAttribute('gamevalue')), 1);

        clicks--;
    } else if (clicks < 2 && buttonClicked.getAttribute("class") != "finished") {
        buttonClicked.setAttribute("class", "clicked");

        buttonClicked.innerHTML = `<h1>${buttonClicked.getAttribute("gamevalue")}</h1>`
        openCards.push(buttonClicked);
        clicks++;

        console.log(openCards[0], openCards[1]);
        if (openCards[0].getAttribute('gamevalue') == openCards[1].getAttribute('gamevalue')) {
            openCards[0].setAttribute('class', 'finished');
            openCards[1].setAttribute('class', 'finished');
            console.log("CONGRATS");

            openCards.splice(0, 2);
            clicks = 0;
        }
    }


}

const newGame = () => {
    for (card of cardsId) {
        card.remove();
    }
    for (br of document.body.getElementsByTagName("br")) {
        br.remove();
    }

    cardSetup(4);
}

cardSetup(5);
