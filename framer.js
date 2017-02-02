(function() {
    /*
    *   https://github.com/bmcmahen/canvas-image-cover
    */
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = offsetX ? offsetX : 0.5;
        offsetY = offsetY ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;
            
        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   /// new prop. width
            nh = ih * r,   /// new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (nh < h) ar = h / nh;
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }

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
        var offsetX = 0;
        var offsetY = 0;
        var width = 500;    
        var height = 500;
        
        image.onload = function() {
            drawImageProp(context, image, x, y, width, height, offsetX, offsetY)
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
