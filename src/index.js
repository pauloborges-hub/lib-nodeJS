import chalk from "chalk";
import fs from 'fs';

function extraiLinks(texto) {
    // uso de expressões regulares (RegEx)
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    // uso de spread operator 
    const capturas = [...texto.matchAll(regex)];
    // construção do objeto iterável 
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    // uso de operadores
    return resultados.length !== 0 ? resultados : 'Não há links no arquivo';
}

function trataErro(erro) {
    if(erro.code == 'EISDIR') { 
        throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
    }
    if(erro.code == 'ENOENT') { 
        throw new Error(chalk.yellow(erro.code, 'arquivo não encontrado'));
    }
}

async function pegaArquivo(caminhoDoArquivo) {
    const encoding = 'utf-8';
    try {
      const texto = await fs.promises.readFile(caminhoDoArquivo, encoding)
      return (extraiLinks(texto));
    } catch(erro) {
      trataErro(erro);
    } finally {
      console.log(chalk.yellow('operação concluída'));
    }
}

export default pegaArquivo;