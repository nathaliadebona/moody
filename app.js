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
function buscarCheckIns() {
    const dados = localStorage.getItem('checkIns');
    return JSON.parse(dados) || [];
}

function salvarCheckIn(novoCheckIn) {
    const checkIns = buscarCheckIns(); 

    checkIns.push(novoCheckIn); 

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

        const infoHumores = { 
            otimo: { emoji: "😃", texto: "Ótimo", corFundo: "var(--cor-humor-otimo-fundo)" },
            bom: { emoji: "🙂", texto: "Bom", corFundo: "var(--cor-humor-bom-fundo)" },
            neutro: { emoji: "😐", texto: "Neutro", corFundo: "var(--cor-humor-neutro-fundo)" },
            ruim: { emoji: "😞", texto: "Ruim", corFundo: "var(--cor-humor-ruim-fundo)" },
            pessimo: { emoji: "😭", texto: "Péssimo", corFundo: "var(--cor-humor-pessimo-fundo)" }
        };

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

function buscarEntradasDiario() {
    const dados = localStorage.getItem('entradasDiario');
    return JSON.parse(dados) || [];
}

function salvarEntradaDiario(novaEntrada) {
    const entradasDiario = buscarEntradasDiario();
    
    entradasDiario.push(novaEntrada);

    localStorage.setItem('entradasDiario', JSON.stringify(entradasDiario)); 
}

function criarElementoEntrada(entrada) {
    const article = document.createElement('article');
    const time = document.createElement('time');
    const paragrafo = document.createElement('p');

    time.setAttribute('datetime', entrada.data);
    time.textContent = entrada.data; 
    paragrafo.textContent = entrada.texto;

    article.appendChild(time);
    article.appendChild(paragrafo);

    article.addEventListener('click', () => {
        paragrafo.classList.toggle('expandido');
    });

    return article;
}

function exibirHistoricoDiario() {
    const listaEntradas = document.querySelector('.lista-entradas');
    const entradas = buscarEntradasDiario();

    listaEntradas.innerHTML = '';

    entradas.forEach((entrada) => {
        const article = criarElementoEntrada(entrada);
        listaEntradas.appendChild(article);
    });
}

btnSalvarDiario.addEventListener('click', () => {
    const dataHoje = agora.toISOString().slice(0, 10);
    const novoDiario = {
        texto: textoDiario.value,
        data: dataHoje
    }

    salvarEntradaDiario(novoDiario);
    textoDiario.value = '';

    exibirHistoricoDiario();
});

atualizarHumorPredominante();
exibirHistoricoDiario();