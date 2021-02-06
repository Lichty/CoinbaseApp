import React, { useEffect, useRef, useState } from 'react'

function Canvas({width, height, publicClient}) {

    //TODO: layer canvases
        // Grid
        // Axes
        // Legends
        // Crosshair + time and value


    const canvasRef = useRef(null);
    const [init, setInit] = useState(true);

    // Set actual size in memory (scaled to account for extra pixel density).
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    const margin = 20;

    function draw(ctx, book, high, low) {
        // Normalize coordinate system to use css pixels.
        ctx.fillStyle = "#646464";
        ctx.fillRect(0, 0, width, height);


        // ctx.fillStyle = "#000";
        // ctx.font = '18px Arial';
        // ctx.textAlign = 'center';
        // ctx.textBaseline = 'middle';
        // ctx.fillText('high: ' + high, width/2, height/2 - 10);
        // ctx.fillText('low: ' + low, width/2, height/2 + 10);
        // ctx.fillText('length: ' + book.length, width/2, height/2 + 30);


        // Draw graph frame        
        ctx.fillStyle = '#000';
        ctx.beginPath();    
        ctx.moveTo(margin, height - margin*2);
        ctx.lineTo(width - margin, height - margin*2);
        ctx.moveTo(margin*2, margin);
        ctx.lineTo(margin*2, height - margin);
        ctx.stroke();  

        var zero = height - margin*2;
        var start = margin*2;
        var graphScale = (height-margin*3)/(high-low)

        console.log(book[1][1])

        ctx.fillStyle = '#000';
        ctx.moveTo(start, zero);
        for (var i = 0; i < book.length; i++) {
            ctx.lineTo(margin*2 + i, zero - (book[i][1] - low)*graphScale/15);
            // console.log(i + ': ' + (book[i][1] - low)*graphScale);
            // console.log(i + ': ' + (book[i][1] - low)/graphScale);
        }
        ctx.stroke();
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (init) {
            context.scale(scale, scale);
            setInit(false);//
        }

        var APILoop;

        const render = () => {
            // i++;
            console.log('got here')
            publicClient.getProductHistoricRates(
                'BTC-USD', //TODO: get this from a dropdown
                {granularity: 300 }, //TODO: get this from a dropdown //This is vertical granularity
                (error, response, book) => { //TODO: add error handling
                    console.log('and here')
                    var length = book.length;
                    var low = book[0][1];
                    var high = book[0][2];
                    for (var i = 0; i < length; i++) {
                        if (book[i][1] < low) low = book[i][1];
                        if (book[i][2] < high) high = book[i][2];
                    }
                    draw(context, book, high, low);
                }
            )
        }
        render();
        APILoop = setInterval(render, 4000);

        return () => {
            clearInterval(APILoop);
        }
    }, [draw,publicClient]);

    return (
        <canvas width={width*scale} height={height*scale} style={{height:height+'px', width:width+'px', border:'1px solid red'}} ref={canvasRef}></canvas>
    )
}

export default Canvas;