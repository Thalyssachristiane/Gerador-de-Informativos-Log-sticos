// LISTA DE CIDADES POR ESTADO (UF)
const cidadesPorUF = {
    AC: ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira", "Tarauacá", "Feijó"],
    AL: ["Maceió", "Arapiraca", "Palmeira dos Índios", "Rio Largo", "União dos Palmares"],
    AP: ["Macapá", "Santana", "Laranjal do Jari", "Oiapoque", "Mazagão"],
    AM: ["Manaus", "Parintins", "Itacoatiara", "Manacapuru", "Coari"],
    BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Ilhéus", "Itabuna", "Juazeiro"],
    CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
    DF: ["Brasília", "Ceilândia", "Taguatinga", "Gama", "Planaltina"],
    ES: ["Vitória", "Vila Velha", "Serra", "Cariacica", "Linhares", "Cachoeiro de Itapemirim"],
    GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia", "Catalão"],
    MA: ["São Luís", "Imperatriz", "Caxias", "Timon", "Codó"],
    MT: ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop", "Tangará da Serra", "Sorriso"],
    MS: ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá", "Ponta Porã"],
    MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim", "Montes Claros", "Uberaba", "Governador Valadares"],
    PA: ["Belém", "Ananindeua", "Santarém", "Marabá", "Parauapebas", "Castanhal"],
    PB: ["João Pessoa", "Campina Grande", "Santa Rita", "Patos", "Bayeux"],
    PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel", "São José dos Pinhais", "Foz do Iguaçu", "Colombo", "Guarapuava"],
    PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina", "Paulista"],
    PI: ["Teresina", "Parnaíba", "Picos", "Floriano", "Campo Maior"],
    RJ: ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói", "Campos dos Goytacazes", "Volta Redonda", "Petrópolis"],
    RN: ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante", "Caicó"],
    RS: ["Porto Alegre", "Caxias do Sul", "Canoas", "Pelotas", "Santa Maria", "Gravataí", "Novo Hamburgo", "Passo Fundo"],
    RO: ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena", "Cacoal"],
    RR: ["Boa Vista", "Rorainópolis", "Caracaraí", "Alto Alegre", "Mucajaí"],
    SC: ["Joinville", "Florianópolis", "Blumenau", "Chapecó", "Itajaí", "Criciúma", "Jaraguá do Sul", "Lages", "Palhoça", "Brusque"],
    SP: ["São Paulo", "Campinas", "Guarulhos", "São Bernardo do Campo", "Santo André", "Osasco", "Ribeirão Preto", "Sorocaba", "Santos", "São José dos Campos"],
    SE: ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana", "São Cristóvão"],
    TO: ["Palmas", "Araguaína", "Gurupi", "Porto Nacional", "Paraíso do Tocantins"]
};

// NOME COMPLETO DE CADA UF, PARA RECONHECER O QUE O USUÁRIO DIGITAR
const nomesPorUF = {
    AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia",
    CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás",
    MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais",
    PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí",
    RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul",
    RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo",
    SE: "Sergipe", TO: "Tocantins"
};

function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

// TENTA DESCOBRIR A SIGLA DA UF A PARTIR DO QUE FOI DIGITADO
// aceita "SC", "Santa Catarina" ou "Santa Catarina (SC)"
function resolverUF(textoDigitado) {
    const texto = removerAcentos(textoDigitado);
    if (!texto) return null;

    // sigla exata
    const siglaDireta = textoDigitado.trim().toUpperCase();
    if (nomesPorUF[siglaDireta]) return siglaDireta;

    // procura pelo nome (ou parte dele) dentro do texto digitado
    for (const sigla in nomesPorUF) {
        const nome = removerAcentos(nomesPorUF[sigla]);
        if (texto === nome || texto.includes(nome) || nome.includes(texto)) {
            return sigla;
        }
    }
    return null;
}

