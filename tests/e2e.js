const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({width: 1500, height: 1200 });

//Landing page
//await page.goto('http://localhost:10000/');
await page.goto("http://sos2021-24.herokuapp.com/");
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
await page.waitForTimeout(2000);
await page.click("body > main > main > button");
await page.click("body > a.btn.btn-dark");
await page.waitForTimeout(3000);
await page.click("body > main > main > button")
await page.click("body > a.btn.btn-dark");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/04_analytics_school.png' });
await page.click("body > main > main > button");


//Niños empleados
console.log("Employment Analytics");
await page.click("body > a.btn.btn-info");
await page.waitForTimeout(2000);
await page.click("body > main > main > button");
await page.click("body > a.btn.btn-info");
await page.waitForTimeout(2000);
await page.click("body > main > main > button")
await page.click("body > a.btn.btn-info");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/04_analytics_employment.png' });
await page.click("body > main > main > button");


console.log("Common chart");
await page.click("body > a.btn.btn-primary");
await page.waitForTimeout(4500);
await page.screenshot({ path: './tests/screenshots/05_common_chart.png' });

//VIH

console.log("Open analytics");
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(4) > a"),
]);
await page.waitForTimeout(1000);

console.log("HIV analytics");
await page.click("body > main > main > a"); 
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(4) > a");
await page.click("body > main > main > a"); 
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(4) > a") 
await page.click("body > main > main > a"); 
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/31_analytics_hiv.png' }); 
await page.click("body > nav > ul > li:nth-child(4) > a") 


//==========================Integrations==================================
console.log("Clicked on integrations");
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(6) > a"),
]);
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/06_integrations.png' });

//=====================Abandono escolar
console.log("School integration with education");
await page.click("#school1");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#school1");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/07_integrations_school1.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("School integration with sanity")
await page.click("#school2");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#school2");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/08_integrations_school2.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("School integration with obesity")
await page.click("#school3");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#school3");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/09_integrations_school3.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("School integration with food")
await page.click("#school4");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#school4");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/10_integrations_school3.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");


console.log("School integration with ext. API 1");
await page.click("#extapi1");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#extapi1");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/11_integrations_school_ext1.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("School integration with ext. API 2")
await page.click("#extapi2");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#extapi2");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/12_integrations_school_ext2.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("School integration with ext. API 3")
await page.click("#extapi3");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#extapi3");
await page.waitForTimeout(4000);
await page.screenshot({ path: './tests/screenshots/13_integrations_school_ext3.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("School integration with ext. API 4")
await page.click("#extapi4");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#extapi4");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/14_integrations_school_ext4.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

//======================Niños Empleados
console.log("Employment integration with unemployment");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(1)");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(1)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/07_integrations_employment1.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("Employment integration with divorce");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(2)");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(2)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/08_integrations_employment2.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("Employment integration with poverty");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(3)");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(3)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/09_integrations_employment3.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("Employment integration with poverty");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(4)");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("body > table:nth-child(14) > ul:nth-child(2) > a:nth-child(4)");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/11_integrations_employment4.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("Employment integration with ext. API 1");
await page.click("#extApi1");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#extApi1");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/12_integrations_employment_ext1.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

console.log("Employment integration with ext. API 1");
await page.click("#extApi2");
await page.waitForTimeout(2000);
await page.click("body > nav > ul > li:nth-child(6) > a");
await page.click("#extApi2");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/12_integrations_employment_ext2.png' });
//Volver
await page.click("body > nav > ul > li:nth-child(6) > a");

//=========================VIH
//Dos de las APIs de compañeros

console.log("HIV integration with HDI")
await page.click("#hiv3");
await page.waitForTimeout(2000);
await page.click("#back");
await page.click("#hiv3");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/32_integrations_hiv1.png' });
//Volver
await page.click("#back");

console.log("HIV integration with Life")
await page.click("#hiv2");
await page.waitForTimeout(2000);
await page.click("#back2");
await page.click("#hiv2");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/33_integrations_hiv2.png' });
//Volver
await page.click("#back2");

//Una de las APIs externas

console.log("HIV integration with ext. API 4")
await page.click("#externalapi1");
await page.waitForTimeout(2000);
await page.click("#back");
await page.click("#externalapi1");
await page.waitForTimeout(5000);
await page.screenshot({ path: './tests/screenshots/34_integrations_hiv_ext1.png' });
//Volver
await page.click("#back");

//==========================Tablas===============================
//=======================Abandono escolar
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(2) > a"),
]);

console.log("Clicked on Abandono escolar");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/15_school_table_page1.png' });

console.log("Pagination, page 2")
await page.click("body > main > main > div:nth-child(10) > button.btn.btn-outline-info");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/16_school_table_page2.png' });
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
await page.screenshot({ path: './tests/screenshots/17_school_imputs_insert.png' });

