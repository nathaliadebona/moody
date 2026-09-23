if (localStorage.getItem('nome')) {
    window.location.href = 'app.html';
}

const btnSalvarNome = document.getElementById('btn-salvar-nome');

// ---- Salvar nome ---- //
btnSalvarNome.addEventListener('click', (event) => {
    const valorInput = document.getElementById('nome').value;

    localStorage.setItem('nome', valorInput);

    window.location.href = 'app.html';
});