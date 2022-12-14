/*  Trabalho de Álgebra Linear

    Professor:  Paulo Ricardo Pinheiro Sampaio
    Alunos:     Felipe Cassiano Barbosa
                Gabriela Araujo de Abreu
                Victor Nunes Saboia
*/
/*
Ainda resta:
    1 - Fazer o solver retornar uma matriz coluna com os resultados da operação;
    2 - Criar os métodos de entrada de dados (prompt? Entrada fixa?);
    3 - Fazer mensagens personalizadas para saída de dados;
    4 - Fazer uma interface em HTML para não usar o console do Chrome;
*/

class Matrix {
    rows;
    cols;
    elements;

    constructor(rows, cols, elements) {
        this.rows = rows;
        this.cols = cols;
        this.elements = elements;
    }

    get(i, j) {
        return this.elements[i][j];
    }

    set(i, j, value) {
        this.elements[i][j] = value;
    }
    arranjarMatriz() {
        var matriz = [];
        for (var i = 0; i < this.rows; i++) {
            matriz[i] = [];
            for (var j = 0; j < this.cols; j++) {
                matriz[i][j] = this.elements.shift();
            }
        }
        return matriz;
    }
}

class Vector {
    dim;
    elements;

    constructor(dim, elements) {
        this.dim = dim;
        this.elements = elements;
    }

    get(i) {
        return this.elements[i];
    }

    set(i, value) {
        this.elements[i] = value;
    }
    transformarEmArray() {
        var vetor = [];
        for (var i = 0; i < this.dim; i++) {
            vetor[i] = this.elements.shift();
        }
        return vetor;
    }    
}

class LinearAlgebra {

    transpose(a) {
        var matrizTransposta = [];
        for (var m = 0; m < a[0].length; m++) {
            matrizTransposta[m] = [];
            for (var n = 0; n < a.length; n++) {
                matrizTransposta[m][n] = a[n][m];
            }
        }
        return matrizTransposta
    }

    sum(a, b) {
        var matrizSoma = [];
        for (var m = 0; m < a.length; m++) {
            matrizSoma[m] = [];
            for (var n = 0; n < a[0].length; n++) {
                matrizSoma[m][n] = a[m][n] + b[m][n];
            }
        }
        return matrizSoma
    }

    times(a, b) {
        var soma = 0;
        var matrizTimes = [];                               //   a   *   b   =   X
        if (!isNaN(a)){
            for (var n = 0; n < b.length; n++) {            // m x n   n x p   m x p
                matrizTimes[n] = [];
                for (var p = 0; p < b[0].length; p++) {
                    matrizTimes[n][p] = b[n][p] * a;
                }
            } 
        }
        else {
            for (var m = 0; m < a.length; m++) {
                matrizTimes[m] = [];
                for (var p = 0; p < b[0].length; p++) {
                    for (var i = 0; i < b.length; i++) {
                        soma += a[m][i] * b[i][p]; 
                    }
                    matrizTimes[m][p] = soma;
                    soma = 0;
                }
            }
        }
        return matrizTimes;
    }
    dot(a, b) {
        var soma = 0;
        var matrizDot = [];                               //   a   *   b   =   X
        for (var m = 0; m < a.length; m++) {                // m x n   n x p   m x p
            matrizDot[m] = [];
            for (var p = 0; p < b[0].length; p++) {
                for (var i = 0; i < b.length; i++) {
                    soma += a[m][i] * b[i][p]; 
                }
                matrizDot[m][p] = soma;
                soma = 0;
            }
        }
        return matrizDot;        
    }

    gauss(a) {
        this.permutarLinhas(a);
        for (var i = 0; i < (a.length - 1); i++) {
            var pivo = a[i][i];
            for (var j = i+1; j < a.length; j++) {
                 var k = -1*a[j][i]/pivo;
                 for (var l = 0; l < a[i].length; l++) {
                     a[j][l] += k*a[i][l];
                 }
             }
         }
         return a;
     }

    solver(a) {
        this.gauss(a);
        for (var i = a.length-1; i >= 0; i--) {
            var pivo = a[i][i];
            for (j = i; j < a[i].length; j++) {
                a[i][j] = a[i][j]/pivo;
            }
        }   
        
        for (var i = a.length - 1; i > 0; i--) {
            var pivo = a[i][i];
            for (var j = i-1; j >= 0; j--) {
                var k = -a[j][i]/pivo;
                for (var l = 0; l < a[i].length; l++) {
                    a[j][l] += k*a[i][l];
                }
            }
        }           
        return a;
    }

    permutarLinhas(a) {
        var aux = [];
        for (var i = 0; i < (a.length - 1); i++) {
            var pivo = a[i][i];
            if (a[i][i] == 0) {
                aux = a[i];
                a[i] = a[i+1];
                a[i+1] = aux;
            }
        }
        return a;
    }
}
    /*
    EXEMPLO:[1, 3, 5, 3] ----> L1
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
    ==================================================
    > PASSO 1: ELIMINAÇÃO DOS NÚMEROS ABAIXO DOS PIVÔS:
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
    Esse passo engloba a resolução do método gauss(a), retornando a matriz triangular superior em forma escada.

    ==================================================
    > PASSO 2: REDUÇÃO DOS VALORES DOS PIVÔS PARA 1:

        pivoLinha3 = a[2][2];
        for (i = 2; i < a[2].length; i++) {
            a[2][i] = a[2][i]/pivoLinha3;
        }
        
        pivoLinha2 = a[1][1];
        for (i = 1; i < a[1].length; i++) {
            a[1][i] = a[1][i]/pivoLinha2
        }
        
        pivoLinha1 = a[0][0];
        for (i = 0; i < a[0].length; i++) {
            a[0][i] = a[0][i]/pivoLinha1;
        }
        
    ==================================================
    > PASSO 3: ELIMINAÇÃO DOS NÚMEROS ACIMA DOS PIVÔS:

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
    O passo 2 e o passo 3 englobam o método solver(a), retornando a solução do sistema linear.
    */

