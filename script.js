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

const heartASCII = 
`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣶⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣷⣦⡀⣾⠿⣷⡰⠃⢠⡾⠉⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢠⡹⣿⣓⠈⢽⣯⡿⡸⢺⣿⣿⠘⠇⡄⢀⠰⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⠂⠓⠈⠁⣬⢃⢾⠒⠉⠐⠳⣆⡰⠲⠃⠠⠙⣦⠹⢲⡑⢧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣸⠁⢀⠎⢀⠡⢶⣬⣒⣶⣿⣷⣧⣤⡦⡌⣿⡡⢭⣼⣆⠡⣘⣘⢿⡦⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣣⠖⠃⣼⣿⣿⣿⢟⡭⠉⠛⠛⠛⠿⣿⢠⣧⠽⣮⢍⡿⡜⢄⢡⢿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣵⠋⠠⣰⣿⠥⣿⡿⢠⠃⢠⣶⣤⣤⣤⢦⡜⣀⠒⠘⢿⣦⣻⠌⢢⠴⡟⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣿⡿⠂⠀⣰⡟⢉⣖⣿⡋⠞⣴⣿⣿⣿⣿⡿⠟⠞⠲⠂⠥⡘⣿⣿⣯⢖⡄⡷⣲⣻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣼⣿⣿⠟⠁⠀⢠⡏⠐⠀⠎⠉⣡⣴⣤⣼⣿⣿⣿⣷⣶⣾⣷⣶⣦⣄⠹⢿⣿⣿⡼⠜⣱⡙⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⣿⠁⠀⠀⢀⣼⣇⡀⠀⢠⠖⢋⠛⠹⣿⣿⣿⣿⣿⣿⠟⠉⡩⣉⠻⣷⣿⡞⢿⣿⡷⡐⣻⡹⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⠃⠀⠀⢠⡾⢟⣩⠅⠀⢘⣶⡇⠐⠀⢤⣿⣿⣿⣿⡏⡆⠀⠀⣹⣷⢘⣿⣟⣸⣿⣿⡧⡐⡹⡿⣧⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⠇⠀⠀⠀⣿⢟⣾⠀⡑⠀⢠⣎⡓⠦⢌⣪⣿⣿⣿⢯⡀⣝⡲⣓⣋⣵⣻⣿⣿⣇⢾⣿⣿⣧⡽⣮⣿⣇⢀⡀⠀⠀⠀⡀⢆
⠀⠀⠀⠀⠀⠀⣠⣿⣿⣿⡟⠀⠀⠀⣼⣿⡿⢃⠜⡀⠀⠍⣻⢿⣻⣿⣿⣿⣿⠉⠾⣽⣞⡽⣣⢏⣶⣿⣿⡏⡉⠘⣿⣿⣿⣷⢻⡞⣿⢀⠜⡀⠀⢀⠘⠤
⠀⠀⠀⠀⠀⣴⣿⣿⣯⣹⡢⠀⠀⢨⣿⡟⢀⡈⠤⠁⠀⠀⠈⣿⣷⣿⣿⡿⢿⡦⢌⣻⣿⣞⣷⣿⣿⣿⠏⠐⠀⠀⢻⣿⣟⠭⣶⡻⡽⡎⠘⠀⠀⠀⠈⠂
⠀⠀⠀⠀⣼⣿⣿⣽⣾⠋⠁⠀⢠⣿⡟⢀⠒⢀⠀⠀⠀⠀⠀⠀⢻⣿⣿⡿⢿⡗⠻⣿⣿⣿⣿⣿⡿⠋⠀⠂⠀⠀⠺⣿⣿⣿⣿⣿⡽⣆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣼⣿⣿⣿⣿⣿⡏⠀⢠⣿⡟⠀⢂⣩⣠⣆⠒⢭⠀⠀⠀⠀⠘⢿⣷⣶⣬⣅⣤⣿⣿⡿⠋⠔⡀⢀⡁⢀⡠⠄⢿⣿⣿⣿⣿⣿⣿⡄⠀⠀⠀⠀⠀
⠀⠀⣸⣿⣿⣿⣿⣿⡿⠀⢀⣾⡛⠐⠑⣓⠶⣙⠛⠳⡌⠉⢠⡌⠀⠙⡶⣝⠿⣿⣿⣿⠿⣋⠰⢉⡐⢀⠂⡰⠀⡍⠚⠸⣿⣿⣿⣿⣿⣿⣶⡀⠀⠀⠀⠀
⠀⢠⣿⣿⣿⣿⣿⣿⡁⡶⢾⣿⣿⣿⡿⣏⠜⠈⢣⠘⠙⢒⢸⡆⡀⠀⠉⢿⣿⣾⣿⣶⣣⢌⢣⠂⡔⢢⡱⠖⣌⠑⠀⣤⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀
⠀⢸⣿⣿⣿⣿⣿⠓⢈⣿⣻⢾⡿⣽⡳⣭⢚⡄⠀⠣⠀⠆⡸⠎⣷⣦⣆⡀⠹⣿⣿⡿⣵⣋⢦⡱⣌⢶⡝⠀⠸⠀⢺⣿⣯⢿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀
⠀⠸⣿⣿⣿⣻⣽⣪⣼⣯⣽⢿⡽⣾⠽⣣⢏⡜⠀⡄⠁⠀⠃⢎⣿⣿⣿⡿⡶⣄⡙⢻⡷⣏⣧⢷⣯⢿⡌⠀⠈⠄⠘⢿⣿⠏⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀
⠀⠀⠙⠹⠟⠿⠯⠟⠷⡛⡞⠏⡽⠁⢋⡅⠠⠀⡌⠐⡀⠀⠃⠊⣿⣿⣿⡻⣝⣣⢎⡵⣻⡼⣯⢿⣾⣿⡝⠀⠀⢂⠀⠌⠛⣦⣽⣿⣿⣿⣿⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡏⠃⠈⡖⢤⠃⠌⡡⠆⡀⢠⠐⠯⣍⣾⠱⢏⡖⣣⢞⡵⡿⣝⣯⣽⡱⢔⡀⡤⢋⠦⣥⢠⠀⣌⡹⢉⡟⣫⡤⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⠀⡀⣟⡤⡓⠆⣡⢃⡘⠠⣟⡷⣶⣬⣓⠲⣘⠢⠏⢻⡴⣛⣭⣶⣿⣏⡞⡱⢎⠳⣨⠗⡤⢶⣁⢨⣿⣿⢳⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣄⠀⢛⣶⣇⠣⡐⢎⠰⠘⡼⣯⣝⣷⢿⣁⠀⠙⠚⠀⣹⣿⣿⣿⣿⣞⡼⣝⢮⡳⡝⢆⣌⢳⡬⢤⣍⣿⣾⠆⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣷⡌⠸⣿⠀⡱⢪⠐⡌⢟⡷⣯⢿⣯⣏⠀⠀⠔⢨⣽⣿⣿⣿⣿⣯⡽⣞⣧⣻⡝⢈⡼⡋⢞⡸⡆⣿⢻⣇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⣯⣼⣿⡇⠰⢜⡇⠀⠯⣻⢟⣯⢳⣦⣀⢈⠀⠀⣽⣿⣿⡟⣯⣿⣻⣽⣳⢧⠏⢼⡖⣇⠸⣽⡹⣿⣿⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡯⣷⠲⣿⣷⠐⣞⠆⢩⡐⣮⢫⢨⣟⣧⡄⠸⠀⠠⣩⣿⡻⢿⣹⣷⣻⢷⣻⢯⠁⢪⡽⣞⣼⢣⣷⡹⢿⡁⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⣧⣿⣧⣹⢹⢘⡼⠃⠒⡄⢻⣟⣷⣾⣽⡁⠐⠀⠜⣈⣻⣟⡿⣯⣷⢯⡿⣽⠎⣸⢲⡻⣜⢮⡗⣎⠃⡛⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡋⣿⣿⡏⣿⢸⡜⢼⡡⠌⡰⠊⣟⣿⣡⣾⡟⠰⢨⡐⠘⣻⡽⣿⢯⣟⣯⢟⡳⢙⡧⣛⢱⢏⡞⢽⡞⡞⠑⣧⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣽⣜⣸⣡⡼⣅⢣⢐⠣⡘⣽⣷⣼⡿⠇⢅⣈⠺⠽⣟⡾⣟⣮⣟⡮⠇⣾⢳⡍⡞⣎⠼⢨⠅⣧⠋⡟⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣟⡯⢸⣳⠹⣆⢡⢊⡕⢠⠹⣿⣛⣷⡆⢉⣀⠒⣾⡟⣽⢻⡼⣞⡝⢨⢏⡓⢼⡱⢮⡙⡠⢱⢹⡸⡙⠆⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⠉⠇⢸⣭⢓⡎⢆⡡⠆⠠⠄⢇⢻⣦⢤⠘⠃⣄⣴⣻⣭⠷⣻⣜⡃⢠⢛⡞⣧⡙⣦⠑⣡⠰⣈⣇⢸⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⡟⢼⡿⠌⣀⠊⢶⣩⠒⢢⢑⡂⢄⠃⢘⣯⢦⡟⠠⡖⠐⣉⣳⢞⣌⢳⡪⢤⢘⡈⡇⢧⡜⣡⢏⠴⣡⠳⡌⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣷⢻⢼⠀⡣⠘⡔⢢⠙⡄⠣⢌⠂⢠⣿⣮⢶⡟⠰⢠⠐⢏⡷⣫⠼⣦⡙⢮⡐⠃⣹⠲⢜⡠⢏⠲⢡⠟⠑⡇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠁⢼⡘⢀⡁⠌⡄⣇⠒⡌⢣⠈⢠⠈⠻⣿⣾⠙⠐⠀⠐⠋⣏⡳⢛⠶⠙⠀⠀⠀⠣⣘⠠⡅⢸⢡⠸⣎⠇⡅⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⢈⠃⠗⠠⠄⠂⡘⢆⠇⠘⠠⠁⠀⠈⠠⢈⠙⠣⣟⣯⢧⠰⠋⠁⠠⠀⠀⠀⠀⠀⠀⠀⠓⢬⢣⠰⡁⢻⡴⠃⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀`;

const heartChars = [];

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

let heartWidth = 0;
let heartHeight = 0;

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
    const charsPerFrame = 10;
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

button.addEventListener('click', () => {
  button.style.display = 'none';
  canvas.style.display = 'block';
  resizeCanvas();
  setInterval(drawMatrix, 50);
});
