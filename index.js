const games = [
  { title: 'Каркассон', players: 4, borrower: null },
  { title: 'Доббль', players: 6, borrower: 'Аня' },
  { title: 'Шахматы', players: 2, borrower: null }
];

const gameList = document.getElementById('gameList');

function renderGames() {
  gameList.innerHTML = '';
}

renderGames();