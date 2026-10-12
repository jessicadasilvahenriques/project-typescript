"use strict";
// PARTE 1 - INTERFACES
// PARTE 2 - ENUMS
// Enum com os planos disponíveis na plataforma
var Plano;
(function (Plano) {
    Plano[Plano["Gratuito"] = 0] = "Gratuito";
    Plano[Plano["Standard"] = 1] = "Standard";
    Plano[Plano["Premium"] = 2] = "Premium";
})(Plano || (Plano = {}));
// Enum com os géneros dos conteúdos
var Genero;
(function (Genero) {
    Genero["Acao"] = "Acao";
    Genero["Comedia"] = "Comedia";
    Genero["Drama"] = "Drama";
    Genero["Terror"] = "Terror";
    Genero["Documentario"] = "Documentario";
})(Genero || (Genero = {}));
// PARTE 4 - FUNÇÕES DO CATÁLOGO
// Procura um conteúdo através do seu ID
// Se não for indicado um ID, utiliza o valor 1
function procurarPorId(catalogo, id = 1) {
    return catalogo.find((conteudo) => conteudo.id === id);
}
// Devolve os conteúdos que pertencem ao género indicado
function filtrarPorGenero(catalogo, genero) {
    return catalogo.filter((conteudo) => conteudo.genero === genero);
}
// Filtra o catálogo por filmes ou séries
function filtrarPorTipo(catalogo, tipo) {
    return catalogo.filter((conteudo) => conteudo.tipo === tipo);
}
// Ordena os conteúdos pela classificação, da maior para a menor
// Cria uma cópia para não alterar o catálogo original
function ordenarPorClassificacao(catalogo) {
    return [...catalogo].sort((a, b) => b.classificacao - a.classificacao);
}
// Calcula a duração total de todos os conteúdos
function duracaoTotal(catalogo) {
    let total = 0;
    // Percorre todos os conteúdos e soma as durações
    for (const conteudo of catalogo) {
        total += conteudo.duracao;
    }
    return total;
}
// PARTE 5 - PLANOS E PERFIS
// Verifica se o utilizador pode ver um conteúdo
function podeVer(utilizador, conteudo) {
    // O plano gratuito só permite classificações inferiores a 3
    if (utilizador.plano === Plano.Gratuito) {
        return conteudo.classificacao < 3;
    }
    // Os restantes planos permitem ver todos os conteúdos
    return true;
}
// Adiciona um conteúdo à lista de favoritos
function adicionarFavorito(perfil, id) {
    return {
        ...perfil, // Mantém os dados do perfil original
        favoritos: [...perfil.favoritos, id], // Adiciona o novo favorito
    };
}
// Regista uma nova visualização no histórico
function registarVisualizacao(perfil, id, percentagem) {
    return {
        ...perfil,
        // Adiciona o ID, a data atual e a percentagem visualizada
        historico: [...perfil.historico, [id, new Date(), percentagem]],
    };
}
// Verifica se o plano de subscrição é válido
function validarPlano(plano) {
    switch (plano) {
        case Plano.Gratuito:
            return "Plano Gratuito";
        case Plano.Standard:
            return "Plano Standard";
        case Plano.Premium:
            return "Plano Premium";
        // Se o plano não existir, apresenta um erro
        default:
            throw new Error("Plano inválido");
    }
}
// PARTE 6 - ESTATÍSTICAS E RESPOSTAS
// Calcula algumas estatísticas do catálogo
function gerarEstatisticas(catalogo) {
    // Conta todos os conteúdos
    const total = catalogo.length;
    // Conta apenas os filmes
    const filmes = catalogo.filter((conteudo) => conteudo.tipo === "filme").length;
    // Conta apenas as séries
    const series = catalogo.filter((conteudo) => conteudo.tipo === "serie").length;
    let somaClassificacoes = 0;
    // Soma as classificações dos conteúdos
    for (const conteudo of catalogo) {
        somaClassificacoes += conteudo.classificacao;
    }
    // Devolve um objeto com as estatísticas
    return {
        totalConteudos: total,
        totalFilmes: filmes,
        totalSeries: series,
        // Calcula as médias, evitando dividir por zero
        duracaoMedia: total > 0 ? duracaoTotal(catalogo) / total : 0,
        classificacaoMedia: total > 0 ? somaClassificacoes / total : 0,
    };
}
// Mostra o resultado de uma resposta da API
function processarResposta(resposta) {
    // Se a resposta tiver sucesso, mostra os dados
    if (resposta.sucesso === true) {
        console.log("Sucesso! Dados recebidos:", resposta.dados);
    }
    else {
        // Se houver erro, mostra a mensagem e o código
        console.log("Erro:", resposta.mensagem, "Código:", resposta.codigoErro);
    }
}
// Organiza os conteúdos por género
function agruparPorGenero(catalogo) {
    const grupos = {
        [Genero.Acao]: [],
        [Genero.Comedia]: [],
        [Genero.Drama]: [],
        [Genero.Terror]: [],
        [Genero.Documentario]: [],
    };
    // Percorre o catálogo e coloca cada conteúdo no seu género
    for (const conteudo of catalogo) {
        grupos[conteudo.genero].push(conteudo);
    }
    return grupos;
}
// PARTE 7 - CRIAÇÃO DE DADOS E TESTES
// Criar um catálogo com 6 conteúdos diferentes
const catalogo = [
    {
        id: 1,
        titulo: "Titanic",
        anoLancamento: 1997,
        duracao: 195,
        classificacao: 5,
        tipo: "filme",
        genero: Genero.Drama,
        atores: ["Leonardo DiCaprio", "Kate Winslet"],
    },
    {
        id: 2,
        titulo: "Stranger Things",
        anoLancamento: 2016,
        duracao: 50,
        classificacao: 5,
        tipo: "serie",
        genero: Genero.Terror,
        atores: ["Millie Bobby Brown"],
        temporadas: 5,
    },
    {
        id: 3,
        titulo: "Mr. Bean",
        anoLancamento: 1990,
        duracao: 25,
        classificacao: 2,
        tipo: "serie",
        genero: Genero.Comedia,
        atores: ["Rowan Atkinson"],
        temporadas: 1,
    },
    {
        id: 4,
        titulo: "Vingadores",
        anoLancamento: 2012,
        duracao: 143,
        classificacao: 4,
        tipo: "filme",
        genero: Genero.Acao,
        atores: ["Robert Downey Jr.", "Chris Evans"],
    },
    {
        id: 5,
        titulo: "Planeta Terra",
        anoLancamento: 2006,
        duracao: 50,
        classificacao: 3,
        tipo: "serie",
        genero: Genero.Documentario,
        atores: [],
        temporadas: 1,
    },
    {
        id: 6,
        titulo: "Sozinho em Casa",
        anoLancamento: 1990,
        duracao: 103,
        classificacao: 2,
        tipo: "filme",
        genero: Genero.Comedia,
        atores: ["Macaulay Culkin"],
    },
];
// Criar 3 utilizadores com planos diferentes
const utilizadores = [
    {
        id: 1,
        nome: "Jessica",
        email: "jessy@email.com",
        verificado: true,
        dataRegisto: new Date("2026-01-10"),
        pais: "Suiça",
        plano: Plano.Gratuito,
    },
    {
        id: 2,
        nome: "Laura",
        email: "lau@email.com",
        verificado: true,
        dataRegisto: new Date("2026-02-15"),
        plano: Plano.Standard,
    },
    {
        id: 3,
        nome: "Barbara",
        email: "ba@email.com",
        verificado: false,
        dataRegisto: new Date("2026-03-20"),
        pais: "Portugal",
        plano: Plano.Premium,
    },
];
// Criar o primeiro perfil com histórico e favoritos
const perfil1 = {
    id: 1,
    nome: "Jessica",
    email: "jessy@email.com",
    verificado: true,
    dataRegisto: new Date("2026-01-10"),
    pais: "Suiça",
    plano: Plano.Gratuito,
    historico: [[3, new Date("2026-01-10"), 100]],
    favoritos: [3, 6],
};
// Criar o segundo perfil com histórico e favoritos
const perfil2 = {
    id: 2,
    nome: "Laura",
    email: "lau@email.com",
    verificado: true,
    dataRegisto: new Date("2026-02-15"),
    plano: Plano.Standard,
    historico: [[1, new Date("2026-02-20"), 80]],
    favoritos: [1, 4],
};
// TESTES
// Testar a pesquisa de um conteúdo pelo ID
console.log("Procurar por ID:", procurarPorId(catalogo, 1));
// Testar a pesquisa sem indicar um ID
console.log("Procurar com ID por defeito:", procurarPorId(catalogo));
// Mostrar apenas conteúdos de comédia
console.log("Filtrar por género:", filtrarPorGenero(catalogo, Genero.Comedia));
// Mostrar apenas os filmes
console.log("Filtrar por tipo:", filtrarPorTipo(catalogo, "filme"));
// Ordenar os conteúdos pela classificação
console.log("Ordenar por classificação:", ordenarPorClassificacao(catalogo));
// Calcular a duração total
console.log("Duração total:", duracaoTotal(catalogo));
// Procurar utilizadores com planos diferentes
const utilizadorGratuito = utilizadores.find((u) => u.plano === Plano.Gratuito);
const utilizadorPremium = utilizadores.find((u) => u.plano === Plano.Premium);
// Procurar o conteúdo com ID 1
const primeiroConteudo = procurarPorId(catalogo, 1);
// Verificar se o utilizador gratuito pode ver o conteúdo
if (utilizadorGratuito && primeiroConteudo) {
    console.log("Pode ver (Gratuito):", podeVer(utilizadorGratuito, primeiroConteudo));
}
// Verificar se o utilizador Premium pode ver o conteúdo
if (utilizadorPremium && primeiroConteudo) {
    console.log("Pode ver (Premium):", podeVer(utilizadorPremium, primeiroConteudo));
}
// Adicionar o conteúdo 2 aos favoritos do primeiro perfil
console.log("Adicionar favorito:", adicionarFavorito(perfil1, 2));
// Registar uma visualização de 75% do conteúdo 4
console.log("Registar visualização:", registarVisualizacao(perfil2, 4, 75));
// Testar um plano válido
console.log("Validar plano:", validarPlano(Plano.Standard));
// Testar um plano inválido
try {
    console.log(validarPlano(99));
}
catch (erro) {
    console.log("Teste de plano inválido:", erro);
}
// Mostrar as estatísticas do catálogo
console.log("Estatísticas:", gerarEstatisticas(catalogo));
// Criar uma resposta de sucesso
const respostaSucesso = {
    sucesso: true,
    dados: catalogo,
};
// Criar uma resposta de erro
const respostaErro = {
    sucesso: false,
    mensagem: "Erro ao carregar conteúdos",
    codigoErro: 404,
};
// Testar os dois tipos de resposta
processarResposta(respostaSucesso);
processarResposta(respostaErro);
// Mostrar os conteúdos agrupados por género
console.log("Agrupar por género:", agruparPorGenero(catalogo));
// Mostrar os dois perfis criados
console.log("Perfil 1:", perfil1);
console.log("Perfil 2:", perfil2);
