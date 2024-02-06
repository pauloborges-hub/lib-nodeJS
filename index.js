import chalk from "chalk";
import fs from "fs";


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
        console.log(chalk.green(texto));
    } catch(erro) {
        trataErro(erro);
    }
}

// função assincrona com then()
// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.promises
//         .readFile(caminhoDoArquivo, encoding)               // lê o arquivo
//         .then((texto) => console.log(chalk.green(texto)))   // assim que terminar de ler, exibe no terminal
//         .catch(trataErro);                                  // assim que terminar de ler, se erro = true, chama a função trataErro com erro como parâmetro
// }

// function pegaArquivo(caminhoDoArquivo) {
//     const encoding = 'utf-8';
//     fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//         if(erro) {
//             trataErro(erro);
//         }
//         console.log(chalk.green(texto));
//     })
// }

pegaArquivo('./arquivos/.md');