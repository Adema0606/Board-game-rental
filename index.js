const games = [
  { title: 'Каркассон', players: 4, borrower: null },
  { title: 'Доббль', players: 6, borrower: 'Аня' },
  { title: 'Шахматы', players: 2, borrower: null }
];

const gameList = document.getElementById('gameList');
const gameSelect = document.getElementById('gameSelect');
const borrowerName = document.getElementById('borrowerName');
const borrowButton = document.getElementById('borrowButton');
const returnButton = document.getElementById('returnButton');
const message = document.getElementById('message');
const showOnlyFree = document.getElementById('showOnlyFree');
const newGameTitle = document.getElementById('newGameTitle');
const newGamePlayers = document.getElementById('newGamePlayers');
const addGameButton = document.getElementById('addGameButton');

function renderGames() {
  gameList.innerHTML = ''; 
  let countRendered = 0;

  games.forEach((game) => {
    if (showOnlyFree.checked && game.borrower !== null) {
      return; 
    }

    countRendered++;
    const item = document.createElement('li');
    let word = 'игрока';
    
    if (game.players === 6) {
      word = 'игроков';
    }

    let status = 'Свободна';
    if (game.borrower !== null) {
      status = 'У ' + game.borrower;
    }

    item.textContent = game.title + ' · ' + game.players + ' ' + word + ' · ' + status;
    gameList.append(item);
  });

  if (showOnlyFree.checked && countRendered === 0) {
    const item = document.createElement('li');
    item.textContent = 'Свободных игр пока нет';
    gameList.append(item);
  }
}

function renderGameOptions() {
  gameSelect.innerHTML = ''; 

  games.forEach((game, index) => {
    const option = document.createElement('option');
    option.textContent = game.title;
    option.value = index;
    gameSelect.append(option);
  });
}

showOnlyFree.addEventListener('change', () => {
  renderGames();
});

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

returnButton.addEventListener('click', () => {
  const index = Number(gameSelect.value);
  const game = games[index];

  if (game.borrower === null) {
    message.textContent = 'Игра уже свободна';
    return;
  }

  game.borrower = null;
  message.textContent = 'Игра возвращена';
  renderGames();
});

addGameButton.addEventListener('click', () => {
  const title = newGameTitle.value.trim();
  const playersStr = newGamePlayers.value.trim();
  const players = Number(playersStr);

  if (title !== '' && players > 0 && Number.isInteger(players)) {
    const newGame = {
      title: title,
      players: players,
      borrower: null
    };

    games.push(newGame);
    renderGames();
    renderGameOptions();

    newGameTitle.value = '';
    newGamePlayers.value = '';
    message.textContent = 'Игра добавлена';
  } else {
    message.textContent = 'Заполните название и положительное число игроков';
  }
});

renderGames();
renderGameOptions();