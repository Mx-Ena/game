// Initialize canvas and game objects
const binImg = new Image();
binImg.src = "bin.png";

const bgImg = new Image();
bgImg.src = "background.jpeg";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const binWidth = 80;
const binHeight = 80;
const bin = {
	x: canvas.width / 2 - binWidth / 2,
	y: canvas.height - binHeight - 10,
	width: binWidth,
	height: binHeight
};
let trash = [];
let score = 0;

// Set up mouse event listener
canvas.addEventListener("mousemove", function(event) {
	const rect = canvas.getBoundingClientRect();
	bin.x = event.clientX - rect.left - binWidth / 2;
});

// Trash Images
const trashImages = [
	"img2.png",
	"img1.png",
  ];


  function generateTrash() {
	const trashWidth = 50;
	const trashHeight = 50;
	const trashSpeed = 5;
	const trashX = Math.random() * (canvas.width - trashWidth);
	const trashY = -trashHeight;
	const randomIndex = Math.floor(Math.random() * trashImages.length);
	const trashImg = new Image();
	trashImg.src = trashImages[randomIndex];
	trash.push({
	  x: trashX,
	  y: trashY,
	  width: trashWidth,
	  height: trashHeight,
	  speed: trashSpeed,
	  img: trashImg
	});
  }

function draw() {
	// Clear canvas and draw background image
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

	// Draw bin image
	ctx.drawImage(binImg, bin.x, bin.y, bin.width, bin.height);

	// Draw trash
	trash.forEach(function(t) {
		ctx.drawImage(t.img, t.x, t.y, t.width, t.height);
	});

	// Draw score
	document.getElementById("score").innerHTML = score;
}

// Move trash and detect collisions
function update() {
	trash.forEach(function(t) {
		t.y += t.speed;

		// Check for collision with bin
		if (t.y + t.height >= bin.y && t.x + t.width >= bin.x && t.x <= bin.x + bin.width) {
			score++;
			trash.splice(trash.indexOf(t), 1);
		}

		// Check for trash that goes offscreen
		if (t.y > canvas.height) {
			trash.splice(trash.indexOf(t), 1);
		}
	});
}

// Game loop
function gameLoop() {
	// Generate new trash at random intervals
	if (Math.random() < 0.01) {
		generateTrash();
	}

	// Update game state
	update();

	// Draw game objects
	draw();

	// Run game loop recursively
	requestAnimationFrame(gameLoop);
}

// Start game loop
gameLoop();
