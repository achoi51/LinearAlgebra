import numpy as np
import os


# basically elementary row operations, pretty self explanatory
def swap(matrix, row1, row2):
    matrix[[row1, row2]] = matrix[[row2, row1]]

def scale(matrix, row, scale_factor):
    matrix[row] = matrix[row] * scale_factor

def addScaled(matrix, target_row, source_row, scale_factor):
    matrix[target_row] += scale_factor * matrix[source_row]


def rref(matrix):
    
    num_rows, num_cols = matrix.shape
    
    # column we're currently working on
    lead = 0
    
    for row in range(num_rows):
        # if we've gone past the number of columns, the matrix is done
        if lead >= num_cols:
            return matrix
        
        i = row
        
        # get non-zero
        while matrix[i, lead] == 0:
            i += 1
            # entire col is zeros, move on
            if i == num_rows:
                i = row
                lead += 1
                
                # if lead goes past the number of columns, we're also done
                if lead == num_cols:
                    return matrix
        
        
        if i != row:
            swap(matrix, i, row)

        # scale to make diagonal 1
        scale(matrix, row, 1/matrix[row, lead])

        # Get rid of all the other entries in column 
        for i in range(num_rows):
            if i != row:
                addScaled(matrix, i, row, -matrix[i, lead])


        lead += 1

    return matrix


#---------------------------------------------------------------------------------------------------------------
# util
def readMatrix(file):
    # Why do we have an E in here wat
    with open(file, 'r') as file:
        try:
            matrix = np.genfromtxt(file, delimiter=',')
            if np.isnan(matrix).any():
                # E error
                raise ValueError("There's a non-number in the matrix :/")
        except ValueError as e:
            # errors like number of columns not matching up
            print("Error: " + str(e))
            return None
    
    return matrix

def save(matrix, file):
    np.savetxt(file, matrix, fmt='%.2f')
    

#---------------------------------------------------------------------------------------------------------------
# main
for filename in os.listdir('input'):
    if filename.endswith(".txt"):
        input_path = os.path.join('input', filename)
        output_path = os.path.join('output', filename)

        matrix = readMatrix(input_path)
        
        if matrix is None:
            print("Skipping " + filename + "\n")
            continue
        
        print("original " + filename + ":")
        print(matrix)
        rref_matrix = rref(matrix.copy())
        print(f"RREF in {filename}:")
        print(rref_matrix)

        save(rref_matrix, output_path)
        print(f"RREF saved: {output_path}\n")