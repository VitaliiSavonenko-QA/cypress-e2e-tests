describe('Avatar purchase (training environment)', function () {

   it('Avatar purchase end-to-end', function () {
        if (Cypress.env('RUN_TRAINING_PURCHASE') !== true) this.skip();
        const data = {
            login: Cypress.env('POKEMON_LOGIN'),
            password: Cypress.env('POKEMON_PASSWORD'),
            card: Cypress.env('TRAINING_CARD'),
            srok: Cypress.env('TRAINING_EXPIRY'),
            cod: Cypress.env('TRAINING_CVV'),
            name: Cypress.env('TRAINING_CARDHOLDER'),
            SMS: Cypress.env('TRAINING_SMS'),
        };
        if (Object.values(data).some(value => typeof value !== 'string' || !value)) {
            throw new Error('Set all training account and simulated payment variables before running.');
        }
        cy.visit('https://pokemonbattle.ru/');
        cy.get('#k_email').type(data.login, { log: false });
        cy.get('#k_password').type(data.password, { log: false });
        cy.get('.MuiButton-root').click();

        cy.get('.style_1_heading_38_400_pokemon_classic').contains('Покемоны');
        cy.get('.header_card_trainer').click();

        cy.get('.single_page_body_content_title_icon_cup > .single_page_body_content_title_icon_img').should('be.visible');
        cy.get('[data-qa="shop"]').click();

        cy.get('.pokemon__title').contains('Магазин');
        cy.get(':nth-child(6) > .shop__button').click();

        cy.get('.payment_form_card_form').should('be.visible');
        cy.get('.payment_header_content_title_h2').contains('Пикачунькофф');
        cy.get('.payment_form_card_form > :nth-child(2) > .style_1_base_input').type(data.card, { log: false });
        cy.get(':nth-child(1) > .style_1_base_input').type(data.srok, { log: false });
        cy.get('.payment_form_card_form_inputs > :nth-child(2) > .style_1_base_input').type(data.cod, { log: false });
        cy.get('.payment_form_card_form_input_last > .style_1_base_input').type(data.name, { log: false });
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();

        cy.get('.payment_form_3ds_title').contains('Подтверждение покупки');
        cy.get('.style_1_base_input').type(data.SMS, { log: false });
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click();

        cy.get('.payment_status_top_title').contains('Покупка прошла успешно');
        cy.get('.success__image').should('be.visible');
        cy.get('.style_1_base_link_blue').click();
    })
})
