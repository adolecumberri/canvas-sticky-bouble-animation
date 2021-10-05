
//1st canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// console.log(canvas);
canvas.width = window.innerWidth;
//Height no se esta cogiendo correctamente si se accede directamente a él
canvas.setAttribute('height', window.innerHeight);

//2nd canvas
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
bgCanvas.width = window.innerWidth;
bgCanvas.setAttribute('height', window.innerHeight);


//velocidad Y (vertical)
let vSpeedHigh = 0.0001;
// velocidad de "shrink"
let sSpeedHigh = 0.0136;
//color
let colorHigh = '#ffc2c2';

//referencias a los elementos html directa por id
highVSpeed.value = vSpeedHigh;
highSSpeed.value = sSpeedHigh;
highColor.value = colorHigh;



//Arrays con las burbujas de cada tipo de canvas.
let bubbles = [];
let bgBubbles = [];

function addBubble() {
    if(sSpeedHigh === 0){
        debugger;
    }
    bubbles.push(new Bubble(colorHigh, 2.5, vSpeedHigh, sSpeedHigh));
}

function addBgBubble() {
    bgBubbles.push(new Bubble(colorHigh, 1.8, vSpeedHigh, sSpeedHigh));
}



class Bubble {
    constructor(color, initialYSpeed, ySpeed, shrinkSpeed) {
        this.radius = (Math.random() * 150) + 30;
        this.life = true;
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * 20) + window.innerHeight + this.radius;
        this.vy = ((Math.random() * 0.0002) + 0.001) + initialYSpeed; //vy = velocity Y.
        this.ySpeed = ySpeed;
        this.vr = 0;
        this.vx = ((Math.random() * 4) - 2);  //shrink speed
        this.color = color;
        this.shrinkSpeed = shrinkSpeed;

        if(
        isNaN(this.shrinkSpeed) || 
        isNaN(this.ySpeed) || 
        isNaN(ySpeed) || 
        isNaN(this.y) || 
        isNaN(this.vr) || 
        isNaN(this.radius) ||
        this.shrinkSpeed === 0
        ){
            debugger;
        }

    }

    update() {
        this.vy += this.ySpeed; //vy => velocidad eje Y. velocidad a la que sube (acumulativo)
        this.vr += this.shrinkSpeed; //vr => velocidad radio. velocidad a la que mengua la burbuja (acumulativo)
        this.y -= this.vy;
        this.x += this.vx;
        // console.log(this.radius);
        if( this.vr === 0 || this.shrinkSpeed === 0 ){
            debugger;
        }
        if (this.radius > 1) {
            this.radius -= this.vr;
        }
        if (this.radius <= 1) {
            this.life = false;
        }
    }

    draw(currCtx) {
        currCtx.beginPath();
        currCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        currCtx.fillStyle = this.color;
        currCtx.fill();
    }
}

function handleBubble() {
    /* trick para crear un array que elimina elementos de si mismo. 
    slice devuelve una copia del mismo array, 
    del cual puedo borrar elementos */
    // bubbles.slice(0).forEach( (bubble, i) => {
    //     bubble.update();
    //     if(!bubble.life){ //bubble life === false
    //         bubbles.splice(i, 1);
    //     }
    // });

    /* CODIGO VALIDO: for loop pero yendo hacia atras, 
    así aunque elimines elementos, 
    no interfiere en el comportamieto del bucle. */
    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].update();
        if (!bubbles[i].life) {
            bubbles.splice(i, 1);
        }
    }

    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].update();
        if (!bgBubbles[i].life) {
            bgBubbles.splice(i, 1);
        }
    }

    //    addBubble();

    // bgBubbles.slice(0).forEach( (bubble, i) => {
    //     bubble.update();
    //     if(!bubble.life){ //bubble life === false
    //         bgBubbles.splice(i, 1);
    //     }
    // });

    if (bubbles.length < (window.innerWidth / 4)) {
        addBubble();
    }

    if (bgBubbles.length < (window.innerWidth / 12)) {
        addBgBubble();
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.getAttribute('height'));
    bgCtx.clearRect(0, 0, bgCanvas.width, canvas.getAttribute('height'));

    handleBubble();

    for (let i = bubbles.length - 1; i >= 0; i--) {
        bubbles[i].draw(ctx);
    }


    for (let i = bgBubbles.length - 1; i >= 0; i--) {
        bgBubbles[i].draw(bgCtx);
    }


    // bubbles.forEach( bubble => {
    //     bubble.draw(ctx);
    // });


    // bgBubbles.forEach( bgBubble => {
    //     bgBubble.draw(bgCtx);
    // });

    requestAnimationFrame(animate);
}

window.addEventListener('load', animate);

window.addEventListener('resize', function () {

    canvas.setAttribute('width', window.innerWidth);

    canvas.setAttribute('height', window.innerWidth);

    bgCanvas.setAttribute('width', window.innerWidth);

    bgCanvas.setAttribute('height', window.innerWidth);

    bubbles = [];
    bgBubbles = [];
});



const handlePanel = (type, value) => {
    // console.log(type, value);
    // debugger;
    switch (type) {
        case "vSpeed":
            vSpeedHigh = parseFloat(value);
            break;

        case "sSpeed":
            sSpeedHigh = parseFloat(value);
            break;

        case "color":
            colorHigh = value;
            break;
    }
}


setInterval( () => {
console.log("bubbles: " + bubbles.length);
// console.log("bg bubbles: " +bgBubbles.length);

}, 1000);
