import chalk from "chalk";
import fs from "fs";

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}));
    return resultados;
}

function trataErro(erro) {
    // error é um objeto do js, tem as propriedades errno, code, syscal e path
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

// função assíncrona com async/await
async function pegaArquivo(caminhoDoArquivo) {
    try {
        const encoding = 'utf-8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);
        console.log(extraiLinks(texto));
    } catch(erro) {
        trataErro(erro);
    }
}

pegaArquivo('./arquivos/texto.md');