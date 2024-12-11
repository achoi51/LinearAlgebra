// yay
function dot(vec1, vec2){
    let total = 0;
    for(let i = 0; i < vec1.length; i++){
        total += vec1[i] * vec2[i];
    }
    
    return total; 
}

function multiply(matrix1, matrix2){
    let res = [];
    
    if(matrix1[0].length != matrix2.length){
        console.log("error: matrixes not possible to be multiplied");
        return null; 
    }
    
    console.log("Dimension of matrix1: " + matrix1.length + "x" + matrix1[0].length);
    console.log("Dimension of matrix2: " + matrix2.length + "x" + matrix2[0].length);
    
    for(let i = 0; i < matrix1.length; i++){
        let resrow = [];
        
        for(let j = 0; j<matrix2[0].length; j++){
            let matrix2col = [];
            for(let k = 0; k<matrix2.length; k++){
                matrix2col.push(matrix2[k][j]);
            }
            let product = dot(matrix1[i], matrix2col)
            resrow.push(product);
            
        }
        
        res.push(resrow);
        
    }
    
    return res; 
    
}

let matrix1 = [[1, 0], [0, 1]];
let matrix2 = [[1], [2]];

console.log(multiply(matrix1, matrix2));