document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS
    const tipoAlerta = document.getElementById("tipoAlerta");
    const selectUF = document.getElementById("uf");
    const selectCidade = document.getElementById("cidade");
    const ufSugestoes = document.getElementById("uf-sugestoes");
    const cidadeSugestoes = document.getElementById("cidade-sugestoes");
    const contatoCondutor = document.getElementById("contatoCondutor");

    const grupoUf = document.getElementById("grupo-uf");
    const grupoCidade = document.getElementById("grupo-cidade");
    const grupoContato = document.getElementById("grupo-contato");
    const grupoDetalheContato = document.getElementById("grupo-detalhe-contato");
    const detalheContato = document.getElementById("detalheContato");
    const grupoTelefone = document.getElementById("grupo-telefone");
    const grupoHorario = document.getElementById("grupo-horario");
    const grupoSituacaoVeiculo = document.getElementById("grupo-situacao-veiculo");
    const situacaoVeiculo = document.getElementById("situacaoVeiculo");
    const situacaoVeiculoLabel = document.querySelector('label[for="situacaoVeiculo"]');
    const grupoContingencia = document.getElementById("grupo-contingencia");
    const verificouContingencia = document.getElementById("verificouContingencia");
    const grupoDetalheContingencia = document.getElementById("grupo-detalhe-contingencia");
    const detalheContingencia = document.getElementById("detalheContingencia");
    const grupoMacro = document.getElementById("grupo-macro");
    const grupoUltimaMacro = document.getElementById("grupo-ultima-macro");
    const mandouMacro = document.getElementById("mandouMacro");
    const ultimaMacro = document.getElementById("ultimaMacro");
    const grupoProblema = document.getElementById("grupo-problema");
    const grupoRodovia = document.getElementById("grupo-rodovia");
    const grupoVideo = document.getElementById("grupo-video");
    const grupoCliente = document.getElementById("grupo-cliente");
    const grupoLink = document.getElementById("grupo-link");

    const btnGerar = document.getElementById("btnGerar");
    const btnCopiar = document.getElementById("btnCopiar");

    const painelPlaceholder = document.getElementById("painelPlaceholder");
    const painelResultado = document.getElementById("painelResultado");
    const textoGerado = document.getElementById("textoGerado");

    // lista de opções "Nome (SIGLA)" para o autocomplete de UF
    const opcoesUF = Object.keys(nomesPorUF).map(sigla => `${nomesPorUF[sigla]} (${sigla})`);
    let cidadesDisponiveis = []; // atualizada conforme a UF escolhida

    // alertas que seguem o mesmo padrão do "painel violado"
    const alertasVeiculares = ["painel_violado", "violacao_antena", "perda_bateria", "sensor_desengate"];
    const configAlertaVeicular = {
        painel_violado: { titulo: "PAINEL VIOLADO", tituloRodovia: "PAINEL VIOLADO EM RODOVIA", descricao: "violação de painel" },
        violacao_antena: { titulo: "VIOLAÇÃO DE ANTENA", tituloRodovia: "VIOLAÇÃO DE ANTENA EM RODOVIA", descricao: "violação de antena" },
        perda_bateria: { titulo: "PERDA DE BATERIA", tituloRodovia: "PERDA DE BATERIA EM RODOVIA", descricao: "perda de bateria" },
        sensor_desengate: { titulo: "SENSOR DE DESENGATE", tituloRodovia: "SENSOR DE DESENGATE EM RODOVIA", descricao: "acionamento do sensor de desengate" }
    };

    // EVENTOS
    tipoAlerta.addEventListener("change", ajustarCamposFormulario);
    contatoCondutor.addEventListener("change", alternarDetalheContato);
    mandouMacro.addEventListener("change", alternarUltimaMacro);
    verificouContingencia.addEventListener("change", alternarDetalheContingencia);
    btnGerar.addEventListener("click", gerarInformativo);
    btnCopiar.addEventListener("click", copiarInformativo);

    ajustarCamposFormulario();
    alternarDetalheContato();
    alternarUltimaMacro();
    alternarDetalheContingencia();

    // MOSTRA A CAIXA DE TEXTO SÓ QUANDO HOUVE CONTATO CONFIRMADO
    function alternarDetalheContato() {
        if (contatoCondutor.value === "em_contato") {
            grupoDetalheContato.classList.remove("hidden");
        } else {
            grupoDetalheContato.classList.add("hidden");
        }
    }

    // MOSTRA A CAIXA DE TEXTO SÓ QUANDO FOI ENVIADA ALGUMA MACRO
    function alternarUltimaMacro() {
        if (mandouMacro.value === "sim") {
            grupoUltimaMacro.classList.remove("hidden");
        } else {
            grupoUltimaMacro.classList.add("hidden");
        }
    }

    // MOSTRA A CAIXA DE TEXTO SÓ QUANDO A CONTINGÊNCIA FOI VERIFICADA
    function alternarDetalheContingencia() {
        if (verificouContingencia.value === "sim") {
            grupoDetalheContingencia.classList.remove("hidden");
        } else {
            grupoDetalheContingencia.classList.add("hidden");
        }
    }

    // ---------- AUTOCOMPLETE CUSTOMIZADO (teclado + clique) ----------
    function criarAutocomplete(input, listaEl, getOpcoes, aoSelecionar) {
        let indiceAtivo = -1;

        function renderizar(opcoes) {
            listaEl.innerHTML = "";
            indiceAtivo = -1;

            if (opcoes.length === 0) {
                listaEl.classList.remove("aberto");
                return;
            }

            opcoes.forEach((opcao, i) => {
                const li = document.createElement("li");
                li.textContent = opcao;
                li.dataset.index = i;
                // mousedown dispara antes do blur do input, então o clique funciona
                li.addEventListener("mousedown", (e) => {
                    e.preventDefault();
                    selecionar(opcao);
                });
                listaEl.appendChild(li);
            });

            listaEl.classList.add("aberto");
        }

        function destacar(novoIndice, opcoes) {
            const itens = listaEl.querySelectorAll("li");
            itens.forEach(li => li.classList.remove("destaque"));
            if (novoIndice >= 0 && novoIndice < itens.length) {
                itens[novoIndice].classList.add("destaque");
                itens[novoIndice].scrollIntoView({ block: "nearest" });
            }
            indiceAtivo = novoIndice;
        }

        function selecionar(valor) {
            input.value = valor;
            fechar();
            aoSelecionar(valor);
        }

        function fechar() {
            listaEl.classList.remove("aberto");
            listaEl.innerHTML = "";
            indiceAtivo = -1;
        }

        input.addEventListener("input", () => {
            if (input.disabled) return;
            const opcoes = getOpcoes(input.value);
            renderizar(opcoes);
        });

        input.addEventListener("keydown", (e) => {
            const itens = listaEl.querySelectorAll("li");
            if (!listaEl.classList.contains("aberto") || itens.length === 0) return;

            if (e.key === "ArrowDown") {
                e.preventDefault();
                destacar(Math.min(indiceAtivo + 1, itens.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                destacar(Math.max(indiceAtivo - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const escolhido = indiceAtivo >= 0 ? itens[indiceAtivo].textContent : itens[0].textContent;
                selecionar(escolhido);
            } else if (e.key === "Escape") {
                fechar();
            }
        });

        input.addEventListener("blur", () => {
            // pequeno atraso para permitir o mousedown do clique acontecer antes de fechar
            setTimeout(fechar, 150);
        });
    }

    criarAutocomplete(
        selectUF,
        ufSugestoes,
        (texto) => {
            const alvo = removerAcentos(texto);
            if (!alvo) return opcoesUF;
            return opcoesUF.filter(op => removerAcentos(op).includes(alvo));
        },
        () => carregarCidades()
    );

    criarAutocomplete(
        selectCidade,
        cidadeSugestoes,
        (texto) => {
            const alvo = removerAcentos(texto);
            if (!alvo) return cidadesDisponiveis;
            return cidadesDisponiveis.filter(c => removerAcentos(c).includes(alvo));
        },
        () => {}
    );

    // ATUALIZA A LISTA DE CIDADES DISPONÍVEIS CONFORME O ESTADO DIGITADO
    function carregarCidades() {
        const ufDetectada = resolverUF(selectUF.value);

        if (!ufDetectada) {
            selectCidade.disabled = true;
            selectCidade.placeholder = "Digite o estado primeiro";
            selectCidade.value = "";
            cidadesDisponiveis = [];
            return;
        }

        selectCidade.disabled = false;
        selectCidade.placeholder = "Digite a cidade";
        cidadesDisponiveis = cidadesPorUF[ufDetectada] || [];
    }

    // RETORNA A SIGLA DA UF (usada ao gerar o texto)
    function ufAtual() {
        return resolverUF(selectUF.value) || (selectUF.value.trim().toUpperCase() || "XX");
    }

    // MOSTRA/OCULTA CAMPOS CONFORME O TIPO DE ALERTA
    function ajustarCamposFormulario() {
        const alerta = tipoAlerta.value;

        // reset
        grupoUf.classList.remove("hidden");
        grupoCidade.classList.remove("hidden");
        grupoContato.classList.remove("hidden");
        grupoTelefone.classList.remove("hidden");
        grupoHorario.classList.add("hidden");
        grupoSituacaoVeiculo.classList.add("hidden");
        grupoContingencia.classList.add("hidden");
        grupoDetalheContingencia.classList.add("hidden");
        grupoMacro.classList.add("hidden");
        grupoUltimaMacro.classList.add("hidden");
        grupoProblema.classList.add("hidden");
        grupoRodovia.classList.add("hidden");
        grupoVideo.classList.add("hidden");
        grupoCliente.classList.add("hidden");
        grupoLink.classList.remove("hidden");

        if (alerta === "posicao_atraso") {
            grupoHorario.classList.remove("hidden");
            grupoSituacaoVeiculo.classList.remove("hidden");
            grupoContingencia.classList.remove("hidden");
            situacaoVeiculoLabel.textContent = "O veículo perdeu posição em movimento ou parado?";

        } else if (alerta === "parada_indevida") {
            grupoMacro.classList.remove("hidden");

        } else if (alerta === "desvio_rota") {
            // usa os campos padrão

        } else if (alerta === "problema_mecanico") {
            grupoProblema.classList.remove("hidden");
            grupoRodovia.classList.remove("hidden");
            grupoVideo.classList.remove("hidden");

        } else if (alertasVeiculares.includes(alerta)) {
            grupoMacro.classList.remove("hidden");
            grupoSituacaoVeiculo.classList.remove("hidden");
            grupoRodovia.classList.remove("hidden");
            situacaoVeiculoLabel.textContent = "O veículo estava em movimento ou parado no momento do alerta?";

        } else if (alerta === "confirmacao_entrega") {
            grupoTelefone.classList.add("hidden");
            grupoCliente.classList.remove("hidden");
        }

        alternarDetalheContato();
        alternarUltimaMacro();
        alternarDetalheContingencia();
    }

    function fraseMacro() {
        if (mandouMacro.value === "sim") {
            const valor = ultimaMacro.value.trim() || "XXXXX";
            return `Última macro recebida: ${valor}.`;
        }
        return "Não recebemos macros durante a viagem.";
    }

    function fraseContato(telefone, contexto) {
        const opcao = contatoCondutor.value;
        if (opcao === "nao_atende") {
            return "Condutor não está atendendo e nem recebendo mensagens pelo WhatsApp.";
        }
        if (opcao === "em_contato") {
            const detalhe = detalheContato.value.trim();
            if (detalhe) {
                return detalhe;
            }
            return "Em contato com o condutor, que confirmou a situação.";
        }
        if (contexto === "problema_mecanico") {
            return "Até o momento sem contato com o condutor, poderiam enviar o contato atual do mesmo?";
        }
        return `Até o momento sem êxito no contato junto ao condutor, nº ${telefone}. Enviado mensagem via WhatsApp também, porém sem retorno.`;
    }

    // GERA O TEXTO FINAL
    function gerarInformativo() {
        const alerta = tipoAlerta.value;
        const placa = (document.getElementById("placa").value.trim() || "XXXXX").toUpperCase();
        const ae = document.getElementById("ae").value.trim() || "XXXXX";
        const uf = ufAtual();
        const cidade = selectCidade.value.trim() || "XXXXX";
        const telefone = document.getElementById("telefone").value.trim() || "XXXXXXXXX";
        const horario = document.getElementById("horario").value || "XX:XX";
        const problema = document.getElementById("problema").value.trim();
        const rodovia = document.getElementById("rodovia").value;
        const enviouVideo = document.getElementById("enviouVideo").value;
        const cliente = document.getElementById("cliente").value.trim();
        const link = document.getElementById("link").value.trim();
        const linhaLink = link ? `Link: ${link}\n\n` : "";

        let texto = "";

        if (alerta === "posicao_atraso") {
            const situacaoTexto = situacaoVeiculo.value === "parado"
                ? `perdeu comunicação estando parado na região de ${cidade}/${uf}`
                : `perdeu comunicação em movimento, passando pela região de ${cidade}/${uf}`;

            const detalheConting = detalheContingencia.value.trim();
            const linhaContingencia = (verificouContingencia.value === "sim" && detalheConting)
                ? `${detalheConting}.\n\n`
                : "";

            texto = `*POSIÇÃO EM ATRASO - ${placa} - ${ae}*

Veículo ${placa} ${situacaoTexto}, com última posição às ${horario}hs.

${fraseContato(telefone)}

${linhaContingencia}Tentando contato com os pontos de apoio à frente para confirmação da localização e seguindo demais tratativas.

${linhaLink}Novidades reportarei.`;

        } else if (alerta === "parada_indevida") {
            texto = `*PARADA INDEVIDA - ${placa} - ${ae}*

Veículo ${placa} parou em local não homologado na cidade de ${cidade}/${uf}.

${fraseMacro()}

${fraseContato(telefone)}

Tentando contato com o ponto de apoio para confirmar situação no local e seguindo demais tratativas.

Veículo permanecerá bloqueado até esclarecimentos.

${linhaLink}Novidades reportarei.`;

        } else if (alerta === "desvio_rota") {
            texto = `*DESVIO DE ROTA - ${placa} - ${ae}*

Veículo ${placa} está seguindo fora da rota programada para a viagem. Passando agora pela cidade de ${cidade}/${uf}.

${fraseContato(telefone)}

Seguimos forçando contato com o condutor e assim que o veículo parar será bloqueado até esclarecimentos.

${linhaLink}Novidades reportarei.`;

        } else if (alerta === "problema_mecanico") {
            const tituloMecanico = rodovia === "sim"
                ? `*PROBLEMAS MECÂNICOS EM RODOVIA - ${placa} - ${ae}*`
                : `*PROBLEMA MECÂNICO - ${placa} - ${ae}*`;

            const linhaVideo = enviouVideo === "sim" ? "Segue vídeo que o condutor nos enviou.\n\n" : "";
            const linhaProblema = problema ? `${problema}.\n\n` : "";

            texto = `${tituloMecanico}

Veículo apresentou problemas mecânicos na cidade de ${cidade}/${uf}.

${linhaProblema}${fraseContato(telefone, "problema_mecanico")}

${linhaVideo}${linhaLink}Maiores informações, reportaremos.`;

        } else if (alertasVeiculares.includes(alerta)) {
            const config = configAlertaVeicular[alerta];
            const tituloFinal = rodovia === "sim" ? config.tituloRodovia : config.titulo;
            const situacaoTexto = situacaoVeiculo.value === "parado" ? "estando parado" : "em movimento";

            texto = `*${tituloFinal} - ${placa} - ${ae}*

Recebemos o alerta de ${config.descricao} no veículo ${situacaoTexto}, passando por ${cidade}/${uf}.

${fraseMacro()}

${fraseContato(telefone)}

Estamos forçando contato com ele.

Seguindo com as tratativas.

${linhaLink}Novidades reportarei.`;

        } else if (alerta === "confirmacao_entrega") {
            const nomeCliente = cliente || "cliente";
            texto = `*CONFIRMAÇÃO DE ENTREGA - ${placa} - ${ae}*

Veículo parou neste local e enviou macro de chegada no cliente.

Em contato com o condutor, nos confirmou que se encontra no cliente ${nomeCliente}, e nos enviou foto da nota.

Entrega não informada no sistema.

${linhaLink}Novidades reportarei.`;
        }

        // Remove linhas em branco duplicadas quando linhaLink estiver vazia
        texto = texto.replace(/\n{3,}/g, "\n\n");

        textoGerado.textContent = texto;
        painelPlaceholder.classList.add("hidden");
        painelResultado.classList.remove("hidden");
    }

    // COPIA O TEXTO GERADO
    function copiarInformativo() {
        const texto = textoGerado.textContent;
        navigator.clipboard.writeText(texto).then(() => {
            const textoOriginal = btnCopiar.textContent;
            btnCopiar.textContent = "✅ Copiado!";
            setTimeout(() => {
                btnCopiar.textContent = textoOriginal;
            }, 2000);
        });
    }

});
