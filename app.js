document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos interativos
    const botoesServicos = document.querySelectorAll('[role="tab"]:not(.sub_btn)');
    const boxesServicos = document.querySelectorAll('[role="tabpanel"]');
    const subBotoes = document.querySelectorAll('.sub_btn'); // Botões UPA, UBS, Hospital, etc.
    let servicoAtual = null; // Categoria principal ativa (ex: 'saude')
    let subServicoAtual = { categoria: null, tipo: null, elemento: null }; // Sub-serviço ativo (ex: categoria: 'saude', tipo: 'UPA')

    // Configura o ano atual no footer
    const anoAtual = document.getElementById('current-year');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // Função para limpar os campos de filtro e resultados de uma categoria específica
    const limparFiltros = (categoria) => {
        const boxServico = document.getElementById(`${categoria}-content`);
        if (!boxServico) return;

        const selectLocal = boxServico.querySelector(`#select_local_${categoria}`);
        const selectHorario = boxServico.querySelector(`#select_horario_${categoria}`);
        
        if (selectLocal) selectLocal.value = '';
        if (selectHorario) selectHorario.value = '';
        
        const divResultados = boxServico.querySelector(`#resultados-${categoria}`);
        if (divResultados) divResultados.innerHTML = '<p>Utilize os filtros acima para buscar.</p>'; // Mensagem inicial
    };

    // Função para resetar todos os estados de botões e abas
    const resetarEstados = () => {
        botoesServicos.forEach(botao => {
            botao.setAttribute('aria-selected', 'false');
            botao.classList.remove('active'); // Assuming 'active' class for styling
        });
        
        boxesServicos.forEach(box => {
            box.hidden = true;
        });
        
        subBotoes.forEach(subBotao => { // Resetar também a classe 'active' dos sub-botões
            subBotao.setAttribute('aria-selected', 'false');
            subBotao.classList.remove('active'); 
        });
        subServicoAtual = { categoria: null, tipo: null, elemento: null }; // Limpa o sub-serviço atual
    };

    // Função para ativar/desativar um serviço principal (Saúde, Educação, etc.)
    const toggleServico = (botaoClicado) => {
        const alvo = botaoClicado.dataset.alvo; // ex: 'saude', 'educacao'
        const boxAlvo = document.getElementById(`${alvo}-content`);
        
        if (servicoAtual === alvo) { // Se o mesmo serviço já está aberto, fecha tudo
            if (servicoAtual) limparFiltros(servicoAtual);
            servicoAtual = null;
            resetarEstados(); // Isso também vai desmarcar sub-botões e limpar subServicoAtual
            return;
        }
        
        // Limpa filtros do serviço anterior (se houver) e reseta estados
        if (servicoAtual) limparFiltros(servicoAtual);
        resetarEstados();
        
        servicoAtual = alvo;
        
        botaoClicado.setAttribute('aria-selected', 'true');
        botaoClicado.classList.add('active');
        
        if (boxAlvo) {
            boxAlvo.hidden = false;
            // boxAlvo.focus(); // Opcional, para foco
        }
    };

    // Função para ativar um sub-serviço (UPA, UBS, Hospital, etc.)
    const ativarSubServico = (botaoClicado) => {
        const categoriaPai = botaoClicado.closest('[role="tabpanel"]');
        if (!categoriaPai) return;
        const categoria = categoriaPai.id.replace('-content', ''); // ex: 'saude'
        const tipo = botaoClicado.dataset.alvo; // ex: 'upa', 'hospital'

        // Se o mesmo sub-serviço já está selecionado, desseleciona-o
        if (subServicoAtual.elemento === botaoClicado) {
            botaoClicado.setAttribute('aria-selected', 'false');
            botaoClicado.classList.remove('active');
            subServicoAtual = { categoria: null, tipo: null, elemento: null };
            limparFiltros(categoria); // Limpa filtros e resultados ao desselecionar
            return;
        }
        
        // Limpa filtros e resultados ao mudar o sub-serviço
        limparFiltros(categoria);
        
        // Desseleciona outros sub-serviços da mesma categoria
        const outrosSubBotoes = botaoClicado.parentElement.querySelectorAll('.sub_btn');
        outrosSubBotoes.forEach(botao => {
            botao.setAttribute('aria-selected', 'false');
            botao.classList.remove('active');
        });
        
        // Ativa o sub-serviço clicado
        botaoClicado.setAttribute('aria-selected', 'true');
        botaoClicado.classList.add('active');
        subServicoAtual = { categoria, tipo, elemento: botaoClicado };
    };

    // Adiciona eventos para botões principais de serviço
    botoesServicos.forEach(botao => {
        botao.addEventListener('click', () => toggleServico(botao));
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleServico(botao); }
        });
    });

    // Adiciona eventos para sub-botões de tipo de serviço
    subBotoes.forEach(botao => {
        botao.addEventListener('click', () => ativarSubServico(botao));
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ativarSubServico(botao); }
        });
    });

    // --- FUNÇÃO PARA FAZER A CHAMADA À API (Backend) ---
    async function buscarDadosDaApi(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ erro: { mensagem: `Erro HTTP: ${response.status} - ${response.statusText}` } }));
                const mensagemErroBackend = errorData?.erro?.mensagem || errorData?.message || `Erro ao buscar dados: ${response.statusText}`;
                throw new Error(mensagemErroBackend);
            }
            const resultado = await response.json();
            if (resultado.sucesso && resultado.dados !== undefined) {
                return resultado; 
            } else {
                throw new Error(resultado.erro?.mensagem || 'Nenhum dado retornado pela API ou formato inesperado.');
            }
        } catch (error) {
            console.error('Falha na requisição da API ou no processamento da resposta:', error);
            return { sucesso: false, erro: { mensagem: error.message || 'Erro de conexão ou ao processar resposta.' } };
        }
    }

    // --- FUNÇÃO PARA RENDERIZAR OS RESULTADOS DE SAÚDE ---
    function renderizarResultadosSaude(dados, metadados, divResultadosAlvo) {
        divResultadosAlvo.innerHTML = ''; 

        if (!dados || dados.length === 0) {
            divResultadosAlvo.innerHTML = '<p>Nenhum estabelecimento encontrado para os filtros aplicados.</p>';
            if (metadados && metadados.avisoConsulta) {
                divResultadosAlvo.innerHTML += `<p><small>Aviso: ${metadados.avisoConsulta}</small></p>`;
            }
            return;
        }

        const listaResultados = document.createElement('ul');
        listaResultados.className = 'lista-estabelecimentos'; 

        dados.forEach(est => {
            const horarioDisplay = est.horarioFuncionamento || "Não Disponível";
            const municipioDisplay = est.localizacao?.municipio || "N/I";
            const bairroDisplay = est.localizacao?.bairro || "N/I";
            const enderecoDisplay = `${est.localizacao?.logradouro || ""} ${est.localizacao?.numero || ""}`.trim() || "Não informado";
            const telefoneDisplay = est.contato?.telefone || "Não Disponível";

            const itemLista = document.createElement('li');
            itemLista.className = 'item-estabelecimento'; 
            itemLista.innerHTML = `
                <h4>${est.nome || "Nome não informado"} <small>(CNES: ${est.idCnes || 'N/A'})</small></h4>
                <p><strong>Tipo:</strong> ${est.tipo || "N/I"}</p>
                <p><strong>Local:</strong> ${municipioDisplay}${bairroDisplay !== "N/I" ? ` - ${bairroDisplay}` : ''}</p>
                <p><strong>Endereço:</strong> ${enderecoDisplay}</p>
                <p><strong>Telefone:</strong> ${telefoneDisplay}</p>
                <p><strong>Horário:</strong> ${horarioDisplay}</p>
            `;
            listaResultados.appendChild(itemLista);
        });
        divResultadosAlvo.appendChild(listaResultados);

        if (metadados && metadados.paginacao && metadados.paginacao.totalPaginas > 1) {
            const paginacaoDiv = document.createElement('div');
            paginacaoDiv.className = 'paginacao'; 
            paginacaoDiv.innerHTML = `Página ${metadados.paginacao.paginaAtual} de ${metadados.paginacao.totalPaginas}. Total de itens: ${metadados.paginacao.totalItens}.`;
            divResultadosAlvo.appendChild(paginacaoDiv);
        }
    }

    // --- FUNÇÃO DE BUSCA MODIFICADA ---
    const configurarFiltros = () => {
        document.querySelectorAll('.btn_buscar').forEach(botao => {
            botao.addEventListener('click', async function() { 
                const boxPai = this.closest('[role="tabpanel"]');
                if (!boxPai) return;
                const categoria = boxPai.id.replace('-content', '');
                const divResultados = boxPai.querySelector(`#resultados-${categoria}`);
                
                if (!divResultados) {
                    console.error("Div de resultados não encontrada para categoria:", categoria);
                    return;
                }

                const localSelecionado = boxPai.querySelector(`#select_local_${categoria}`)?.value;
                const horarioFrontendSelecionado = boxPai.querySelector(`#select_horario_${categoria}`)?.value;
                
                let tipoApiQuery = null;
                if (subServicoAtual.categoria === categoria && subServicoAtual.tipo) {
                    // `subServicoAtual.tipo` vem do `data-alvo` dos botões UPA, UBS etc.
                    // Certifique-se que `data-alvo` no HTML é "UPA", "HOSPITAL", "UBS", etc.
                    tipoApiQuery = subServicoAtual.tipo.toUpperCase(); 
                }

                if (categoria === 'saude') {
                    if (!tipoApiQuery) {
                        divResultados.innerHTML = '<p class="erro">Por favor, selecione um tipo de serviço de saúde (UPA, UBS, Hospital, etc.).</p>';
                        return;
                    }

                    let apiUrl = 'https://desafio-4-2.onrender.com/api/v1/saude'; // Endpoint base para saúde
                    const queryParams = new URLSearchParams();

                    if (tipoApiQuery) {
                        queryParams.append('tipo', tipoApiQuery);
                    }
                    if (localSelecionado) { // 'localSelecionado' é o nome do município
                        queryParams.append('municipio_nome', localSelecionado);
                    }
                    // Adicionar paginação se você for implementar
                    // queryParams.append('pagina', '1'); 

                    if (queryParams.toString()) {
                        apiUrl += `?${queryParams.toString()}`;
                    }

                    console.log("Frontend: Buscando Saúde em:", apiUrl);
                    divResultados.innerHTML = '<p>Buscando...</p>';

                    const resultadoApi = await buscarDadosDaApi(apiUrl);

                    if (resultadoApi && resultadoApi.sucesso && resultadoApi.dados) {
                        let estabelecimentosParaExibir = resultadoApi.dados;

                        if (horarioFrontendSelecionado && horarioFrontendSelecionado !== "todos" && horarioFrontendSelecionado !== "") {
                             estabelecimentosParaExibir = estabelecimentosParaExibir.filter(est => {
                                const horarioEst = est.horarioFuncionamento ? est.horarioFuncionamento.toLowerCase() : "";
                                
                                if (horarioFrontendSelecionado === "nao-disponivel") {
                                    return !est.horarioFuncionamento || est.horarioFuncionamento.trim() === "";
                                }
                                if (!est.horarioFuncionamento) return false;

                                const filtroHorario = horarioFrontendSelecionado; // Já deve estar em minúsculas e formatado (ex: 'manha')
                                if (filtroHorario === "manha" && horarioEst.includes("manha")) return true;
                                if (filtroHorario === "tarde" && horarioEst.includes("tarde")) return true;
                                if (filtroHorario === "noite" && horarioEst.includes("noite")) return true;
                                if ((filtroHorario === "24-horas" || filtroHorario === "24h") && (horarioEst.includes("24h") || horarioEst.includes("24 horas"))) return true;
                                return false;
                            });
                        }
                        renderizarResultadosSaude(estabelecimentosParaExibir, resultadoApi.metadados, divResultados);
                    } else {
                        divResultados.innerHTML = `<p>Nenhum resultado encontrado. ${resultadoApi?.erro?.mensagem || ''}</p>`;
                    }
                } else {
                    // Aqui iria a lógica para outras categorias (Educação, Cultura, etc.)
                    console.log(`Busca para ${categoria} ainda não implementada com API real.`);
                    divResultados.innerHTML = `<p>Busca para ${categoria} ainda não implementada.</p>`;
                }
            });
        });
    };

    const inicializarFiltros = () => {
        // Seu código existente para popular os dropdowns
        const opcoesLocais = [
            { value: "", text: "Todo o Maranhão" }, // Opção para buscar no estado todo
            { value: "Sao Luis", text: "São Luís" }, // O 'value' deve ser o nome que a API espera
            { value: "Imperatriz", text: "Imperatriz" },
            { value: "Caxias", text: "Caxias" },
            { value: "Bacabal", text: "Bacabal" },
            { value: "Acailandia", text: "Açailândia" } // Normalizar para busca
            // Adicione mais municípios importantes ou carregue dinamicamente
        ];

        const opcoesHorarios = [
            { value: "", text: "Qualquer Horário" }, // Opção para não filtrar por horário
            { value: "manha", text: "Manhã" },
            { value: "tarde", text: "Tarde" },
            { value: "noite", text: "Noite" },
            { value: "24-horas", text: "24 horas" },
            { value: "nao-disponivel", text: "Não Disponível (para filtro)" }
        ];

        document.querySelectorAll('[role="tabpanel"]').forEach(box => {
            const categoria = box.id.replace('-content', '');
            
            const selectLocal = box.querySelector(`#select_local_${categoria}`);
            if (selectLocal) {
                // Limpa opções existentes exceto a primeira (placeholder)
                while (selectLocal.options.length > 1) {
                    selectLocal.remove(1);
                }
                opcoesLocais.forEach(opcao => {
                    if (opcao.value === "" && selectLocal.options[0].value === "") { // Não duplicar o placeholder
                        selectLocal.options[0].textContent = opcao.text;
                        return;
                    }
                    const option = document.createElement('option');
                    option.value = opcao.value; // ex: "Sao Luis"
                    option.textContent = opcao.text; // ex: "São Luís"
                    selectLocal.appendChild(option);
                });
            }
            
            const selectHorario = box.querySelector(`#select_horario_${categoria}`);
            if (selectHorario) {
                while (selectHorario.options.length > 1) {
                    selectHorario.remove(1);
                }
                opcoesHorarios.forEach(opcao => {
                    if (opcao.value === "" && selectHorario.options[0].value === "") {
                        selectHorario.options[0].textContent = opcao.text;
                        return;
                    }
                    const option = document.createElement('option');
                    option.value = opcao.value; // ex: "manha"
                    option.textContent = opcao.text; // ex: "Manhã"
                    selectHorario.appendChild(option);
                });
            }
        });
    };

    // Inicializa o sistema
    inicializarFiltros(); // Popula os dropdowns
    configurarFiltros(); // Configura os botões de busca

    // Lógica para mostrar a primeira aba (Saúde) por padrão
    const btnSaudeInicial = document.getElementById('btn_saude');
    if(btnSaudeInicial){
        toggleServico(btnSaudeInicial); // Usa sua função toggleServico para consistência
    }
});