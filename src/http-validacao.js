function extraiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
}

function listaValidada(listaDeLinks) {
    return extraiLinks(listaDeLinks);
}

export default listaValidada;