await page.click("#insertData"),
await page.waitForTimeout(1000);
console.log("New school data added");
await page.screenshot({ path: './tests/screenshots/18_school_insert_final.png' });
await page.click("#insertData")

console.log("Deleted all school data");
await page.click("#deleteAll");
await page.waitForTimeout(1000);
await page.click("#deleteAll");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/19_school_deleteAll.png' });

console.log("Click on load data");
await page.click("#loadData");
await page.waitForTimeout(1000);
await page.click("#loadData");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/20_school_load.png'});
await page.click("body > nav > ul > li:nth-child(2) > a");

console.log("Search school data button");
await page.focus('#buscar' )
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/21_school_search_01.png' });

console.log("Searching data by country");
await page.focus('#search_country');
await page.keyboard.type("Spain");
await page.screenshot({ path: './tests/screenshots/22_school_search_country_field.png'});
await page.click("#search");
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/23_school_search_country.png'});

await page.focus("#cerrar");
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/24_school_search_country_quitafiltros.png'});

await page.focus("body > main > main > button.btn.btn-warning");
await page.keyboard.type('\n');

await page.focus('#buscar' )
await page.keyboard.type('\n');
await page.waitForTimeout(1000);

console.log("Searching data by country and year");
await page.focus('#search_year');
await page.keyboard.type("2018");
await page.screenshot({ path: './tests/screenshots/25_school_search_country_year_fields.png'});
await page.click("#search");
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/26_school_search_country_year.png'});

await page.focus("#cerrar");
await page.keyboard.type('\n');
await page.focus("body > main > main > button.btn.btn-warning");
await page.keyboard.type('\n');

console.log("Edit button")
//Pongo esto por si en la primera página no estuviera el elemento x
await page.focus('body > main > main > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(1) > a' )
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/27_school_edit.png'});

await page.focus("body > main > main > div.table-responsive > table > tbody > tr > td:nth-child(3) > input[type=number]")
await page.keyboard.type("1");
await page.screenshot({ path: './tests/screenshots/28_school_edit_field.png'});

await page.focus("body > main > main > div.table-responsive > table > tbody > tr > td:nth-child(6) > button");
await page.keyboard.type('\n');
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/29_school_edit_confirm.png'});

await page.focus("body > main > main > a");
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/30_school_after_edit_table.png'});

//=============Niños EMpleados

await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(3) > a"),
]);

console.log("Clicked on Niños Empleados");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/15_employment_table_page1.png' });

console.log("Pagination, page 2")
await page.click("body > main > main > div:nth-child(9) > button.btn.btn-outline-info");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/16_employment_table_page2.png' });
//Volver a pagina 1
console.log("Return to page 1")
await page.click("body > main > main > div:nth-child(9) > button.btn.btn-outline-info");

console.log("Inserting new data");
await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(1) > input[type=text]');
await page.keyboard.type("Acerbaijan");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(2) > input[type=number]');
await page.keyboard.type("2005");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(3) > input[type=number]');
await page.keyboard.type("6");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(4) > input[type=number]');
await page.keyboard.type("4.4");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(5) > input[type=number]');
await page.keyboard.type("5.2");

await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/17_employment_imputs_insert.png' });

await page.click("body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(6) > button"),
await page.waitForTimeout(1000);
console.log("New employment data added");
await page.screenshot({ path: './tests/screenshots/18_employment_insert_final.png' });
await page.click("body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(6) > button")

console.log("Deleted all employment data");
await page.click("body > main > main > button.btn.btn-danger");
await page.waitForTimeout(1000);
await page.click("body > main > main > button.btn.btn-danger");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/19_employment_deleteAll.png' });


console.log("Click on load data");
await page.click("body > main > main > button.btn.btn-success");
await page.waitForTimeout(1000);
await page.click("body > main > main > button.btn.btn-success");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/20_employment_load.png'});
await page.click("body > nav > ul > li:nth-child(3) > a");

console.log("Search employment data button");
await page.focus('body > main > main > button.btn.btn-info' )
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/21_employment_search_01.png' });

