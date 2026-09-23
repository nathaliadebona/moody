const nome = localStorage.getItem('nome');
const agora = new Date();
const horaAtual = agora.getHours();
const saudacao = document.querySelector('.saudacao');

// ---- Saudação ---- //
if (horaAtual < 12) {
    saudacao.textContent = `Bom dia, ${nome}!`;
} else if (horaAtual >= 12 && horaAtual < 18) {
    saudacao.textContent = `Boa tarde, ${nome}!`;
} else {
    saudacao.textContent = `Boa noite, ${nome}!`;
}

// ---- Dia atual ----// 
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