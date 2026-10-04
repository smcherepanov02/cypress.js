import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () { 

    beforeEach('Начало теста', function () {
         cy.visit('/'); // Зашли на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверка, что кнопка "Забыли пароль" того цвета
        });

    afterEach('Конец теста', function () {
         cy.get(result_page.close).should('be.visible'); // Проверка, что крестик виден пользвотелю
        });
   
    it('Верный логин и верный пароль', function () {

        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click();; // Нажали на кнопку "Войти"

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверка. Надпись "Успешная авторизация" 
        cy.get(result_page.title).should('be.visible'); // Проверка. Надпись видна пользвотелю
        cy.get(result_page.footer).should('be.visible'); // Проверка. Надпись "qa.studio" видна пользователю
    })

    it('Верный логин и неверный пароль', function () {

        cy.get(main_page.email).type(data.login); //  Ввели верный логин
        cy.get(main_page.password).type('qa_one_love'); // Ввели неверный пароль
        cy.get(main_page.login_button).click();; // Нажали кнопку "Войти"

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверка. Надпись "Такого логина или пароля нет"
        cy.get(result_page.title).should('be.visible'); // Проверка. Надпись видна пользвотелю
        cy.get(result_page.footer).should('be.visible'); // Проверка. Надпись "qa.studio" видна пользователю
    })    

    it('Невалидный логин и верный пароль', function () {

        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели невалидный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click();; // Нажали кнопку "Войти"

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверка. Надпись "Нужно исправить проблему валидации"
        cy.get(result_page.title).should('be.visible'); // Проверка. Надпись видна пользвотелю
        cy.get(result_page.footer).should('be.visible'); // Проверка. Надпись "qa.studio" видна пользователю
    })

    it('Забыли пароль, отправка сообщения на почту', function () {

        cy.get(main_page.fogot_pass_btn).click(); // Нажали кнопку "Забыли пароль"

        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); // Ввели почту
        cy.get(recovery_password_page.send_button).click(); // Нажать кнопку "Отправить код"

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // Проверка. Надпись "Успешно отправили пароль на e-mail" видна пользователю
        cy.get(result_page.footer).should('be.visible'); // Проверка. Надпись "qa.studio" видна пользователю
    })
})
