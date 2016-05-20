(function(){
    function init(){
        var diagram = new CircleDiagram('.diagram', 300, 300);
        var load = new CircleLoad('.diagram', false, false, 'rgb(0, 0, 0)', 'rgb(0,255,0)', 'rgb(100,100,100)');
        var range = document.querySelector('input[type=range]');
        range.addEventListener('change', function(){
           load.Draw(range.value); 
        });
    }
    window.addEventListener('load', init);
})();