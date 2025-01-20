
# Image Transformation with Matrices in JS

This is my demonstration of matrix reflection, rotations, and scaling, applied to images, for my Linear Algebra Semester 1 Reflection. It uses the canvas library for creating and manipulating images and fs for file I/O. 

I have included example images as input (input.jpg and test.jpg), but users are free to replace it with any image of their choice.

While currently only matrix reflection, rotations, and scaling are explicitly included in the program, the `transformImage` function is flexible enough to accept any transformation matrix, making it a great way to experiment with transformation matrices in 2D graphics. 

The `getCustomMatrix()` function allows for this functionality, making it easy for one to apply essentially any 3x3 transformation matrix to the image. 

I really liked the idea of using matrices as a sort of "all-in-one" transformation tool, and have experimented with manipulating images with code in the past, so I thought this would be cool to make. 
## Example Usage

1. Reflect an image across the x-axis and save it as output_x.jpg:

```javascript
transformImage('input.jpg', 'output_x.jpg', getReflectMatrix('x'));
```

2. Rotate an image by 100 degrees counterclockwise and save it as output_rotated.jpg:

```javascript
transformImage('input.jpg', 'output_rotated.jpg', getRotationMatrix(100));
```

3. Scale an image:
You can scale the image non-uniformly. For example, in order to scale by 0.65 along the x-axis and 1.5 along the y-axis, and save it as output_scaled.jpg:
```javascript
transformImage('input.jpg', 'output_scaled.jpg', scaleMatrix(0.65, 1.5));
```

4. Apply a custom transformation:
If you want to apply a custom transformation, you can define your own transformation matrix. For example, the custom matrix provided in the code:

```javascript
transformImage('input.jpg', 'output_custom.jpg', getCustomMatrix());
```
## How it works

1. **Matrix Operations:**
The transformations are defined using standard 2D homogeneous transformation matrices (3x3 matrices). These matrices allow operations (rotation, scaling, reflection, etc.) to be applied consistently. 

2. **Pixel Manipulation:**
Each pixel in the input image is transformed by multiplying its coordinates with the given transformation matrix. The resulting transformed image is then created with these new pixels. 

3. **Homogeneous Coordinates:**
To enable translation along with other transformations, the coordinates are converted to homogeneous form by adding a third dimension (z=1). 
## Run

After downloading the folder, run the below in order: 
```bash
    npm i fs canvas 
    node main.js
```
*Note: The program has been tested with Node.js v20.9.0 and npm v10.1.0. In the unlikely case you run into any issues with these dependencies, please ensure you're using these versions or later*