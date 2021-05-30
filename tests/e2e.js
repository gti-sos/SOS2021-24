const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1500, height: 1200 });


//Landing page
await page.goto('http://localhost:10000/');
console.log("Landing page opened");
await page.screenshot({ path: './tests/screenshots/01_landing.png' });

//Info
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(1) > a"),
]);

console.log("Clicked on Info");
await page.screenshot({ path: './tests/screenshots/02_info.png' });

//===================================Analytics========================
//Abandono escolar
console.log("Open analytics");
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(5) > a"),
]);
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/03_analytics.png' });

console.log("School analytics");
await page.click("body > a.btn.btn-dark");
await page.waitForTimeout(9000);
await page.click("body > main > main > button");
await page.click("body > a.btn.btn-dark");
await page.waitForTimeout(7000);
await page.click("body > main > main > button")
await page.click("body > a.btn.btn-dark");
await page.waitForTimeout(5000);
await page.click("body > main > main > button")
await page.click("body > a.btn.btn-dark");
await page.waitForTimeout(7000);
await page.screenshot({ path: './tests/screenshots/04_analytics_school.png' });
await page.click("body > main > main > button")

console.log("Common chart")
await page.click("body > a.btn.btn-primary");
await page.waitForTimeout(9000);
await page.screenshot({ path: './tests/screenshots/05_common_chart.png' });


//==========================Integrations==================================
console.log("Clicked on integrations");
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(6) > a"),
]);
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/06_integrations.png' });

//Abandono escolar
console.log("School integration with education");//Esta sale en blanco el screenshot porque hay demasiados datos...
await page.click("body > div > p > a:nth-child(1)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/07_integrations_school1.png' });
//Volver
await page.click("body > main > main > button");

console.log("School integration with sanity")
await page.click("body > div > p > a:nth-child(2)");
await page.waitForTimeout(4000);
await page.screenshot({ path: './tests/screenshots/08_integrations_school2.png' });
//Volver
await page.click("body > main > main > button");

console.log("School integration with ext. API 1");
await page.click("body > div > a:nth-child(3)");
await page.waitForTimeout(3000);
await page.screenshot({ path: './tests/screenshots/09_integrations_school_ext1.png' });
//Volver
await page.click("body > main > main > button");

console.log("School integration with ext. API 2")
await page.click("body > div > a:nth-child(4)");
await page.waitForTimeout(3000);
await page.screenshot({ path: './tests/screenshots/10_integrations_school_ext2.png' });
//Volver
await page.click("body > main > main > button");

console.log("School integration with ext. API 3")
await page.click("body > div > a:nth-child(5)");
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/11_integrations_school_ext3.png' });
//Volver
await page.click("body > main > main > button.btn.btn-outline-secondary");


//==========================Tablas===============================
//Abandono escolar
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(2) > a"),
]);

console.log("Clicked on Abandono escolar");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/12_school_table_page1.png' });

console.log("Pagination, page 2")
await page.click("body > main > main > div:nth-child(10) > button.btn.btn-outline-info");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/13_school_table_page2.png' });
//Volver a pagina 1
console.log("Return to page 1")
await page.click("body > main > main > div:nth-child(10) > button.btn.btn-outline-info");

console.log("Inserting new data");
await page.focus('#country');
await page.keyboard.type("China");

await page.focus('#year');
await page.keyboard.type("2018");

await page.focus('#male');
await page.keyboard.type("1");

await page.focus('#female');
await page.keyboard.type("1");

await page.focus('#total');
await page.keyboard.type("2");

await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/14_school_imputs_insert.png' });

await page.click("#insertData"),
await page.waitForTimeout(1000);
console.log("New school data added");
await page.screenshot({ path: './tests/screenshots/15_school_insert_final.png' });
await page.click("body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-header > button > span")

console.log("Deleted all school data");
await page.click("#deleteAll");
await page.waitForTimeout(1000);
await page.click("#deleteAll");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/16_school_deleteAll.png' });

console.log("Click on load data");
await page.click("#loadData");
await page.waitForTimeout(1000);
await page.click("#loadData");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/17_school_load.png'});

/*
console.log("Search school data button");
await page.click("body > main > main > button.btn.btn-info"),
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/18_school_search_01.png' });
*/

//Cerrar
await page.close();
await browser.close();
console.log("Closing browser")
})();