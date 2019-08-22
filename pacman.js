// Setup initial game stats
let score = 0;
let lives = 2;
let powerPellets = 4;


// Define your ghosts here
const inky = {
  menuOption: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};


const blinky = {
  menuOption: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

const pinky = {
  menuOption: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

const clyde = {
  menuOption: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

// let ghosts =['inky', 'blinky', 'pinky', 'clyde']
let ghosts = [inky, blinky, pinky, clyde]



// replace this comment with your four ghosts setup as objects


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(() => {
    displayStats();
    displayPowerPellets();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log(`Score: ${score}     Lives: ${lives}`);
}

function displayPowerPellets() {
  console.log(`\n\nPower-Pellets: ${powerPellets}`);
}


function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power-Pellet');
  console.log('(q) Quit');
  ghosts.forEach(function(ghost, i) {
    i++
    if (ghost.edible == false) {
  console.log (`(${i}) Eat ${ghost.name} -- (inedible)`)
    } else if (ghost.edible == true) {
  console.log (`(${i}) Eat ${ghost.name} -- (edible)`)
    }
  })
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatPowerPellet() {
  if (powerPellets > 0) {
  console.log('\nYummm!');
  score += 50;
  powerPellets -= 1;
    ghosts.forEach(ghost => {
      ghost.edible = true;
    });
    }
  }

function eatGhost(index) {
  let ghost = ghosts[index]
  if (!ghost.edible) {
    lives -= 1;
    console.log(`\nPac-Man was killed by ${ghost.name} with the colour ${ghost.colour}`);
    } else if (ghost.edible) {
      score += 200;
      console.log(`\nPac-Man ate ${ghost.name} whose colour was ${ghost.colour}`);
      ghost.edible = false;
    }
  }


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
        if (powerPellets === 0) {
          console.log('\nNo Power-Pellets Left')
        } else if (powerPellets > 0) {
          eatPowerPellet();
        }
      break;
    case '1':
      eatGhost(0);
      break;
    case '2':
      eatGhost(1);
      break;
    case '3':
      eatGhost(2);
      break;
    case '4':
      eatGhost(3);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', (key) => {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 1000); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', () => {
  console.log('\n\nGame Over!\n');
});
