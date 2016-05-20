function CircleLoad(selector, width, height, colorLoad, colorLeft, colorBG){
    if( !(this instanceof CircleLoad) ){
        return new CircleLoad(selector, width, height, colorLoad, colorLeft, colorBG);
    }
    
    var container = document.querySelector(selector),
        canvas = document.createElement( 'canvas' ),
        ctx = canvas.getContext( '2d' ),
        x = 0, y = 0,
        r = 1,
        lastProc = 0,
        draw;

    function notCanvasDraw(proc){
        var loadDiv = document.createElement('div');
        
        container.appendChild(loadDiv);
        container.style.backgoundColor = colorLeft;
        loadDiv.style.backgroundColor = colorLoad;
        loadDiv.style.height = (( !height ) ? 20 : height) + "px";
        
        notCanvasDraw = function(proc){
            loadDiv.style.width = (proc*width/100)+"px";
        };
        
        notCanvasDraw(proc);
    }

    this.Draw = function (proc) {    
        function drawArc(start, end, r, color){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc( x, y, r, start, end , false);
            ctx.lineTo( x, y );
            ctx.closePath();
            ctx.fill();
        }
        
        canvas.style.width = width+'px';
        canvas.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;

        x = Math.round( width / 2 );
        y = Math.round( height / 2 );

        r = width > height ? height : width;
        r = r * (0.9) / 2; // считаем радиус окружности как половину от 90% минимальной стороны прямоугольника.   
        
        if(!proc){
            proc = lastProc;
        }
        
        if(proc > 100){
            proc = 100;
        }
        
        lastProc = proc;
        
        ctx.fillStyle = colorBG;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        var end = 2 * Math.PI * proc / 100;
        drawArc(0, end, r, colorLoad);
        drawArc(end, 2 * Math.PI, r, colorLeft);  
        drawArc(0, 2 * Math.PI, r * 0.8, colorBG);
        ctx.font = "italic " + Math.round(r / 2) + "px Arial";//todo font-size
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(proc + "%", x, y); 
    };

    if(!colorLoad){
        colorLoad = "rgb(124, 252, 0)";
    }
    
    if(!colorLeft){
        colorLeft = "rgb(220, 220, 220)";
    }
    
    if(!colorBG){
        colorBG = "rgb(255, 255, 255)";
    }
    
    if(!ctx){
        notCanvasDraw(0);
        this.Draw = notCanvasDraw;
    }else{
        container.appendChild(canvas);
    }
    
    draw = this.Draw;
    
    if(!width || !height){
        function setSizeFromContainer(){
            width = container.clientWidth;
            height = width;
            draw();
        }
        
        setSizeFromContainer();
        if(window.addEventListener){
            window.addEventListener("resize", setSizeFromContainer);
        }else{
            if(window.attachEvent){
                window.attachEvent("onresize", setSizeFromContainer);
            }
        }
    }
    
    if(container){
       this.Draw(0);
    }
}
