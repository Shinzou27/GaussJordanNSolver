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
            for (m = 0; m < a.length; m++) {
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


    /* EXEMPLO: [1, 3, 5, 3] ----> L1
                [3, 1, 3, 2] ----> L2
                [2, 0, 5, 4] ----> L3
        Primeiro: L2 = L2 - 3L1             k = a21/a11
        --------------------------

                [1,  3,   5,  3] ----> L1
                [0, -8, -12, -7] ----> L2
                [2,  0,   5,  4] ----> L3
        Segundo: L3 = L3 - 2L1              k = a31/a11
        --------------------------

                [1,  3,   5,  3] ----> L1
                [0, -8, -12, -7] ----> L2
                [0, -6,  -5, -2] ----> L3
        Terceiro: L3 = L3 - 3L2/4           k = a32/a22
        --------------------------

                [1,  3,   5,    3] ----> L1
                [0, -8, -12,   -7] ----> L2
                [0,  0,   4, 3.25] ----> L3        
    */
   
    gauss(a) {
        //PASSO 1: ELIMINAÇÃO DOS NÚMEROS ABAIXO DOS PIVÔS:
        pivoLinha1 = a[0][0];

        k = a[1][0]/pivoLinha1;
        for (i = 0; i < a[1].length; i++) {
            a[1][i] = a[1][i] - k*a[0][i];
        }

        k = a[2][0]/pivoLinha1;
        for (i = 0; i < a[1].length; i++) {
            a[2][i] = a[2][i] - k*a[0][i];
        }

        pivoLinha2 = a[1][1];

        k = a[2][1]/pivoLinha2;
        for (i = 0; i < a[1].length; i++) {
            a[2][i] = a[2][i] - k*a[1][i];
        }
        //=================================================

        //PASSO 2: REDUÇÃO DOS VALORES DOS PIVÔS PARA 1:
        pivoLinha3 = a[2][2];
        for (i = 2; i < a[2].length; i++) {
            div = a[2][i]/pivoLinha3;
            a[2][i] = div;
        }
        
        pivoLinha2 = a[1][1];
        for (i = 1; i < a[1].length; i++) {
            a[1][i] = a[1][i]/pivoLinha2
        }

        pivoLinha1 = a[0][0];
        for (i = 0; i < a[0].length; i++) {
            a[0][i] = a[0][i]/pivoLinha1;
        }
        //=================================================

        //PASSO 3: ELIMINAÇÃO DOS NÚMEROS ACIMA DOS PIVÔS:
        k = a[1][2]/a[2][2];
        for (i = 0; i < a[1].length; i++) {
            a[1][i] = a[1][i] - k*a[2][i];
        }
        
        k = a[0][2]/a[2][2];
        for (i = 0; i < a[1].length; i++) {
            a[0][i] = a[0][i] - k*a[2][i];
        }

        k = a[0][1]/a[1][1];
        for (i = 0; i < a[1].length; i++) {
            a[0][i] = a[0][i] - k*a[1][i];
        }
        return a;
    }
}

