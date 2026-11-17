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