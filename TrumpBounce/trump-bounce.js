let head = {
    x: 10,
    y: 10,
    xInc: 3,
    yInc: 3,
    scale: 1,
    img: document.getElementById("head"),
    rotation: 0,

    // Draw the head
    draw: function() {
        let headCenter = {
            x: this.x + this.img.width / 2,
            y: this.y + this.img.height / 2
        };
        context.translate(headCenter.x, headCenter.y);
        this.rotation += 0.01;
        context.rotate(this.rotation);
        context.scale(this.scale, this.scale);
        context.translate(-headCenter.x, -headCenter.y);

        context.drawImage(this.img, this.x, this.y);
    },

    // Move the head
    move: function() {
        this.x += this.xInc;
        // Bounce off the left and right canvas edges
        if (this.x < 0 || this.x + this.img.width > canvas.width) {
            this.xInc *= -1;
            this.scale += 0.1;
        }

        this.y += this.yInc;
        if (this.y < 0 || this.y + this.img.height > canvas.height) {
            this.yInc *= -1;
            this.scale += 0.1;
        }
    }
};

let canvas = document.getElementById("myCanvas"),
    context = canvas.getContext("2d");

// Draw initial head
head.draw();

let animFrameId;

// Start the animation when the mouse is on the canvas
canvas.addEventListener("mouseover", function() {
    animFrameId = window.requestAnimationFrame(drawFrame);
});

// Stop the animation when the mouse is moved off the canvas
canvas.addEventListener("mouseout", function() {
    window.cancelAnimationFrame(animFrameId);
});

// Draw a single frame
function drawFrame() {
    context.save();
    context.beginPath();
    context.clearRect(0, 0, canvas.width, canvas.height);

    head.draw();
    head.move();

    context.restore();
    animFrameId = window.requestAnimationFrame(drawFrame);
}