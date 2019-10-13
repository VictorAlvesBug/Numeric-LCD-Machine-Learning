function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class RedeNeural {
    constructor(qtdeInput, qtdeHidden, qtdeOutput) {
        this.qtdeInput = qtdeInput;
        this.qtdeHidden = qtdeHidden;
        this.qtdeOutput = qtdeOutput;

        this.bias_ih = new Matrix(this.qtdeHidden, 1);
        this.bias_ih.randomize();

        this.bias_ho = new Matrix(this.qtdeOutput, 1);
        this.bias_ho.randomize();

        this.weights_ih = new Matrix(this.qtdeHidden, this.qtdeInput);
        this.weights_ih.randomize();

        this.weights_ho = new Matrix(this.qtdeOutput, this.qtdeHidden);
        this.weights_ho.randomize();

        this.learning_rate = 0.1;
    }

    train(arrInput, arrTarget) {
        /// FEEDFORWARD
        let input = Matrix.arrayToMatrix(arrInput);

        //INPUT --> HIDDEN
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        //HIDDEN --> OUTPUT
        //d(Sigmoid) = Output * (1 - Output)
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        /// BACKPROPAGATION

        //OUTPUT --> HIDDEN
        let target = Matrix.arrayToMatrix(arrTarget);

        let output_error = Matrix.subtract(target, output);
        let d_output = Matrix.map(output, dsigmoid);
        let hidden_T = Matrix.transpose(hidden);

        let gradient = Matrix.hadamard(d_output, output_error);
        gradient = Matrix.escalar_multiply(gradient, this.learning_rate);

        this.bias_ho = Matrix.add(this.bias_ho, gradient);

        let weights_ho_deltas = Matrix.multiply(gradient, hidden_T);
        this.weights_ho = Matrix.add(this.weights_ho, weights_ho_deltas);

        //HIDDEN --> INPUT
        let weights_ho_T = Matrix.transpose(this.weights_ho);
        let hidden_error = Matrix.multiply(weights_ho_T, output_error);
        let d_hidden = Matrix.map(hidden, dsigmoid);
        let input_T = Matrix.transpose(input);

        let gradient_H = Matrix.hadamard(d_hidden, hidden_error);
        gradient_H = Matrix.escalar_multiply(gradient_H, this.learning_rate);

        this.bias_ih = Matrix.add(this.bias_ih, gradient_H);

        let weight_ih_deltas = Matrix.multiply(gradient_H, input_T);
        this.weights_ih = Matrix.add(this.weights_ih, weight_ih_deltas);
    }

    predict(arr) {
        /// FEEDFORWARD
        let input = Matrix.arrayToMatrix(arr);

        //INPUT --> HIDDEN
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden = Matrix.add(hidden, this.bias_ih);
        hidden.map(sigmoid);

        //HIDDEN --> OUTPUT
        let output = Matrix.multiply(this.weights_ho, hidden);
        output = Matrix.add(output, this.bias_ho);
        output.map(sigmoid);

        return Matrix.MatrixToArray(output);
    }
}