// ---- Saudação ---- //
const nome = localStorage.getItem('nome');
const agora = new Date();
const horaAtual = agora.getHours();
const saudacao = document.querySelector('.saudacao');

if (horaAtual < 12) {
    saudacao.textContent = `Bom dia, ${nome}!`;
} else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao.textContent = `Boa tarde, ${nome}!`;
} else {
    saudacao.textContent = `Boa noite, ${nome}!`;
}

// ---- Dia atual ---- // 
const dataFormatada = agora.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
});

const dataAtual = document.querySelector('.data-atual');
dataAtual.textContent = dataFormatada;


// ---- Check-in ---- //

    const infoHumores = {
        otimo: { emoji: "😃", texto: "Ótimo", corFundo: "var(--cor-humor-otimo-fundo)", corBarra: "var(--cor-humor-otimo)" },
        bom: { emoji: "🙂", texto: "Bom", corFundo: "var(--cor-humor-bom-fundo)", corBarra: "var(--cor-humor-bom)" },
        neutro: { emoji: "😐", texto: "Neutro", corFundo: "var(--cor-humor-neutro-fundo)", corBarra: "var(--cor-humor-neutro)" },
        ruim: { emoji: "😞", texto: "Ruim", corFundo: "var(--cor-humor-ruim-fundo)", corBarra: "var(--cor-humor-ruim)" },
        pessimo: { emoji: "😭", texto: "Péssimo", corFundo: "var(--cor-humor-pessimo-fundo)", corBarra: "var(--cor-humor-pessimo)" }
    };

function buscarCheckIns() {
    const dados = localStorage.getItem('checkIns');
    return JSON.parse(dados) || [];
}

function salvarCheckIn(novoCheckIn) {
    const checkIns = buscarCheckIns();
    const indiceExistente = checkIns.findIndex((checkIn) => checkIn.data === novoCheckIn.data);

    if (indiceExistente !== -1) {
        checkIns.splice(indiceExistente, 1, novoCheckIn);
    } else {
        checkIns.push(novoCheckIn);
    }

    localStorage.setItem('checkIns', JSON.stringify(checkIns));
}

// ---- Modal check-in ---- //
const modalCheckin = document.getElementById('modal-checkin');
const btnAbrirCheckin = document.getElementById('btn-abrir-checkin');
const btnfecharCheckin = document.getElementById('btn-fechar-checkin'); 
const tela1 = document.querySelector('.tela');
const tela2 = document.querySelector('.tela.escondida');
const btnAvancar = document.querySelector('.btn-avancar')
const btnSalvarCheckin = document.querySelector('.btn-salvar');
const opcoesHumor = document.querySelectorAll('.opcao-humor');
const opcoesHoras = document.querySelectorAll('.opcao-horas');

opcoesHumor.forEach((botao) => {
    botao.addEventListener('click', () => {
        opcoesHumor.forEach((btn) => {
            btn.classList.remove('selecionado');
        });
        botao.classList.add('selecionado');
    });
});

opcoesHoras.forEach((botao) => {
    botao.addEventListener('click', () => {
        opcoesHoras.forEach((btn) => {
            btn.classList.remove('selecionado');
        });
        botao.classList.add('selecionado');
    });
});

btnAbrirCheckin.addEventListener('click', () => {
    modalCheckin.showModal();
});

btnfecharCheckin.addEventListener('click', () => {
    modalCheckin.close();
});

btnAvancar.addEventListener('click', () => {
    tela1.classList.add('escondida');
    tela2.classList.remove('escondida');
});

btnSalvarCheckin.addEventListener('click', () => {
    const botaoHumorSelecionado = document.querySelector('.opcao-humor.selecionado');
    const humorEscolhido = botaoHumorSelecionado.dataset.humor;

    const botaoHorasSelecionado = document.querySelector('.opcao-horas.selecionado');
    const horasEscolhidas = botaoHorasSelecionado.dataset.horas;

    const dataHoje = agora.toISOString().slice(0, 10);

    const novoCheckIn = {
        data: dataHoje,
        humor: humorEscolhido,
        horasDormidas: horasEscolhidas
    };

    salvarCheckIn(novoCheckIn);
    atualizarHumorPredominante();
    exibirGrafico();

    modalCheckin.close();
    tela1.classList.remove('escondida');
    tela2.classList.add('escondida');

    opcoesHumor.forEach((botao) => {
        botao.classList.remove('selecionado');
    });

    opcoesHoras.forEach((botao) => {
        botao.classList.remove('selecionado');
    });
});

// ---- Card humor predominante ---- //
function atualizarHumorPredominante() {
    const todosCheckIns = buscarCheckIns();
    const ultimosCinco = todosCheckIns.slice(-5);
    const humorEmoji = document.querySelector('.humor-emoji');
    const humorSemana = document.querySelector('.humor-semana');

    if (ultimosCinco.length > 0) {
        const contagem = {};

        ultimosCinco.forEach((checkIn) => {
            const humorDoCheckIn = checkIn.humor;
            contagem[humorDoCheckIn] = (contagem[humorDoCheckIn] || 0) + 1;
        });

        const entradas = Object.entries(contagem);
        entradas.sort((a, b) => b[1] - a[1]);

        const humorPredominante = entradas[0][0];

        const infoDoPredominante = infoHumores[humorPredominante];

        humorEmoji.textContent = infoDoPredominante.emoji;
        humorSemana.textContent = infoDoPredominante.texto;
        document.body.style.backgroundColor = infoDoPredominante.corFundo;
    } else {
        humorEmoji.textContent = '';
        humorSemana.textContent = 'Faça seu primeiro check-in!';
        document.body.style.backgroundColor = 'var(--cor-fundo-base)';
    }
}


