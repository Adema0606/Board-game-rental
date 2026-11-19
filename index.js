const games = [
  { title: 'Каркассон', players: 4, count: 2, available: 2, borrower: null },
  { title: 'Доббль', players: 6, count: 1, available: 0, borrower: 'Аня' },
  { title: 'Шахматы', players: 2, count: 1, available: 1, borrower: null }
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
const newGameCount = document.getElementById('newGameCount');
const addGameButton = document.getElementById('addGameButton');

function renderGames() {
  gameList.innerHTML = ''; 
  let countRendered = 0;

  games.forEach((game) => {
    if (showOnlyFree.checked && game.available === 0) {
      return; 
    }

    countRendered++;
    const item = document.createElement('li');
    let word = 'игрока';
    
    if (game.players === 6) {
      word = 'игроков';
    }

    let status = 'Свободна';
    if (game.available === 0) {
      status = 'Нет в наличии';
    } else if (game.borrower !== null) {
      status = 'У ' + game.borrower;
    }

    item.textContent = game.title + ' · ' + game.players + ' ' + word + ' · Остаток: ' + game.available + ' · ' + status;
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

  if (game.available === 0) {
    message.textContent = 'Игр этой игры больше нет в наличии';
    return;
  }

  game.available = game.available - 1;
  game.borrower = name;
  message.textContent = 'Игра выдана';
  renderGames();
});

returnButton.addEventListener('click', () => {
  const index = Number(gameSelect.value);
  const game = games[index];

  if (game.available === game.count) {
    message.textContent = 'Все экземпляры уже на месте';
    return;
  }

  game.available = game.available + 1;
  
  if (game.available === game.count) {
    game.borrower = null;
  }
  
  message.textContent = 'Игра возвращена';
  renderGames();
});

addGameButton.addEventListener('click', () => {
  const title = newGameTitle.value.trim();
  const playersStr = newGamePlayers.value.trim();
  const players = Number(playersStr);
  const count = Number(newGameCount.value);

  if (title !== '' && players > 0 && Number.isInteger(players) && count > 0) {
    const newGame = {
      title: title,
      players: players,
      count: count,
      available: count,
      borrower: null
    };

    games.push(newGame);
    renderGames();
    renderGameOptions();

    newGameTitle.value = '';
    newGamePlayers.value = '';
    newGameCount.value = '';
    message.textContent = 'Игра добавлена';
  } else {
    message.textContent = 'Заполните все поля правильно';
  }
});

renderGames();
renderGameOptions();

//должно учитываться скольким людям могу выдать игру тип максимум сколькокто и если ктото попросит больше не смогу выдать 
//чтобы можно было как админ изменять колличество которое есть если например новый завоз 
// добавить колличество копий 