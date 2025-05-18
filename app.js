const botoes = document.querySelectorAll('.btn');
const boxes = document.querySelectorAll('.box_servico');

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const alvo = botao.getAttribute('data-alvo');

        // Remove estilo de todos os botões
        botoes.forEach(b => b.classList.remove('ativo'));

        // Adiciona destaque no botão clicado
        botao.classList.add('ativo');

        // Oculta todos os cards
        boxes.forEach(card => {
        card.style.display = 'none';
        });

        // Mostra o card com a classe específica
        const cardParaMostrar = document.querySelector(`.box_servico-${alvo}`);
        if (cardParaMostrar) {
        cardParaMostrar.style.display = 'flex';
        }
    });
});