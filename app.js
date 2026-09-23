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
