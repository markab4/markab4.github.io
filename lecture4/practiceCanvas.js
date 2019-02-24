let ball = {
    x: 10,
    y: 10,
    xInc: 3,
    yInc: 3,
    scale: 1,
    img: document.getElementById("basketball"),
    rotation: 0,

    // Draw the ball
    draw: function() {
        let ballCenter = {
            x: this.x + this.img.width / 2,
            y: this.y + this.img.height / 2
        };
        context.translate(ballCenter.x, ballCenter.y);
        this.rotation += 0.01;
        context.rotate(this.rotation);
        context.translate(-ballCenter.x, -ballCenter.y);
        context.scale(this.scale, this.scale);
        context.drawImage(this.img, this.x, this.y);

    },

    // Move the ball
    move: function() {
        this.x += this.xInc;
        this.y += this.yInc;

        // Bounce off the left and right canvas edges
        if (this.x < 0 || this.x + this.img.width > canvas.width) {
            this.xInc *= -1;
            this.scale += 0.1;
        }
        if (this.y < 0 || this.y + this.img.height > canvas.height) {
            this.yInc *= -1;
            this.scale += 0.1;
        }
    }
};

let canvas = document.getElementById("myCanvas"),
    context = canvas.getContext("2d");

// Draw initial ball
ball.draw();

let animFrameId;

// Start the animation when the mouse is on the canvas
canvas.addEventListener("mouseover", function(e) {
    animFrameId = window.requestAnimationFrame(drawFrame);
});

// Stop the animation when the mouse is moved off the canvas
canvas.addEventListener("mouseout", function(e) {
    window.cancelAnimationFrame(animFrameId);
});

// Draw a single frame
function drawFrame() {
    context.save();
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);

    ball.draw();
    ball.move();

    context.restore();
    animFrameId = window.requestAnimationFrame(drawFrame);
}