const games = [
  { title: 'Каркассон', players: 4, borrower: null },
  { title: 'Доббль', players: 6, borrower: 'Аня' },
  { title: 'Шахматы', players: 2, borrower: null }
];

const gameList = document.getElementById('gameList');

function renderGames() {
  gameList.innerHTML = '';
}


games.forEach((game) => {
    const item = document.createElement('li');
    let status = 'Свободна';

    if (game.borrower !== null) {
      status = 'Взял(а): ' + game.borrower;
    }

    item.textContent = game.title + ' · ' + game.players + ' игрока · ' + status;
    gameList.append(item);
  });

renderGames();

const gameSelect = document.getElementById('gameSelect');
const borrowerName = document.getElementById('borrowerName');
const borrowButton = document.getElementById('borrowButton');
const message = document.getElementById('message');

borrowButton.addEventListener('click', () => {
  const index = Number(gameSelect.value);
  const game = games[index];
  const name = borrowerName.value.trim();

  if (name === '') {
    message.textContent = 'Введите имя';
    return;
  }

  if (game.borrower !== null) {
    message.textContent = 'Игра уже выдана';
    return;
  }

  game.borrower = name;
  message.textContent = 'Игра выдана';
  renderGames();
});