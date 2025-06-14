const button = document.getElementById('startBtn');
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  updateDrops();
}

window.addEventListener('resize', resizeCanvas);

const letters = 'アァイィウヴカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789愛';
const fontSize = 16;
let drops = [];

function updateDrops() {
  const columns = Math.floor(canvas.width / fontSize);
  drops.length = columns;
  drops.fill(1);
}

resizeCanvas();

const heartASCII = `
  ⠀
  ⠀ ⣠⣶⣿⡿⠿⠿⣿⣶⣤⣀⣤⣶⣿⠿⠿⢿⣿⣶⣄⡀⠀⠀
  ⢠⣾⡿⠋⠀⣀⣤⣤⣄⡙⢿⣿⡿⢋⣠⣤⣤⣀⠀⠙⢿⣷⡄⠀
  ⣿⡿⠀⢠⡾⣽⣞⣧⣟⡾⣦⠙⡴⣯⢷⣻⡼⣯⢷⡄⠀⢿⣿⠀
  ⣿⡟⠀⣽⣛⣧⣟⡾⣭⣟⣾⣻⡽⢯⣟⣳⢿⡽⣛⣮⠀⢸⣿
  ⢿⣿⠀⢺⡽⣾⡽⣽⣳⣟⡾⣳⣟⡿⢾⡽⣯⢿⣽⡓⠀⣿⡿⠀
  ⠘⣿⣧⠀⢻⢷⣻⣳⣟⡾⣽⣳⢯⣟⣯⣟⣷⣻⡞⠀⣼⣿⠃⠀
⠀  ⠹⣿⣆⠈⢾⢯⡿⣽⣳⢯⣟⡾⣽⢯⡽⣯⡟⠁⣴⣿⠟⠀⠀
⠀⠀  ⠙⣿⣧⡄⠻⣽⣳⢯⣟⡾⣽⢯⡿⣽⠓⢀⣼⣿⠋⠀⠀⠀
⠀⠀⠀  ⠈⠻⣿⣦⠀⠫⣟⡾⣽⢯⣷⠛⠁⣴⣿⠟⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀  ⠙⢿⣷⣄⠈⠻⣽⠛⠀⣠⣾⡿⠋⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀  ⠙⢿⣷⣤⡀⣠⣾⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀ ⠀ ⠙⢿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀ ⠀⠀ ⠉
`;

const heartChars = [];
let heartWidth = 0;
let heartHeight = 0;

function processHeart() {
  const lines = heartASCII.trim().split('\n');
  lines.forEach((line, row) => {
    [...line].forEach((char, col) => {
      if (char !== '⠀') {
        heartChars.push({ char, x: col, y: row });
      }
    });
  });

  const lineLengths = lines.map(line => line.length);
  heartWidth = Math.max(...lineLengths);
  heartHeight = lines.length;
}

processHeart();

let heartIndex = 0;
let heartFullyFormed = false;
let blinkVisible = true;
let blinkTimer = 0;
const blinkInterval = 500;

function drawMatrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#0F0';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    const x = i * fontSize;
    const y = drops[i] * fontSize;

    ctx.fillText(text, x, y);

    if (y > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  if (!heartFullyFormed) {
    const charsPerFrame = 3;
    for (let i = 0; i < charsPerFrame && heartIndex < heartChars.length; i++) {
      const { char, x, y } = heartChars[heartIndex];
      const drawX = canvas.width / 2 - (heartWidth * fontSize) / 2 + x * fontSize;
      const drawY = canvas.height / 2 - (heartHeight * fontSize) / 2 + y * fontSize;

      ctx.fillStyle = '#ff2a6d';
      ctx.fillText(char, drawX, drawY);

      heartIndex++;
    }

    if (heartIndex >= heartChars.length) {
      heartFullyFormed = true;
      blinkTimer = Date.now();
    }
  } else {
    const now = Date.now();
    if (now - blinkTimer > blinkInterval) {
      blinkVisible = !blinkVisible;
      blinkTimer = now;
    }

    if (blinkVisible) {
      heartChars.forEach(({ char, x, y }) => {
        const drawX = canvas.width / 2 - (heartWidth * fontSize) / 2 + x * fontSize;
        const drawY = canvas.height / 2 - (heartHeight * fontSize) / 2 + y * fontSize;

        ctx.fillStyle = '#ff2a6d';
        ctx.fillText(char, drawX, drawY);
      });
    }
  }
}

// Mostrar balões de amor

const messages = [
  'Eu te amo Japa 💖',
  'Vejo enfim a Luz brilhar🌟',
  'Tantos dias sonhando acordado 🌟',
  'você mudou tudo 🌟',
  'Você é o meu novo sonho🌟',
  'É você a luz🌟',
  'De todos os mundos que a gente podia ter, escolhi você🌟',
  'Todos temos um sonho 🌟',
  'Isso quer dizer que valeu a pena...tudo🌟',
  'Você foi a melhor coisa que já me aconteceu🌟',
  'Com você, o mundo ficou maior 🌟',


];

const activeBubbles = []; // Guarda posições dos balões ativos

function isOverlapping(rect1, rect2) {
  return !(
    rect1.left + rect1.width < rect2.left ||
    rect1.left > rect2.left + rect2.width ||
    rect1.top + rect1.height < rect2.top ||
    rect1.top > rect2.top + rect2.height
  );
}

function showLoveBubble() {
  const bubble = document.createElement('div');
  bubble.className = 'love-bubble';
  bubble.textContent = messages[Math.floor(Math.random() * messages.length)];

  const container = document.getElementById('bubbleContainer');
  container.appendChild(bubble);

  requestAnimationFrame(() => {
    const bubbleRect = bubble.getBoundingClientRect();
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const maxX = screenW - bubbleRect.width - 10;
    const maxY = screenH - bubbleRect.height - 10;

    let x, y;
    const maxAttempts = 50;
    let attempts = 0;
    let overlapping;

    do {
      x = Math.random() * maxX;
      y = Math.random() * maxY;

      const newRect = { left: x, top: y, width: bubbleRect.width, height: bubbleRect.height };

      overlapping = activeBubbles.some(existingRect => isOverlapping(newRect, existingRect));
      attempts++;
    } while (overlapping && attempts < maxAttempts);

    if (overlapping) {
      // Se não conseguiu achar posição sem sobreposição, remove o balão e sai
      bubble.remove();
      return;
    }

    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    // Salva a posição para futuras colisões
    activeBubbles.push({ left: x, top: y, width: bubbleRect.width, height: bubbleRect.height });

    setTimeout(() => {
      bubble.remove();
      // Remove da lista de posições
      const index = activeBubbles.findIndex(rect => rect.left === x && rect.top === y);
      if (index !== -1) {
        activeBubbles.splice(index, 1);
      }
    }, 4000);
  });
}

button.addEventListener('click', () => {
  button.style.display = 'none';
  canvas.style.display = 'block';
  resizeCanvas();
  setInterval(drawMatrix, 50);
  setInterval(showLoveBubble, 1200);
});
