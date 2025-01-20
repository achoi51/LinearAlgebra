// fs is used to read and write files, while canvas is used to create and manipulate images
const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

function getReflectMatrix(axis){
    let matrix;
    if(axis === 'x'){
        // Reflection over the x-axis -> flips the image vertically
        matrix = [
            [1, 0, 0],
            [0, -1, 0], // Reflect over the y-axis
            [0, 0, 1]
        ];
    }else if (axis === 'y'){
        // Reflection over the y-axis -> flips the image horizontally
        matrix = [
            [-1, 0, 0], // Reflect over the x-axis
            [0, 1, 0],
            [0, 0, 1]
        ];
    }else{
        throw new Error("Invalid axis :(");
    }
    return matrix;
}

// Function to get a rotation matrix for a given degree
function getRotationMatrix(degrees){
    const rad = degrees * (Math.PI / 180); // degrees to radians
    // formula for a rotation matrix rotating counterclockwise by theta
    return [
        [Math.cos(rad), -Math.sin(rad), 0],
        [Math.sin(rad), Math.cos(rad), 0],
        [0, 0, 1]
    ];
}

// Function to get a custom transformation matrix
function getCustomMatrix(){
    return [
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1]
    ];
}

// Function to get a scaling matrix
function scaleMatrix(sx, sy){
    return [
        [sx, 0, 0], // Scale x-axis by sx
        [0, sy, 0], // Scale y-axis by sy
        [0, 0, 1]
    ];
}

// Function to multiply a 3x3 matrix with a 2D vector
function multiply(matrix, vector){
    const vec = [vector[0], vector[1], 1]; // Convert to homogeneous coordinates
    let result = [0, 0, 0];

    for(let i = 0; i < 3; i++) for(let j = 0; j < 3; j++) result[i] += matrix[i][j] * vec[j]; 

    return [result[0], result[1]]; // Convert back to 2D coordinates
}



// Function to apply any transformation matrix to an image
async function transformImage(inputPath, outputPath, transformationMatrix){
    loadImage(inputPath).then(image => {
        // Create a canvas + get pixel data of the image
        const {width, height} = image;
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const newImage = ctx.createImageData(width, height);
        const newData = newImage.data;

        // Loop through each pixel in the image
        for(let y = 0; y < height; y++) for(let x = 0; x < width; x++){
            // Apply the matrix to each pixel
            let [newX, newY] = multiply(transformationMatrix, [x-width / 2, y-height / 2]);
            newX = Math.round(newX + width / 2);
            newY = Math.round(newY + height / 2);

            // Check if the new coordinates are within the bounds of the image so we don't overflow
            if(newX >= 0 && newX < width && newY >= 0 && newY < height){
                // Copy the pixel data to the new position
                const oldI = (y * width + x) * 4;
                const newI = (newY * width + newX) * 4;
                newData[newI] = data[oldI]; // Red
                newData[newI + 1] = data[oldI + 1]; // Green
                newData[newI + 2] = data[oldI + 2]; // Blue
                newData[newI + 3] = data[oldI + 3]; // Alpha
            }
        }



        // Draw the transformed image on the canvas + save it
        ctx.putImageData(newImage, 0, 0);
        const out = fs.createWriteStream(outputPath);
        const stream = canvas.createJPEGStream();
        stream.pipe(out);
        out.on('finish', () => console.log('Saved to', outputPath));
    }).catch(error => {
        console.error("Error while processing the image! :(", error);
    });
}

// examples
transformImage('input.jpg', 'output_x.jpg', getReflectMatrix('x'));
transformImage('input.jpg', 'output_y.jpg', getReflectMatrix('y'));
transformImage('input.jpg', 'output_rotated.jpg', getRotationMatrix(100));
transformImage('input.jpg', 'output_scaled.jpg', scaleMatrix(0.65, 1.5));
transformImage('input.jpg', 'output_custom.jpg', getCustomMatrix());

transformImage('test.jpg', 'output_x2.jpg', getReflectMatrix('x'));
transformImage('test.jpg', 'output_y2.jpg', getReflectMatrix('y'));
transformImage('test.jpg', 'output_rotated2.jpg', getRotationMatrix(100));
transformImage('test.jpg', 'output_scaled2.jpg', scaleMatrix(0.65, 1.5));
transformImage('test.jpg', 'output_custom2.jpg', getCustomMatrix());