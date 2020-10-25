const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://instagram.com/leonardomf_');
    //await page.screenshot({ path: 'example.png' });

   
    // Toda essa função será executada no browser
    const imgList = await page.evaluate(() => {
        // Pegar todos as imagens que estão  na parte de posts
        const nodeList = document.querySelectorAll('article img');
        
        // Transforma o NodeList em array
        const imgArray = [...nodeList];
        
        // Transformar os nodes (elementos html) em objetos JS
        const imgList = imgArray.map( ({src}) => ({
            src
        }));
        console.log(imgList);

        // Colocar para fora da função
        return imgList;
    });

    // Escrever os dados em um arquivo local (JSON)
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new Error('Algo de errado aconteceu');

        console.log('Funcionou!!!');
    });

    await browser.close();
})();