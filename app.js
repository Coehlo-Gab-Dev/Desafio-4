document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos interativos
    const botoesServicos = document.querySelectorAll('[role="tab"]:not(.sub_btn)');
    const boxesServicos = document.querySelectorAll('[role="tabpanel"]');
    const subBotoes = document.querySelectorAll('.sub_btn');
    let servicoAtual = null;
    let subServicoAtual = { categoria: null, tipo: null, elemento: null };

    // Configura o ano atual no footer
    const anoAtual = document.getElementById('current-year');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // Função para limpar os campos de filtro de uma categoria específica
    const limparFiltros = (categoria) => {
        const boxServico = document.getElementById(`${categoria}-content`);
        if (!boxServico) return;

        // Limpa selects
        const selectLocal = boxServico.querySelector(`#select_local_${categoria}`);
        const selectHorario = boxServico.querySelector(`#select_horario_${categoria}`);
        
        if (selectLocal) selectLocal.value = '';
        if (selectHorario) selectHorario.value = '';
        
        // Limpa resultados
        const resultados = boxServico.querySelector('.resultados_busca');
        if (resultados) resultados.innerHTML = '<h4>Resultados:</h4><div></div>';
    };

    // Função para ativar/desativar um serviço principal
    const toggleServico = (botaoClicado) => {
        const alvo = botaoClicado.dataset.alvo;
        const boxAlvo = document.getElementById(`${alvo}-content`);
        
        // Se o mesmo serviço já está aberto, fecha tudo
        if (servicoAtual === alvo) {
            fecharTudo();
            return;
        }
        
        // Limpa filtros do serviço atual antes de trocar
        if (servicoAtual) {
            limparFiltros(servicoAtual);
        }
        
        // Caso contrário, abre o serviço selecionado
        servicoAtual = alvo;
        
        // Remove estados ativos
        resetarEstados();
        
        // Ativa o botão clicado e mostra o box correspondente
        botaoClicado.setAttribute('aria-selected', 'true');
        botaoClicado.classList.add('ativo');
        
        if (boxAlvo) {
            boxAlvo.hidden = false;
            boxAlvo.focus();
        }
    };

    // Função para ativar um sub-serviço
    const ativarSubServico = (botaoClicado) => {
        const categoria = botaoClicado.closest('[role="tabpanel"]').id.replace('-content', '');
        const tipo = botaoClicado.dataset.alvo;
        
        // Se o mesmo sub-serviço já está selecionado, desseleciona
        if (subServicoAtual.tipo === tipo && subServicoAtual.categoria === categoria) {
            botaoClicado.setAttribute('aria-selected', 'false');
            subServicoAtual = { categoria: null, tipo: null, elemento: null };
            return;
        }
        
        // Limpa filtros quando muda o sub-serviço (mesmo que seja na mesma categoria)
        limparFiltros(categoria);
        
        // Desseleciona outros sub-serviços da mesma categoria
        const outrosSubBotoes = botaoClicado.parentElement.querySelectorAll('.sub_btn');
        outrosSubBotoes.forEach(botao => {
            if (botao !== botaoClicado) {
                botao.setAttribute('aria-selected', 'false');
            }
        });
        
        // Ativa o sub-serviço clicado
        botaoClicado.setAttribute('aria-selected', 'true');
        subServicoAtual = { categoria, tipo, elemento: botaoClicado };
    };

    // Função para fechar tudo
    const fecharTudo = () => {
        // Limpa filtros do serviço atual antes de fechar
        if (servicoAtual) {
            limparFiltros(servicoAtual);
        }
        
        servicoAtual = null;
        subServicoAtual = { categoria: null, tipo: null, elemento: null };
        resetarEstados();
    };

    // Função para resetar todos os estados
    const resetarEstados = () => {
        botoesServicos.forEach(botao => {
            botao.setAttribute('aria-selected', 'false');
            botao.classList.remove('ativo');
        });
        
        boxesServicos.forEach(box => {
            box.hidden = true;
        });
        
        // Remove seleção de todos os sub-serviços
        document.querySelectorAll('.sub_btn').forEach(subBotao => {
            subBotao.setAttribute('aria-selected', 'false');
        });
    };

    // Adiciona eventos para botões principais
    botoesServicos.forEach(botao => {
        botao.addEventListener('click', () => toggleServico(botao));
        
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleServico(botao);
            }
        });
    });

    // Adiciona eventos para sub-botões
    subBotoes.forEach(botao => {
        botao.addEventListener('click', () => ativarSubServico(botao));
        
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                ativarSubServico(botao);
            }
        });
    });

    // Configuração dos filtros e busca
    const configurarFiltros = () => {
        document.querySelectorAll('.btn_buscar').forEach(botao => {
            botao.addEventListener('click', function() {
                const boxPai = this.closest('[role="tabpanel"]');
                const categoria = boxPai.id.replace('-content', '');
                const resultados = boxPai.querySelector('.resultados_busca');
                
                // Obter valores dos filtros
                const local = boxPai.querySelector('#select_local_' + categoria)?.value;
                const horario = boxPai.querySelector('#select_horario_' + categoria)?.value;
                
                // Usar o sub-serviço ativo da categoria atual
                let subservico = null;
                if (subServicoAtual.categoria === categoria) {
                    subservico = subServicoAtual.tipo;
                }

                // Validação básica
                if (!subservico) {
                    resultados.innerHTML = '<p class="erro">Selecione um tipo de serviço</p>';
                    return;
                }

                // Exibir loading
                resultados.innerHTML = '<p>Buscando resultados...</p>';

                // Simulação de busca com filtros
                setTimeout(() => {
                    resultados.innerHTML = `
                        <div class="resultado-item">
                            <h4>Resultados para ${categoria}</h4>
                            <p><strong>Tipo:</strong> ${subservico}</p>
                            ${local ? `<p><strong>Local:</strong> ${local}</p>` : ''}
                            ${horario ? `<p><strong>Horário:</strong> ${horario}</p>` : ''}
                            <p>Exemplo de resultado 1</p>
                            <p>Exemplo de resultado 2</p>
                        </div>
                    `;
                }, 800);
            });
        });
    };

    const inicializarFiltros = () => {
        const opcoesLocais = [
            { value: "sao-luis", text: "São Luís" },
            { value: "imperatriz", text: "Imperatriz" },
            { value: "caxias", text: "Caxias" }
        ];

        const opcoesHorarios = [
            { value: "manha", text: "Manhã" },
            { value: "tarde", text: "Tarde" },
            { value: "noite", text: "Noite" },
            { value: "24h", text: "24 horas" }
        ];

        boxesServicos.forEach(box => {
            const categoria = box.id.replace('-content', '');
            
            const selectLocal = box.querySelector('#select_local_' + categoria);
            if (selectLocal) {
                opcoesLocais.forEach(opcao => {
                    const option = document.createElement('option');
                    option.value = opcao.value;
                    option.textContent = opcao.text;
                    selectLocal.appendChild(option);
                });
            }
            
            const selectHorario = box.querySelector('#select_horario_' + categoria);
            if (selectHorario) {
                opcoesHorarios.forEach(opcao => {
                    const option = document.createElement('option');
                    option.value = opcao.value;
                    option.textContent = opcao.text;
                    selectHorario.appendChild(option);
                });
            }
        });
    };

    // Inicializa o sistema
    configurarFiltros();
    inicializarFiltros();
});