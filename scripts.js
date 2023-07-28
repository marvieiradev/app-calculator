let totalAtual = 0;
let armazenado = "0";
let operadorAnterior;

const tela = document.querySelector('.tela');

function clicarBotao(valor) {
    if (isNaN(valor)) {
        tratarSimbolo(valor);
    } else {
        tratarNumero(valor);
    }
}

function tratarSimbolo(simbolo) {
    switch (simbolo) {
        case 'C':
            armazenado
                = '0';
            totalAtual = 0;
            break;

        case '=':
            if (totalAtual === null) {
                return
            }
            resolverOperacao(parseInt(armazenado));
            operadorAnterior = null;
            armazenado = totalAtual;
            totalAtual = 0;
            break;

        case '←':
            if (armazenado.length === 1) {
                armazenado = '0';
            } else {
                armazenado = armazenado.toString(0, armazenado.length - 1);
            }
            break;

        case '+':
        case '−':
        case '×':
        case '÷':
            tratarExpressao(simbolo);
            break;
    }
}

function tratarExpressao(simbolo) {
    if (armazenado === '0') {
        return;
    }

    const cnvtArmazenado = parseInt(armazenado);

    if (totalAtual === 0) {
        totalAtual = cnvtArmazenado;
    } else {
        resolverOperacao(cnvtArmazenado);
    }

    operadorAnterior = simbolo;
    armazenado = '0';
}

function resolverOperacao(cnvtArmazenado) {
    if (operadorAnterior === '+') {
        totalAtual += cnvtArmazenado;
    } else if (operadorAnterior === '-') {
        totalAtual -= cnvtArmazenado;
    } else if (operadorAnterior === '×') {
        totalAtual *= cnvtArmazenado;
    } else if (operadorAnterior === '÷') {
        totalAtual /= cnvtArmazenado;
    }
}

function tratarNumero(stringNumero) {
    if (armazenado === "0") {
        armazenado = stringNumero;
    } else {
        armazenado += stringNumero;
    }
}

function iniciar() {
    document.querySelector('.btns-calc').addEventListener('click', function (event) {
        clicarBotao(event.target.innerText);
    });
}

iniciar();