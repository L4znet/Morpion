window.addEventListener("load", () => {
  // Init game variable
  let isX = true;
  let xStartedLastGame = isX;
  let isGameEnded = false;

  // On récupère les éléments html
  const cases = document.querySelectorAll(".case"); // On récupère un tableau
  const resetButton = document.querySelector(".reset-button");
  const winnerName = document.querySelector(".winner-name");
  const gameHistory = document.querySelector(".historic");

  // Création d'objet playerOne et playerTwo
  const playerOne = {
    name: prompt("Chose player 1 pseudo :"),
    symbol: isX ? "X" : "O",
    isX,
    score: 0,
    element: ".player-one",
  };
  const playerTwo = {
    name: prompt("Chose player 2 pseudo :"), // On demande le pseudo
    symbol: !isX ? "X" : "O",
    isX: !isX,
    score: 0,
    element: ".player-two",
  };

  const displayScore = (player_1, player_2) => {
    player_1.element.innerHTML = `Player one : ${player_1.name}, playing : ${player_1.symbol}, his score is : ${player_1.score}`;
    player_2.element.innerHTML = `Player two : ${player_2.name}, playing : ${player_2.symbol}, his score is : ${player_2.score}`;
  };

  // Fonction de refacto ici 👇

  displayScore(playerOne, playerTwo);

  // On affiche le premier joueur à jouer :
  winnerName.innerHTML = `${playerOne.name} is playing next (${playerOne.symbol})`;

  // Fonction de vérification de victoire
  const hasWon = (caseValue, lastPlayer) => {
    if (
      (cases[0].innerHTML === caseValue &&
        cases[0].innerHTML === cases[1].innerHTML &&
        cases[1].innerHTML === cases[2].innerHTML) ||
      (cases[0].innerHTML === caseValue &&
        cases[0].innerHTML === cases[3].innerHTML &&
        cases[3].innerHTML === cases[6].innerHTML) ||
      (cases[0].innerHTML === caseValue &&
        cases[0].innerHTML === cases[4].innerHTML &&
        cases[4].innerHTML === cases[8].innerHTML) ||
      (cases[1].innerHTML === caseValue &&
        cases[1].innerHTML === cases[4].innerHTML &&
        cases[4].innerHTML === cases[7].innerHTML) ||
      (cases[2].innerHTML === caseValue &&
        cases[2].innerHTML === cases[4].innerHTML &&
        cases[4].innerHTML === cases[6].innerHTML) ||
      (cases[2].innerHTML === caseValue &&
        cases[2].innerHTML === cases[5].innerHTML &&
        cases[5].innerHTML === cases[8].innerHTML) ||
      (cases[3].innerHTML === caseValue &&
        cases[3].innerHTML === cases[4].innerHTML &&
        cases[4].innerHTML === cases[5].innerHTML) ||
      (cases[6].innerHTML === caseValue &&
        cases[6].innerHTML === cases[7].innerHTML &&
        cases[7].innerHTML === cases[8].innerHTML)
    ) {
      isGameEnded = true;
      winnerName.innerHTML = `The winner is ${lastPlayer.name} (${lastPlayer.symbol})`;
      lastPlayer.score++;
      // On affiche les pseudos dans le HTML
      displayScore(playerOne, playerTwo);

      // Affichage dans l'historique
      const li = document.createElement("li");
      li.innerHTML = `${lastPlayer.name} won this game (${lastPlayer.symbol}), putting his score to : ${lastPlayer.score}`;
      gameHistory.appendChild(li);
    }
  };

  // Fonction de vérification de match nul
  const isEven = () => {
    // Si toutes les cases sont remplis et que la victoire n'est pas déjà passé
    // => Match nul
    if (!isGameEnded) {
      let isFull = true;
      cases.forEach((item) => {
        // Dès que isFull est false, c'est qu'au moins une case est vide
        if (isFull) {
          isFull = !(item.innerHTML === "");
        }
      });

      if (isFull) {
        isGameEnded = true;
        winnerName.innerHTML = `The game is even, try again!`;

        // Affichage dans l'historique
        const li = document.createElement("li");
        li.innerHTML = `Even game!`;
        gameHistory.appendChild(li);
      }
    }
  };

  cases.forEach((morpionCase) => {
    morpionCase.addEventListener("click", (event) => {
      const newCaseValue = isX ? "❌" : "⭕️";

      if (event.target.innerHTML.length === 0 && !isGameEnded) {
        // On affiche la valeur dans la case
        event.target.innerHTML = newCaseValue;

        // On determine qui a joué en dernier et qui jouera en prochain
        const lastPlayer = playerOne.isX === isX ? playerOne : playerTwo;
        const nextPlayer = playerOne.isX !== isX ? playerOne : playerTwo;

        // On affiche le prochain joueur
        winnerName.innerHTML = `${nextPlayer.name} is playing next (${nextPlayer.symbol})`;

        hasWon(newCaseValue, lastPlayer);
        isEven();

        isX = !isX;
      }
    });
  });
  g;

  resetButton.addEventListener("click", (event) => {
    cases.forEach((item) => {
      item.innerHTML = "";
    });
    isX = !xStartedLastGame;
    xStartedLastGame = !xStartedLastGame;
    isGameEnded = false;

    const nextPlayer = playerOne.isX === isX ? playerOne : playerTwo;

    // On affiche le prochain joueur
    winnerName.innerHTML = `${nextPlayer.name} is playing next (${nextPlayer.symbol})`;
  });
});
