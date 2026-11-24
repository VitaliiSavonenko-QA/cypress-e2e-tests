describe('Login validation', function () {
    let data;

    beforeEach(function () {
        data = {
            login: Cypress.env('QA_LOGIN'),
            password: Cypress.env('QA_PASSWORD'),
        };
        if (!data.login || !data.password) this.skip();
    });

   it('Valid email and password', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type(data.login, { log: false });
        cy.get('#pass').type(data.password, { log: false });
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Password recovery', function () {
        if (Cypress.env('RUN_PASSWORD_RECOVERY') !== true) this.skip();
        cy.visit('https://login.qa.studio');
        cy.get('#forgotEmailButton').click();
        cy.get('#forgotForm > .header').contains('Восстановите пароль');
        cy.get('#exitRestoreButton > .exitIcon').should('be.visible');
        cy.get('#mailForgot').type(data.login, { log: false });
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Valid email and invalid password', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type(data.login, { log: false });
        cy.get('#pass').type('deliberately-invalid-test-password');
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Invalid email and valid password', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('nonexistent@example.invalid');
        cy.get('#pass').type(data.password, { log: false });
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Такого логина или пароля нет');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })

    it('Email without @ and valid password', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type('invalid-email.example');
        cy.get('#pass').type(data.password, { log: false });
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })
    it('Mixed-case email and valid password', function () {
        cy.visit('https://login.qa.studio');
        cy.get('#mail').type(data.login.toLowerCase().replace(/[a-z]/, letter => letter.toUpperCase()), { log: false });
        cy.get('#pass').type(data.password, { log: false });
        cy.get('#loginButton').click();
        cy.get('#messageHeader').contains('Авторизация прошла успешно');
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
    })   
})
