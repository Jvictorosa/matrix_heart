const button = document.getElementById('startBtn');
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = 'アァイィウヴカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789愛';
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

const heartASCII = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣄⣀⣀⣀⣀⣀⠤⠖⠚⠉⡽⣻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⡿⣍⡉⠁⠀⠀⠀⠀⢀⡾⠁⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⠈⠛⠲⢤⣤⣀⣠⡞⠀⠀⢹⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣄⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⡿⣻⡟⠀⠀⠀⠀⢠⣸⣿⡀⠀⠀⠀⢧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣶⠦⠤⣤⣤⠤⠞⠉⢻⢦⠀⠀⠀⠀⠀⠀⠀⡞⣱⢯⡧⠤⠴⠤⠶⢫⣿⠁⣧⠀⠀⠀⠘⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡎⢧⡀⠀⠀⠀⠀⠀⠸⡆⠳⣄⠀⠀⠀⢠⠞⣰⢋⢸⠃⠀⠀⠀⣴⠛⡇⠀⠈⣧⠀⠀⠀⠘⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⡇⠀⠙⢦⡀⠀⠀⠀⢀⣻⡠⢈⠳⣶⣴⣫⢞⡱⡱⡿⣄⣀⢠⡼⠁⠀⠹⣄⡀⠈⠳⢦⣀⢤⣘⢧⡄⣀⡤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠞⢀⡇⠀⠀⢈⡟⢿⡒⠛⠋⠀⢿⡮⠼⠴⣿⡳⢞⠫⢠⡗⡩⣩⠟⠀⠀⠀⠀⠈⠙⠳⠶⢶⣾⡿⠟⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⡀⠀⢀⣠⠴⢉⠀⡼⠁⠀⠀⣸⠃⠀⠙⢦⡀⠀⠌⣧⣨⣡⢿⡹⢑⡛⡿⢧⡝⢹⡄⠀⠀⠀⢀⣀⣤⡶⠟⠉⠀⢀⡾⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠳⣶⢧⣾⣁⣂⣴⠞⠃⠀⠀⠀⠀⠙⢶⣬⢟⢯⡱⣸⡗⡷⣶⣷⠫⠌⣠⣙⣷⠶⠚⠋⢁⡞⠀⠀⠀⠀⢰⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⠨⠷⣍⠙⠛⠶⣦⡤⣤⣄⣀⣂⡿⢳⢶⡽⠮⣷⢚⢿⣩⢽⠟⢋⠀⣇⠀⠀⠀⢸⠀⠀⠀⠀⠀⢸⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣧⠀⠘⢧⠀⠀⠈⠳⡄⠀⡉⠽⡟⢭⣙⣧⡒⡀⢎⣾⠶⠾⠷⠾⣦⣽⢷⢤⣤⢬⣷⣤⢤⡤⢤⣶⣧⠤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡀⠀⢸⡆⠀⠀⢀⣇⣰⣴⡾⢾⣍⡣⢬⢟⡶⢿⡩⢓⢮⣐⣱⠋⠀⠀⢀⡴⠋⠀⠀⠀⢠⡞⢩⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡇⡐⣼⣥⠴⠲⠛⠛⠳⢤⠀⡀⠌⡽⠟⢾⡧⠬⣷⣡⠞⠉⠻⣤⡀⠀⡞⠀⠀⠀⠀⣠⢿⢰⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠼⠾⠿⠿⣤⣀⠀⠀⠀⠀⠈⣷⣠⠞⠁⡀⢸⠀⠀⠉⣇⠀⠀⠀⠀⣙⣮⡇⠀⠀⠀⢀⡯⢸⡾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠳⣄⠀⠀⢀⣿⡛⠶⠲⣆⢾⠀⠀⠀⠘⡆⣀⡴⠛⠉⠀⠙⢲⣄⠀⣼⠡⢸⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣧⣠⠟⠀⠈⠙⢧⡞⣿⠖⠶⠦⣔⢹⡼⠀⣀⡤⠖⠖⠶⠾⢷⣿⡔⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡿⠳⠶⠤⣤⣀⠠⠹⣾⠀⠠⠀⢩⢯⣷⡾⠉⠀⠀⢀⣠⠴⠶⠚⢳⣼⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠋⠀⠀⠀⠀⠀⠈⠓⣆⢸⠛⠉⠛⠲⢮⣿⡇⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⠀⠀⠀⠀⠐⢹⣷⠁⣾⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡴⠴⠴⢤⣄⠉⢻⣰⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠀⠀⠈⠻⢜⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`

const heartChars = [];

function processHeart() {
  const lines = heartASCII.trim().split('\n');
  lines.forEach((line, row) => {
    [...line].forEach((char, col) => {
      if (char !== '⠀') {
        heartChars.push({
          char,
          x: col,
          y: row
        });
      }
    });
  });

  // Calcular largura e altura do coração baseado no ASCII
  const lineLengths = lines.map(line => line.length);
  heartWidth = Math.max(...lineLengths);
  heartHeight = lines.length;
}

let heartWidth = 0;
let heartHeight = 0;

processHeart();

let heartIndex = 0;
let heartFullyFormed = false;
let blinkVisible = true;
let blinkTimer = 0;
const blinkInterval = 500; // ms

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
    // Controle de velocidade - quantos caracteres são desenhados por frame
    const charsPerFrame = 10; // ← Altere este valor para controlar a velocidade
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
    // Piscar coração completo
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

button.addEventListener('click', () => {
  button.style.display = 'none';
  canvas.style.display = 'block';
  setInterval(drawMatrix, 50);
});