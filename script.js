
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




//Arrays con las burbujas de cada tipo de canvas.
let bubbles =[];
let bgBubbles = [];

function addBubble () {
    bubbles.push(new Bubble('rgb(255,194,194)', 1.8));
}

function addBgBubble () {
    bgBubbles.push(new Bubble('rgb(255,255,255)', 2.5));
}



class Bubble {
    constructor(color, ySpeed){
        this.radius = (Math.random() * 150) + 30;
        this.life = true;
        this.x = (Math.random() * window.innerWidth);
        this.y = (Math.random() * 20) + window.innerHeight + this.radius;
        this.vy = ((Math.random() * 0.0002) + 0.001) + ySpeed; //vy = velocity Y.
        this.vr = 0;
        this.vx = ((Math.random() * 4 )  - 2);  //shrink speed
        this.color = color;
    }

    update () {
        this.vy += 0.0000001;
        this.vr += 0.009;
        this.y -= this.vy;
        this.x += this.vx;
        if(this.radius > 1){
            this.radius -= this.vr;
        }
        if( this.radius <= 1){
            this.life = false;
        }
    }

    draw (currCtx) {
        currCtx.beginPath();
        currCtx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        currCtx.fillStyle = this.color;
        currCtx.fill();
    }
}

function handleBubble () {
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
    for(let i = bubbles.length - 1; i >= 0; i--){
         bubbles[i].update();
         if(!bubbles[i].life){
             bubbles.splice(i,1);
         }
    }

    for(let i = bgBubbles.length - 1; i >= 0; i--){
        bgBubbles[i].update();
        if(!bgBubbles[i].life){
            bgBubbles.splice(i,1);
        }
   }

//    addBubble();

    // bgBubbles.slice(0).forEach( (bubble, i) => {
    //     bubble.update();
    //     if(!bubble.life){ //bubble life === false
    //         bgBubbles.splice(i, 1);
    //     }
    // });

    if(bubbles.length < (window.innerWidth / 4)){
        addBubble();
    }
    
    if(bgBubbles.length < (window.innerWidth / 12)){
        addBgBubble();
    }
}


function animate() {
    ctx.clearRect(0,0, canvas.width, canvas.getAttribute('height'));
    bgCtx.clearRect(0,0,bgCanvas.width, canvas.getAttribute('height'));

    handleBubble();

    for( let i = bubbles.length -1; i >= 0; i--){
        bubbles[i].draw(ctx);
    }

    
    for( let i = bgBubbles.length -1; i >= 0; i--){
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

window.addEventListener('resize', function() {
    
    canvas.setAttribute('width', window.innerWidth);
    
    canvas.setAttribute('height', window.innerWidth);
    
    bgCanvas.setAttribute('width', window.innerWidth);
    
    bgCanvas.setAttribute('height', window.innerWidth);

    bubbles = [];
    bgBubbles = [];
});


// setInterval( () => {
// console.log("bubbles: " + bubbles.length);
// console.log("bg bubbles: " +bgBubbles.length);

// }, 1000);
