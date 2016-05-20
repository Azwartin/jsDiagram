function CircleDiagram(selector, width, height){
    if( !(this instanceof CircleDiagram) ){
        return new CircleDiagram(selector, width, height);
    }
    
    var container = document.querySelector(selector),
        items = [],
        len = 0,
        canvas = document.createElement( 'canvas' ),
        ctx = canvas.getContext( '2d' ),
        x = 0, y = 0,
        r = 1;
    
    container.appendChild(canvas);

    this.Draw = function () {
        canvas.width = canvas.width;
        var i = 0,
            sum = 0;
        
        for(i = 0; i < len; i++){
            sum += parseInt(items[i].value);
        }
        
        var start = 0,
            end = 0;
        
        for(i = 0; i < len; i++){
            ctx.beginPath();
            ctx.fillStyle = items[i].style.backgroundColor;
            end = start + 2 * Math.PI * parseInt(items[i].value) / sum;
            ctx.arc( x, y, r, start, end , false);
            ctx.lineTo( x, y );
            start = end;
            ctx.closePath();
            ctx.fill();
        }
    };
       
    canvas.style.width = width+'px';
    canvas.style.height = height+'px';
    canvas.width = width;
    canvas.height = height;
    
    x = Math.round( width / 2 );
    y = Math.round( height / 2 );
    
    r = width > height ? height : width;
    r = r * (0.9) / 2; // считаем радиус окружности как половину от 90% минимальной стороны прямоугольника.   
    
    if(container){
       items = container.getElementsByTagName('input');
       len = items.length;
       for(var i = 0; i < len; i++){
            items[i].style.backgroundColor = 'rgb(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) +')';
            if(items[i].addEventListener){
                items[i].addEventListener('change', this.Draw);
            }else{
                if(items[i].attachEvent){
                    items[i].attachEvent('onchange', this.Draw);
                }
            }
        }
        
       this.Draw();
    }
}
