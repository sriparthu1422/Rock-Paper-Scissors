			let score = JSON.parse(localStorage.getItem("score")) || {
				wins: 0,
				loses: 0,
				ties: 0,
			}

			function updateScoreElement() {
				document.querySelector(
					".js-score"
				).innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`
			}

			updateScoreElement()

			function pickComputerMove() {
				let randomNumber = Math.random()
				let computerMove = ""
				if (randomNumber >= 0 && randomNumber < 1 / 3) {
					computerMove = "Rock"
				} else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
					computerMove = "Paper"
				} else if (randomNumber >= 2 / 3 && randomNumber < 1) {
					computerMove = "Scissors"
				}
				return computerMove
			}

			function playGame(playerMove) {
				const computerMove = pickComputerMove()

				let result = ""
				if (playerMove === "Rock") {
					if (computerMove === "Rock") {
						result = "Tie"
					} else if (computerMove === "Paper") {
						result = "You Lose"
					} else if (computerMove === "Scissors") {
						result = "You Win"
					}
				} else if (playerMove === "Paper") {
					if (computerMove === "Rock") {
						result = "You Win"
					} else if (computerMove === "Paper") {
						result = "Tie"
					} else if (computerMove === "Scissors") {
						result = "You Lose"
					}
				} else if (playerMove === "Scissors") {
					if (computerMove === "Rock") {
						result = "You Lose"
					} else if (computerMove === "Paper") {
						result = "You Win"
					} else if (computerMove === "Scissors") {
						result = "Tie"
					}
				}

				if (result === "You Win") {
					score.wins += 1
				} else if (result === "You Lose") {
					score.loses += 1
				} else if (result === "Tie") {
					score.ties += 1
				}

				localStorage.setItem("score", JSON.stringify(score))
				updateScoreElement()

				const resultEl = document.querySelector(".js-result")
				const pickupEl = document.querySelector(".js-pickup")

				resultEl.innerHTML = result
				pickupEl.innerHTML = `You picked ${playerMove}. Computer picked ${computerMove}.`

				// restart animation by removing & re-adding the class
				resultEl.classList.remove("result-animate")
				pickupEl.classList.remove("text-animate")
				void resultEl.offsetWidth // force reflow
				resultEl.classList.add("result-animate")
				pickupEl.classList.add("text-animate")
			}

			function resetGame() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  const resultEl = document.querySelector('.js-result');
  resultEl.innerHTML = 'Score reset!';
  document.querySelector('.js-pickup').innerHTML = '';

  resultEl.classList.remove('result-animate');
  void resultEl.offsetWidth;
  resultEl.classList.add('result-animate');
}
