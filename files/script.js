const emojis = ['🌈','💅','✨','👑','💖','🎉','🦄','😂','💃','🕺'];
const floaterContainer = document.getElementById('floaters');

// ── Spawn floating emojis ──
function spawnFloater() {
  const el = document.createElement('div');
  el.className = 'floater';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 100 + 'vw';
  const dur = 5 + Math.random() * 6;
  el.style.animationDuration = dur + 's';
  el.style.animationDelay = Math.random() * -dur + 's';
  el.style.fontSize = (1.2 + Math.random() * 1.8) + 'rem';
  floaterContainer.appendChild(el);
  setTimeout(() => el.remove(), (dur + 2) * 1000);
}

// Start a light drizzle of emojis on load
for (let i = 0; i < 10; i++) spawnFloater();
setInterval(spawnFloater, 1200);

// ── Prank reveal ──
function revealPrank() {
  const input = document.getElementById('name-input');
  const name  = input.value.trim();

  if (!name) {
    input.style.borderColor = '#ff3cac';
    input.style.boxShadow   = '0 0 20px rgba(255,60,172,0.6)';
    input.placeholder       = 'Lagyan mo ng pangalan! 😤';
    input.focus();
    setTimeout(() => {
      input.style.borderColor = 'rgba(255,255,255,0.15)';
      input.style.boxShadow   = 'none';
      input.placeholder       = 'Pangalan mo dito...';
    }, 1500);
    return;
  }

  // Inject name into reveal screen
  const revealNameEl = document.getElementById('reveal-name');
  revealNameEl.textContent = name.toUpperCase() + ',';

  // Swap screens
  document.getElementById('screen-input').classList.add('hidden');
  document.getElementById('screen-reveal').classList.remove('hidden');

  // Burst of emojis on reveal
  for (let i = 0; i < 30; i++) {
    setTimeout(spawnFloater, i * 80);
  }
  // Keep spawning more frequently after reveal
  setInterval(spawnFloater, 500);
}

// ── Allow Enter key to submit ──
document.getElementById('name-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') revealPrank();
});
