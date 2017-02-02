(function() {

    function createFrame() {
        context.beginPath();
        context.moveTo(40, 50);
        context.lineTo(450, 50);
        context.lineTo(450, 450);
        context.lineTo(50, 450);
        context.lineTo(50, 50);
        context.lineWidth = 20;
        context.strokeStyle = 'white';
        context.stroke();
    }

    function exportPng() {
        var dataUrl = canvas.toDataURL('image/png');
        var result = document.getElementById('result');
        result.setAttribute('src', dataUrl);
    }            

    function renderImage(path) {
        var image = new Image();
        var x = 0;
        var y = 0;
        var width = 500;    
        var height = 500;
        
        image.onload = function() {
            context.drawImage(image, x, y, width, height);
            createFrame(context);
            exportPng();
        };
        image.src = path;
    }

    function getImage(src) {
        if(!src.type.match(/image.*/)){
            console.log('The dropped file is not an image: ', src.type);
            return;
        }

        var reader = new FileReader();
        reader.onload = function(event){
            renderImage(event.target.result);
        };
        reader.readAsDataURL(src);
    }

    function handleDropEvent(event) {   
        event.stopPropagation();
        event.preventDefault();
        getImage(event.dataTransfer.files[0]);
    }

    document.getElementById('dropIt').addEventListener('drop', handleDropEvent, false);
    document.getElementById('dropIt').addEventListener('dragover', function(event) {event.preventDefault()}, false);

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    renderImage('test.jpg');
})();
