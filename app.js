const games = [
  { title: '2048', category: 'Puzzle', mood: 'Focus', art: 'art-blue', label: '2048', embed: 'https://play2048.co/', source: 'https://play2048.co/' },
  { title: 'HexGL', category: 'Racing', mood: 'Rush', art: 'art-coral', label: 'HEXGL', embed: 'https://hexgl.bkcore.com/play/', source: 'https://hexgl.bkcore.com/' },
  { title: 'Cookie Clicker', category: 'Idle', mood: 'Chill', art: 'art-lime', label: 'COOKIE', embed: 'https://orteil.dashnet.org/cookieclicker/', source: 'https://orteil.dashnet.org/cookieclicker/' },
  { title: 'Tetris', category: 'Arcade', mood: 'Focus', art: 'art-ink', label: 'TETRIS', embed: 'https://tetris.com/play-tetris', source: 'https://tetris.com/play-tetris' },
  { title: 'A Dark Room', category: 'Adventure', mood: 'Chill', art: 'art-blue', label: 'A DR', embed: 'https://adarkroom.doublespeakgames.com/', source: 'https://adarkroom.doublespeakgames.com/' },
  { title: 'Little Alchemy 2', category: 'Puzzle', mood: 'Chill', art: 'art-coral', label: 'ALCHEMY', embed: 'https://littlealchemy2.com/', source: 'https://littlealchemy2.com/' }
];

const grid = document.querySelector('#gameGrid');
const filterList = document.querySelector('#filterList');
const searchInput = document.querySelector('#searchInput');
const emptyState = document.querySelector('#emptyState');
const modalBackdrop = document.querySelector('#modalBackdrop');
const gameFrame = document.querySelector('#gameFrame');
const embedFallback = document.querySelector('#embedFallback');
const modalTitle = document.querySelector('#modalTitle');
const modalCategory = document.querySelector('#modalCategory');
const modalMeta = document.querySelector('#modalMeta');
const sourceLink = document.querySelector('#sourceLink');
const externalLink = document.querySelector('#externalLink');
let selectedFilter = 'All';

const filters = ['All', ...new Set(games.map((game) => game.category))];
filterList.innerHTML = filters.map((filter) => `<button class="filter-button${filter === 'All' ? ' active' : ''}" data-filter="${filter}">${filter}</button>`).join('');

function renderGames() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleGames = games.filter((game) => {
    const matchesFilter = selectedFilter === 'All' || game.category === selectedFilter;
    const matchesSearch = [game.title, game.category, game.mood].join(' ').toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  grid.innerHTML = visibleGames.map((game, index) => `
    <article class="game-card" style="animation-delay: ${index * 55}ms">
      <div class="card-art ${game.art}">
        <span class="card-index">0${games.indexOf(game) + 1}</span>
        <span class="art-word">${game.label}</span>
      </div>
      <div class="card-body">
        <div class="card-meta"><span>${game.category}</span><span>${game.mood}</span></div>
        <h3 class="card-title">${game.title}</h3>
        <button class="card-play" data-game="${games.indexOf(game)}" aria-label="Play ${game.title}">↗</button>
      </div>
    </article>
  `).join('');
  emptyState.hidden = visibleGames.length > 0;
}

function openGame(game) {
  modalTitle.textContent = game.title;
  modalCategory.textContent = `NOW PLAYING / ${game.category}`;
  modalMeta.textContent = `${game.mood} · Free to play · External source`;
  sourceLink.href = game.source;
  externalLink.href = game.source;
  gameFrame.src = game.embed;
  gameFrame.hidden = false;
  embedFallback.hidden = true;
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeGame() {
  modalBackdrop.hidden = true;
  gameFrame.src = 'about:blank';
  document.body.style.overflow = '';
}

filterList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  selectedFilter = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach((filterButton) => filterButton.classList.toggle('active', filterButton === button));
  renderGames();
});

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-game]');
  if (button) openGame(games[Number(button.dataset.game)]);
});

function openRandomGame() { openGame(games[Math.floor(Math.random() * games.length)]); }
document.querySelector('#randomButton').addEventListener('click', openRandomGame);
document.querySelector('#surpriseButton').addEventListener('click', openRandomGame);
document.querySelector('#closeModal').addEventListener('click', closeGame);
modalBackdrop.addEventListener('click', (event) => { if (event.target === modalBackdrop) closeGame(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !modalBackdrop.hidden) closeGame(); });
searchInput.addEventListener('input', renderGames);
gameFrame.addEventListener('load', () => { try { if (!gameFrame.contentDocument?.body?.innerHTML) throw new Error('empty'); } catch { /* Cross-origin frames are expected and remain playable. */ } });

renderGames();