// ---- Diário ---- //
const textoDiario = document.getElementById('texto-diario');
const btnSalvarDiario = document.getElementById('btn-salvar-diario');
const filtroMes = document.getElementById('filtro-mes');
const btnVerMais = document.querySelector('.ver-mais');
let quantidadeVisivel = 5;

function buscarEntradasDiario() {
    const dados = localStorage.getItem('entradasDiario');
    return JSON.parse(dados) || [];
}

function salvarEntradaDiario(novaEntrada) {
    const entradasDiario = buscarEntradasDiario();
    
    entradasDiario.push(novaEntrada);

    localStorage.setItem('entradasDiario', JSON.stringify(entradasDiario)); 
}

function criarElementoEntrada(entrada, indice) {
    const article = document.createElement('article');
    const time = document.createElement('time');
    const paragrafo = document.createElement('p');
    const btnExcluir = document.createElement('button');

    time.setAttribute('datetime', entrada.data);
    time.textContent = entrada.data; 
    paragrafo.textContent = entrada.texto;

    btnExcluir.textContent = 'Excluir';
    btnExcluir.classList.add('btn-excluir');

    article.appendChild(time);
    article.appendChild(paragrafo);
    article.appendChild(btnExcluir);

    if (indice % 2 === 0) {
        article.classList.add('roxo');
    }

    article.addEventListener('click', () => {
        paragrafo.classList.toggle('expandido');
    });

    btnExcluir.addEventListener('click', (event) => {
        event.stopPropagation();
        excluirEntradaDiario(entrada.id);
        exibirHistoricoDiario();
    });

    return article;
}

function exibirHistoricoDiario() {
    const listaEntradas = document.querySelector('.lista-entradas');
    const entradas = buscarEntradasDiario();

    let entradasParaExibir;

    if (filtroMes.value === '') {
        entradasParaExibir = entradas;
    } else {
        entradasParaExibir = entradas.filter((entrada) => {
            return entrada.data.startsWith(filtroMes.value);
        });
    }

    listaEntradas.innerHTML = '';

    const entradasVisiveis = entradasParaExibir.slice(0, quantidadeVisivel);

    entradasVisiveis.forEach((entrada, indice) => {
        const article = criarElementoEntrada(entrada, indice);
        listaEntradas.appendChild(article);
    });

    if (quantidadeVisivel < entradasParaExibir.length) {
        btnVerMais.style.display = 'block';
        btnVerMais.textContent = 'Ver mais';
    } else if (quantidadeVisivel >= entradasParaExibir.length && quantidadeVisivel > 5) {
        btnVerMais.style.display = 'block';
        btnVerMais.textContent = 'Ver menos';
    } else {
        btnVerMais.style.display = 'none'
    }
}

function excluirEntradaDiario(idParaExcluir) {
    const entradas = buscarEntradasDiario();
    const entradasFiltradas = entradas.filter((entrada) => {
        return entrada.id !== idParaExcluir;
    });
    localStorage.setItem('entradasDiario', JSON.stringify(entradasFiltradas));
}

btnSalvarDiario.addEventListener('click', () => {
    const dataHoje = agora.toISOString().slice(0, 10);
    const novoDiario = {
        texto: textoDiario.value,
        data: dataHoje,
        id: Date.now()
    }

    salvarEntradaDiario(novoDiario);
    textoDiario.value = '';

    exibirHistoricoDiario();
});

btnVerMais.addEventListener('click', () => {
    if (btnVerMais.textContent === 'Ver mais') {
        quantidadeVisivel += 5;
    } else {
        quantidadeVisivel -= 5;
    }
    exibirHistoricoDiario();
});

filtroMes.addEventListener('change', () => {
    quantidadeVisivel = 5;
    exibirHistoricoDiario();
});

// ---- Gráfico ---- //
const graficoBarras = document.querySelector('.grafico-barras');
const alturaPorHoras = {
    "0-2": "0%",
    "3-4": "20%",
    "5-6": "40%",
    "7-8": "60%",
    "9": "80%"
};

function exibirGrafico() {
    const checkIns = buscarCheckIns();

    graficoBarras.innerHTML = '';

    checkIns.forEach((checkIn) => {
        const dia = criarElementoDia(checkIn);
        graficoBarras.appendChild(dia);
    });
}

function criarElementoDia(checkIn) {
    const dia = document.createElement('div');
    const barraTrack = document.createElement('div');
    const barra = document.createElement('div');
    const dataSpan = document.createElement('span');

    const partesData = checkIn.data.split('-');
    const ano = Number(partesData[0]);
    const mes = Number(partesData[1]) - 1;
    const diaDoMes = Number(partesData[2]);

    const dataDoCheckIn = new Date(ano, mes, diaDoMes);
    
    const dataFormatadaCurta = dataDoCheckIn.toLocaleDateString('pt-BR', {
        day: 'numeric',
        month: 'short'
    });

    const infoDoHumor = infoHumores[checkIn.humor];

    barra.style.height = alturaPorHoras[checkIn.horasDormidas];
    barra.style.backgroundColor = infoDoHumor.corBarra;

    dia.classList.add('dia');
    barraTrack.classList.add('barra-track');
    barra.classList.add('barra');
    dataSpan.classList.add('data');

    barraTrack.appendChild(barra);
    dia.appendChild(barraTrack);
    dia.appendChild(dataSpan);

    dataSpan.textContent = dataFormatadaCurta;

    return dia;
}

atualizarHumorPredominante();
exibirHistoricoDiario();
exibirGrafico();