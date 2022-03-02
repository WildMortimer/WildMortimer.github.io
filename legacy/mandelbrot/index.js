
var centerX = 0
var centerY = 0
var scale = 1
var max_iteration = 80

var lastTimeout;

function update(param) {

    clearTimeout(lastTimeout)
    lastTimeout = setTimeout(() => {updateHelper(param)}, 5)
    
}
function updateHelper(param) {
    console.log("here")
    if(param == "centerX") centerX = document.getElementById(param).value
    if(param == "centerY") centerY = document.getElementById(param).value
    if(param == "scale") scale = Math.pow(document.getElementById(param).value,2)
    linectx.clearRect(0,0,linecanvas.width, linecanvas.height);
    drawVisualization();
    draw()
}

var slider = document.getElementById("scale");
var output = document.getElementById("demo");
output.innerHTML = Math.pow(slider.value,2);

slider.oninput = function() {
  output.innerHTML = Math.pow(slider.value,2);
}

var canvas = document.getElementById('mandelbrot');
var ctx = canvas.getContext('2d');

var linecanvas = document.getElementById('line');
var linectx = linecanvas.getContext('2d');

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function draw() {

if (canvas.getContext) {

    var ctx = canvas.getContext('2d');


    for(var i = 0; i < canvas.width; ++i) {
        for(var j = 0; j < canvas.height; ++j) {

            var x0 = (i - canvas.width/2)/(scale * canvas.width/4) - centerX
            var y0 = (canvas.height/2 - j)/(scale * canvas.height/4) - centerY

            var x = 0
            var y = 0

            var iteration = 0

            while (x*x + y*y <= 4 && iteration < max_iteration) {
                var xtemp = x*x - y*y + x0
                y = 2*x*y + y0
                x = xtemp
                iteration = iteration + 1
            }

            if(iteration >= max_iteration) {

                ctx.fillStyle = 'rgb(0, 0, 0)';
            }
            ///}
            //else if( iteration >= 1 && iteration < 5){
            //    ctx.fillStyle = 'rgb(255, 0, 0)'
            //}
            //else if( iteration >= 5 && iteration < 10){
            //    ctx.fillStyle = 'rgb(0, 255, 0)'
            //}
            //else if( iteration >= 10 && iteration < 15){
            //    ctx.fillStyle = 'rgb(0, 0, 255)'
            //}
            else {
                ctx.fillStyle = 'hsl(' + Math.floor(360 * (iteration + 1 - Math.log(Math.log2(Math.sqrt(x*x + y*y)))) / max_iteration)  + ',100%, 50%)'
            }
            ctx.fillRect(i, j, 1, 1);


        }
    }
}
}

draw()

function getMousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [x,y]
}

let i0
let j0
let i1
let j1
let moving = false;

let lastPoints = [0]

function drawVisualization() {
    linectx.strokeStyle = 'rgb(0, 255, 255)';
    linectx.beginPath();       // Start a new path
    linectx.moveTo((lastPoints[0][0] + centerX) * (scale * canvas.width/4) + canvas.width/2 , 
                   -((lastPoints[0][1] + centerY) * (scale * canvas.width/4) - canvas.width/2));    // Move the pen to (30, 50)


    lastPoints.forEach((n) => {
        linectx.lineTo((n[0] + centerX) * (scale * canvas.width/4) + canvas.width/2 , 
        -((n[1] + centerY) * (scale * canvas.width/4) - canvas.width/2));    // Move the pen to (30, 50)

    })
    linectx.stroke();
}

linecanvas.addEventListener("mousedown", function(e)
{
    if(e.button == 0) {
        linectx.clearRect(0,0,linecanvas.width, linecanvas.height);
        drawVisualization();

        if(!moving) {
            i0 = getMousePosition(canvas, e)[0]
            j0 = getMousePosition(canvas, e)[1]
            moving = true;
        }
    }
    if(e.button == 2) {
        moving = false
        linectx.clearRect(0,0,linecanvas.width, linecanvas.height);
        info = document.getElementById("pointInfo")
        i = getMousePosition(canvas, e)[0]
        j = getMousePosition(canvas, e)[1]

        var x0 = (i - canvas.width/2)/(scale * canvas.width/4) - centerX
        var y0 = (canvas.height/2 - j)/(scale * canvas.height/4) - centerY

        var x = 0
        var y = 0

        var iteration = 0

     

        let points = [];
        while (x*x + y*y <= 4 && iteration < max_iteration) {

            var xtemp = x*x - y*y + x0
            y = 2*x*y + y0
            x = xtemp
            iteration = iteration + 1
            points.push([x,y])
            
        }

        lastPoints = points;

        drawVisualization()

        info.innerHTML = "(" + x0 + " ," + y0 + " )" + " Itterations: " + iteration
    }
});

linecanvas.addEventListener("mouseup", function(e)
{
    if(moving) {
        i1 = getMousePosition(canvas, e)[0]
        j1 = getMousePosition(canvas, e)[1]
    
        centerX += ((i1 - canvas.width/2)/(scale * canvas.width/4) - centerX) - ((i0 - canvas.width/2)/(scale * canvas.width/4) - centerX)
        centerY += ((canvas.height/2 - j1)/(scale * canvas.height/4) - centerY) - ((canvas.height/2 - j0)/(scale * canvas.height/4) - centerY)


        centerX = clamp(centerX, -2, 2);
        centerY = clamp(centerY, -2, 2);
        draw();


        moving = false;
    }
    linectx.clearRect(0,0,linecanvas.width, linecanvas.height);
    drawVisualization();
})

linecanvas.addEventListener("mousemove", function(e)
{
    if(moving) {
        let i = getMousePosition(canvas, e)[0]
        let j = getMousePosition(canvas, e)[1]

        linectx.clearRect(0,0,linecanvas.width, linecanvas.height);
        drawVisualization();


        linectx.fillStyle = 'rgb(0, 255, 255)';
        linectx.fillRect(i0-1, j0-1, 3, 3);
        linectx.fillStyle = 'rgb(0, 255, 255)';
        linectx.fillRect(i-1, j-1, 3, 3);

        linectx.strokeStyle = 'rgb(0, 255, 255)';
        linectx.beginPath();       // Start a new path
        linectx.moveTo(i0, j0);    // Move the pen to (30, 50)
        linectx.lineTo(i, j);  // Draw a line to (150, 100)
        linectx.stroke();
    }
});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  }, false);