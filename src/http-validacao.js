import chalk from "chalk";

function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url);
                return response.status;
            } catch(erro) {
                return manejaErros(erro);
            }
        })
    );
    return arrStatus;
}

function manejaErros(erro) {
    if(erro.code.cause === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'ocorreu algum erro';
    }
}

async function listaValidada(listaDeLinks) {
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);

    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
}

export default listaValidada;