/*  Trabalho de Álgebra Linear

    Professor:  Paulo Ricardo Pinheiro Sampaio
    Alunos:     Felipe Cassiano Barbosa
                Gabriela Araujo de Abreu
                Victor Nunes Saboia
*/


export class Matrix {
    rows;
    cols;
    elements;

    constructor(rows, cols, elements) {}

    get(i, j) {
        return this.elements[i][j];
    }

    set(i, j, value) {
        this.elements[i][j] = value;
    }
}

export class Vector {
    dim;
    elements;

    constructor(dim, elements) {}

    get(i) {
        return this.elements[i];
    }

    set(i, value) {
        this.elements[i] = value;
    }
}

export class LinearAlgebra {

    transpose(a) {
        matrizTransposta = [];
        for (m = 0; m < a[0].length; m++) {
            matrizTransposta[m] = [];
            for (n = 0; n < a.length; n++) {
                matrizTransposta[m][n] = a[n][m];
            }
        }
        return matrizTransposta
    }

    sum(a, b) {
        matrizSoma = [];
        for (m = 0; m < a.length; m++) {
            matrizSoma[m] = [];
            for (n = 0; n < a[0].length; n++) {
                matrizSoma[m][n] = a[m][n] + b[m][n];
            }
        }
        return matrizSoma
    }

    times(a, b) {
        soma = 0;
        matrizTimes = [];                               //   a   *   b   =   X
        if (!isNaN(a)){
            for (n = 0; n < b.length; n++) {            // m x n   n x p   m x p
                matrizTimes[n] = [];
                for (p = 0; p < b[0].length; p++) {
                    matrizTimes[n][p] = b[n][p] * a;
                }
            } 
        }
        else {
            for (m = 0; m < a.length; m++) {            // m x n   n x p   m x p
                matrizTimes[m] = [];
                for (p = 0; p < b[0].length; p++) {
                    for (i = 0; i < b.length; i++) {
                        soma += a[m][i] * b[i][p]; 
                    }
                    matrizTimes[m][p] = soma;
                    soma = 0;
                }
            }
        }
        return matrizTimes;
    }
}