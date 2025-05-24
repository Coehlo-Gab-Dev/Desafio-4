document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos interativos
    const botoesServicos = document.querySelectorAll('[role="tab"]:not(.sub_btn)');
    const boxesServicos = document.querySelectorAll('[role="tabpanel"]');
    const subBotoes = document.querySelectorAll('.sub_btn'); // Botões UPA, UBS, Hospital, etc.
    let servicoAtual = null; // Categoria principal ativa (ex: 'saude')
    let subServicoAtual = { categoria: null, tipo: null, elemento: null }; // Sub-serviço ativo

    // PARA PAGINAÇÃO: Armazena os últimos parâmetros usados na busca principal
    let ultimosParametrosDeBusca = {
        categoria: null,
        tipoApiQuery: null,
        localSelecionado: null,
        horarioFrontendSelecionado: null,
        // paginaAtual será obtida dos metadados
    };

    // Configura o ano atual no footer
    const anoAtual = document.getElementById('current-year');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    const limparFiltros = (categoria) => {
        const boxServico = document.getElementById(`${categoria}-content`);
        if (!boxServico) return;

        const selectLocal = boxServico.querySelector(`#select_local_${categoria}`);
        const selectHorario = boxServico.querySelector(`#select_horario_${categoria}`);

        if (selectLocal) selectLocal.value = '';
        if (selectHorario) selectHorario.value = '';

        const divResultados = boxServico.querySelector(`#resultados-${categoria}`);
        if (divResultados) {
            divResultados.innerHTML = '<p>Utilize os filtros acima para buscar.</p>';
        }
    };

    const resetarEstados = () => {
        botoesServicos.forEach(botao => {
            botao.setAttribute('aria-selected', 'false');
            botao.classList.remove('active');
        });

        boxesServicos.forEach(box => {
            box.hidden = true;
        });

        subBotoes.forEach(subBotao => {
            subBotao.setAttribute('aria-selected', 'false');
            subBotao.classList.remove('active');
        });
        subServicoAtual = { categoria: null, tipo: null, elemento: null };
    };

    const toggleServico = (botaoClicado) => {
        const alvo = botaoClicado.dataset.alvo;
        const boxAlvo = document.getElementById(`${alvo}-content`);

        if (servicoAtual === alvo) {
            if (servicoAtual) limparFiltros(servicoAtual);
            servicoAtual = null;
            resetarEstados();
            return;
        }

        if (servicoAtual) limparFiltros(servicoAtual);
        resetarEstados();

        servicoAtual = alvo;

        botaoClicado.setAttribute('aria-selected', 'true');
        botaoClicado.classList.add('active');

        if (boxAlvo) {
            boxAlvo.hidden = false;
        }
    };

    const ativarSubServico = (botaoClicado) => {
        const categoriaPai = botaoClicado.closest('[role="tabpanel"]');
        if (!categoriaPai) return;
        const categoria = categoriaPai.id.replace('-content', '');
        const tipo = botaoClicado.dataset.alvo;

        if (subServicoAtual.elemento === botaoClicado) {
            botaoClicado.setAttribute('aria-selected', 'false');
            botaoClicado.classList.remove('active');
            subServicoAtual = { categoria: null, tipo: null, elemento: null };
            limparFiltros(categoria);
            return;
        }

        limparFiltros(categoria);

        const outrosSubBotoes = botaoClicado.parentElement.querySelectorAll('.sub_btn');
        outrosSubBotoes.forEach(botao => {
            botao.setAttribute('aria-selected', 'false');
            botao.classList.remove('active');
        });

        botaoClicado.setAttribute('aria-selected', 'true');
        botaoClicado.classList.add('active');
        subServicoAtual = { categoria, tipo, elemento: botaoClicado };
    };

    botoesServicos.forEach(botao => {
        botao.addEventListener('click', () => toggleServico(botao));
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleServico(botao); }
        });
    });

    subBotoes.forEach(botao => {
        botao.addEventListener('click', () => ativarSubServico(botao));
        botao.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ativarSubServico(botao); }
        });
    });

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

    // --- FUNÇÃO CENTRALIZADA PARA EXECUTAR A BUSCA (INCLUINDO PAGINAÇÃO) ---
    async function executarBuscaComPaginacao(categoria, tipoApiQuery, localSelecionado, horarioFrontendSelecionado, pagina = 1) {
        const divResultados = document.getElementById(`${categoria}-content`).querySelector(`#resultados-${categoria}`);
        if (!divResultados) {
            console.error("Div de resultados não encontrada para categoria:", categoria);
            return;
        }

        if (categoria === 'saude') {
            if (!tipoApiQuery) { // Este tipoApiQuery vem de ultimosParametrosDeBusca ao paginar
                divResultados.innerHTML = '<p class="erro">Por favor, selecione um tipo de serviço de saúde (UPA, UBS, Hospital, etc.) antes de paginar.</p>';
                // Se for a busca inicial, o configurarFiltros já trata isso.
                // Se ultimosParametrosDeBusca.tipoApiQuery for null e estiver paginando, algo está errado.
                return;
            }

            let apiUrl = 'http://localhost:3000/api/v1/saude';
            const queryParams = new URLSearchParams();

            if (tipoApiQuery) {
                queryParams.append('tipo', tipoApiQuery);
            }
            if (localSelecionado) {
                queryParams.append('municipio_nome', localSelecionado);
            }
            queryParams.append('pagina', pagina); // Adiciona o parâmetro da página

            if (queryParams.toString()) {
                apiUrl += `?${queryParams.toString()}`;
            }

            console.log(`Frontend: Buscando ${categoria} em:`, apiUrl);
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
                        const filtroHorario = horarioFrontendSelecionado;
                        if (filtroHorario === "manha" && horarioEst.includes("manha")) return true;
                        if (filtroHorario === "tarde" && horarioEst.includes("tarde")) return true;
                        if (filtroHorario === "noite" && horarioEst.includes("noite")) return true;
                        if ((filtroHorario === "24-horas" || filtroHorario === "24h") && (horarioEst.includes("24h") || horarioEst.includes("24 horas"))) return true;
                        return false;
                    });
                }
                renderizarResultadosSaude(estabelecimentosParaExibir, resultadoApi.metadados, divResultados, categoria);
            } else {
                divResultados.innerHTML = `<p>Nenhum resultado encontrado. ${resultadoApi?.erro?.mensagem || ''}</p>`;
                 // Limpa controles de paginação se não houver resultados ou erro
                const controlesPaginacaoExistentes = divResultados.querySelector('.paginacao-controls');
                if (controlesPaginacaoExistentes) {
                    controlesPaginacaoExistentes.remove();
                }
            }
        } else {
            console.log(`Busca para ${categoria} ainda não implementada com API real.`);
            divResultados.innerHTML = `<p>Busca para ${categoria} ainda não implementada.</p>`;
        }
    }


    // --- FUNÇÃO PARA RENDERIZAR OS CONTROLES DE PAGINAÇÃO ---
    function renderizarControlesPaginacao(metadados, divResultadosAlvo, categoria) {
        // Remove controles de paginação existentes para não duplicar
        const controlesPaginacaoExistentes = divResultadosAlvo.querySelector('.paginacao-controls');
        if (controlesPaginacaoExistentes) {
            controlesPaginacaoExistentes.remove();
        }

        if (metadados && metadados.paginacao && metadados.paginacao.totalPaginas > 1) {
            const paginacaoDiv = document.createElement('div');
            paginacaoDiv.className = 'paginacao-controls'; // Classe para estilização

            const infoPagina = document.createElement('p');
            infoPagina.className = 'paginacao-info';
            infoPagina.textContent = `Página ${metadados.paginacao.paginaAtual} de ${metadados.paginacao.totalPaginas}. Total de itens: ${metadados.paginacao.totalItens}.`;
            paginacaoDiv.appendChild(infoPagina);

            const containerBotoes = document.createElement('div');
            containerBotoes.className = 'paginacao-botoes';

            // Botão Anterior
            if (metadados.paginacao.paginaAtual > 1) {
                const btnAnterior = document.createElement('button');
                btnAnterior.textContent = 'Anterior';
                btnAnterior.className = 'btn btn-paginacao btn-anterior'; // Adiciona classe 'btn' para estilo base
                btnAnterior.addEventListener('click', () => {
                    executarBuscaComPaginacao(
                        ultimosParametrosDeBusca.categoria,
                        ultimosParametrosDeBusca.tipoApiQuery,
                        ultimosParametrosDeBusca.localSelecionado,
                        ultimosParametrosDeBusca.horarioFrontendSelecionado,
                        metadados.paginacao.paginaAtual - 1
                    );
                });
                containerBotoes.appendChild(btnAnterior);
            }

            // Botão Próxima
            if (metadados.paginacao.paginaAtual < metadados.paginacao.totalPaginas) {
                const btnProxima = document.createElement('button');
                btnProxima.textContent = 'Próxima';
                btnProxima.className = 'btn btn-paginacao btn-proxima'; // Adiciona classe 'btn' para estilo base
                btnProxima.addEventListener('click', () => {
                     executarBuscaComPaginacao(
                        ultimosParametrosDeBusca.categoria,
                        ultimosParametrosDeBusca.tipoApiQuery,
                        ultimosParametrosDeBusca.localSelecionado,
                        ultimosParametrosDeBusca.horarioFrontendSelecionado,
                        metadados.paginacao.paginaAtual + 1
                    );
                });
                containerBotoes.appendChild(btnProxima);
            }
            paginacaoDiv.appendChild(containerBotoes);
            divResultadosAlvo.appendChild(paginacaoDiv); // Adiciona ao final da div de resultados
        }
    }


    // --- FUNÇÃO PARA RENDERIZAR OS RESULTADOS DE SAÚDE (MODIFICADA PARA INCLUIR PAGINAÇÃO) ---
    function renderizarResultadosSaude(dados, metadados, divResultadosAlvo, categoria) { // Adicionado 'categoria' como parâmetro
        // Limpa apenas a lista de resultados, não os controles de paginação que serão recriados
        const listaExistente = divResultadosAlvo.querySelector('.lista-estabelecimentos');
        if (listaExistente) {
            listaExistente.remove();
        }
        // Limpa mensagem de "Nenhum encontrado" ou "Buscando" antes de adicionar novos resultados ou controles
        divResultadosAlvo.innerHTML = '';


        if (!dados || dados.length === 0) {
            divResultadosAlvo.innerHTML = '<p>Nenhum estabelecimento encontrado para os filtros aplicados.</p>';
            if (metadados && metadados.avisoConsulta) {
                divResultadosAlvo.innerHTML += `<p><small>Aviso: ${metadados.avisoConsulta}</small></p>`;
            }
            // Mesmo sem dados, renderiza os controles de paginação se houver metadados para eles (ex: API retorna 0 itens na página X de Y)
            // Ou, se preferir, não renderize se dados.length === 0. Por ora, vamos tentar renderizar.
            renderizarControlesPaginacao(metadados, divResultadosAlvo, categoria);
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

        // Renderiza os controles de paginação
        renderizarControlesPaginacao(metadados, divResultadosAlvo, categoria);
    }


    // --- FUNÇÃO DE BUSCA INICIAL (PELO BOTÃO "BUSCAR") ---
    const configurarFiltros = () => {
        document.querySelectorAll('.btn_buscar').forEach(botao => {
            botao.addEventListener('click', async function() {
                const boxPai = this.closest('[role="tabpanel"]');
                if (!boxPai) return;
                const categoria = boxPai.id.replace('-content', '');
                // const divResultados = boxPai.querySelector(`#resultados-${categoria}`); // movido para executarBuscaComPaginacao

                // if (!divResultados) {
                //     console.error("Div de resultados não encontrada para categoria:", categoria);
                //     return;
                // }

                const localSelecionado = boxPai.querySelector(`#select_local_${categoria}`)?.value;
                const horarioFrontendSelecionado = boxPai.querySelector(`#select_horario_${categoria}`)?.value;

                let tipoApiQuery = null;
                if (subServicoAtual.categoria === categoria && subServicoAtual.tipo) {
                    tipoApiQuery = subServicoAtual.tipo.toUpperCase();
                }

                if (categoria === 'saude') {
                    if (!tipoApiQuery) {
                        const divResultados = boxPai.querySelector(`#resultados-${categoria}`);
                        if (divResultados) divResultados.innerHTML = '<p class="erro">Por favor, selecione um tipo de serviço de saúde (UPA, UBS, Hospital, etc.).</p>';
                        return;
                    }
                     // Salva os parâmetros para uso na paginação
                    ultimosParametrosDeBusca = { categoria, tipoApiQuery, localSelecionado, horarioFrontendSelecionado };
                    // Busca inicial é sempre página 1
                    executarBuscaComPaginacao(categoria, tipoApiQuery, localSelecionado, horarioFrontendSelecionado, 1);

                } else {
                     const divResultados = boxPai.querySelector(`#resultados-${categoria}`);
                    // Aqui iria a lógica para outras categorias (Educação, Cultura, etc.)
                    console.log(`Busca para ${categoria} ainda não implementada com API real.`);
                    if(divResultados) divResultados.innerHTML = `<p>Busca para ${categoria} ainda não implementada.</p>`;
                }
            });
        });
    };

    const inicializarFiltros = () => {
        const opcoesLocais = [
            { value: "", text: "Todo o Maranhão" },
            { value: "Sao Luis", text: "São Luís" },
            { value: "Imperatriz", text: "Imperatriz" },
            { value: "Caxias", text: "Caxias" },
            { value: "Bacabal", text: "Bacabal" },
            { value: "Acailandia", text: "Açailândia" }
        ];

        const opcoesHorarios = [
            { value: "", text: "Qualquer Horário" },
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
                while (selectLocal.options.length > 1) {
                    selectLocal.remove(1);
                }
                opcoesLocais.forEach(opcao => {
                    if (opcao.value === "" && selectLocal.options[0].value === "") {
                        selectLocal.options[0].textContent = opcao.text;
                        return;
                    }
                    const option = document.createElement('option');
                    option.value = opcao.value;
                    option.textContent = opcao.text;
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
                    option.value = opcao.value;
                    option.textContent = opcao.text;
                    selectHorario.appendChild(option);
                });
            }
        });
    };

    // Inicializa o sistema
    inicializarFiltros(); // Popula os dropdowns
    configurarFiltros(); // Configura os botões de busca

    const btnSaudeInicial = document.getElementById('btn_saude');
    if (btnSaudeInicial) {
        toggleServico(btnSaudeInicial);
    }
});