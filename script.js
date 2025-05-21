document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("animated-grid-canvas");
  if (!canvas) {
    console.error("Canvas element #animated-grid-canvas not found.");
    return;
  }
  const ctx = canvas.getContext("2d");

  // Grid Properties
  const gridSize = 50;
  const dotColor = "rgba(255, 255, 255, 0.1)";
  const dotSize = 2; // Size of the dots at intersections

  // Parallax Variables
  let mouseX = 0;
  let mouseY = 0;
  let offsetX = 0;
  let offsetY = 0;
  const parallaxStrength = 0.05;

  // Animation offset for subtle movement
  let animationOffsetX = 0;
  let animationOffsetY = 0;

  // Resize Handler
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // No need to call drawGrid here, animate loop will handle it
  }

  // Drawing Function
  function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = dotColor;

    // Calculate effective offsets for parallax + animation
    const currentParallaxX = offsetX * parallaxStrength;
    const currentParallaxY = offsetY * parallaxStrength;

    const totalOffsetX = currentParallaxX + animationOffsetX;
    const totalOffsetY = currentParallaxY + animationOffsetY;

    // Calculate grid starting positions with offsets
    const startX = 0 - (totalOffsetX % gridSize);
    const startY = 0 - (totalOffsetY % gridSize);

    // Draw dots at intersections
    for (let x = startX; x < canvas.width; x += gridSize) {
      for (let y = startY; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Animation Loop
  function animate() {
    // Subtle independent animation
    animationOffsetX += 0.05;
    animationOffsetY -= 0.03; 

    drawGrid();
    requestAnimationFrame(animate);
  }

  // Mouse Move Handler
  function handleMouseMove(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;

    // Update parallax offsets based on mouse position relative to center of screen
    offsetX = mouseX - window.innerWidth / 2;
    offsetY = mouseY - window.innerHeight / 2;
  }

  // Initialization
  resizeCanvas(); // Initial size
  animate(); // Start animation loop

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("mousemove", handleMouseMove);
});
