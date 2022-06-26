var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

var counter  = 0

function draw() {
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    //...drawing code...
    ctx.fillStyle = "red";
    if(counter % 300 < 150) {
        ctx.beginPath();
        ctx.arc(window.innerWidth*4/5, window.innerHeight*1/5, 5, 0 , 2 * Math.PI);
        ctx.fill();
    }
    if(counter % 295 < 147.5) {
        ctx.beginPath();
        ctx.arc(window.innerWidth*3/5, window.innerHeight*1/5, 5, 0 , 2 * Math.PI);
        ctx.fill();
    }
    if(counter % 290 < 145) {
        ctx.beginPath();
        ctx.arc(window.innerWidth*4/5, window.innerHeight*2/5, 5, 0 , 2 * Math.PI);
        ctx.fill();
    }
    if(counter % 285 < 142.5) {
        ctx.beginPath();
        ctx.arc(window.innerWidth*3/5, window.innerHeight*2/5, 5, 0 , 2 * Math.PI);
        ctx.fill()
    }

    counter++
}

setInterval(draw,5);