console.log("Searching data by country");
await page.focus('body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-body > table > tbody > tr:nth-child(1) > td > input');
await page.keyboard.type("india");
await page.screenshot({ path: './tests/screenshots/22_employment_search_country_field.png'});
await page.click("body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/23_employment_search_country.png'});

await page.focus("body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-body > button");
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/24_employment_search_country_quitafiltros.png'});

await page.focus("body > main > main > button.btn.btn-warning");
await page.keyboard.type('\n');

await page.focus('body > main > main > button.btn.btn-info' )
await page.keyboard.type('\n');
await page.waitForTimeout(1000);


console.log("Searching data by country and year");
await page.focus('body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-body > table > tbody > tr:nth-child(2) > td > input[type=number]');
await page.keyboard.type("2012");
await page.screenshot({ path: './tests/screenshots/25_employment_search_country_year_fields.png'});
await page.click("body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/26_employment_search_country_year.png'});

await page.focus("body > main > main > div:nth-child(2) > div > div.modal.show.d-block > div > div > div.modal-body > button");
await page.keyboard.type('\n');
await page.focus("body > main > main > button.btn.btn-warning");
await page.keyboard.type('\n');

console.log("Edit button")
//Pongo esto por si en la primera página no estuviera el elemento x
await page.focus('body > main > main > div.table-responsive > table > tbody > tr:nth-child(2) > td:nth-child(6) > button.btn.btn-outline-success' )
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/27_employment_edit.png'});

await page.focus("body > main > main > div > table > tbody > tr > td:nth-child(3) > input[type=number]")
await page.keyboard.type("1");
await page.screenshot({ path: './tests/screenshots/28_employment_edit_field.png'});

await page.focus("body > main > main > div > table > tbody > tr > td:nth-child(6) > button");
await page.keyboard.type('\n');
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/29_employment_edit_confirm.png'});

await page.focus("body > main > main > a");
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/30_employment_after_edit_table.png'});

//=======================VIH
await Promise.all([
    page.waitForNavigation(),
    page.click("body > nav > ul > li:nth-child(4) > a"), 
]);

console.log("Clicked on Niños/as con VIH");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/35_hiv_table_page1.png' });

console.log("Pagination, page 2")
await page.click("body > main > main > div:nth-child(13) > button.btn.btn-outline-info");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/36_hiv_table_page2.png' });
//Volver a pagina 1
console.log("Return to page 1")
await page.click("body > main > main > div:nth-child(13) > button:nth-child(1)");

console.log("Inserting new data");
await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(1) > input[type=text]');
await page.keyboard.type("Perú");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(2) > input[type=number]');
await page.keyboard.type("2020");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(3) > input[type=number]');
await page.keyboard.type("100");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(4) > input[type=number]');
await page.keyboard.type("100");

await page.focus('body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(5) > input[type=number]');
await page.keyboard.type("200");

await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/37_hiv_inputs_insert.png' });

await page.click("body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(6) > button"),
await page.waitForTimeout(1000);
console.log("New HIV data added");
await page.screenshot({ path: './tests/screenshots/38_hiv_insert_final.png' });
await page.click("body > main > main > div.table-responsive > table > thead > tr:nth-child(2) > td:nth-child(6) > button")

console.log("Deleted all HIV data");
await page.click("body > main > main > button.btn.btn-outline-danger");
await page.waitForTimeout(1000);
await page.click("body > main > main > button.btn.btn-outline-danger");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/39_hiv_deleteAll.png' });

console.log("Click on load data");
await page.click("body > main > main > button.btn.btn-outline-success");
await page.waitForTimeout(1000);
await page.click("body > main > main > button.btn.btn-outline-success");
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/40_hiv_load.png'});
await page.click("body > nav > ul > li:nth-child(4) > a");

console.log("Search hiv data button");
await page.focus('body > main > main > button.btn.btn-outline-info' )
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/41_hiv_search_01.png' });

console.log("Searching data by country");
await page.focus('#paises');
await page.keyboard.type("Spain");
await page.screenshot({ path: './tests/screenshots/42_hiv_search_country_field.png'});
await page.click("#modal > div > div.modal.show.d-block > div > div > div.modal-footer > button.btn.btn-primary");
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/43_hiv_search_country.png'});

await page.click("body > main > main > button.btn.btn-outline-info"); 
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/44_hiv_search_country_quitafiltros.png'});

await page.focus("body > main > main > button.btn.btn-outline-info"); 
await page.keyboard.type('\n');

await page.focus('body > main > main > button.btn.btn-outline-info' )
await page.keyboard.type('\n');
await page.waitForTimeout(1000);

console.log("Edit button")
//Pongo esto por si en la primera página no estuviera el elemento x
await page.focus('body > main > main > div.table-responsive > table > tbody > tr:nth-child(1) > td:nth-child(6) > button.btn.btn-outline-success' )
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/47_hiv_edit.png'});

await page.focus("body > main > main > div > table > tbody > tr > td:nth-child(3) > input")
await page.keyboard.type("1");
await page.screenshot({ path: './tests/screenshots/48_hiv_edit_field.png'});

await page.focus("body > main > main > div > table > tbody > tr > td:nth-child(6) > button");
await page.keyboard.type('\n');
await page.waitForTimeout(1000);
await page.screenshot({ path: './tests/screenshots/49_hiv_edit_confirm.png'});

await page.focus("body > main > main > div:nth-child(3) > div.modal.show.d-block > div > div > div.modal-body > div > button:nth-child(3)");
await page.keyboard.type('\n');
await page.waitForTimeout(2000);
await page.screenshot({ path: './tests/screenshots/50_hiv_after_edit_table.png'});

//Cerrar
await page.close();
await browser.close();
console.log("Closing browser")
})();