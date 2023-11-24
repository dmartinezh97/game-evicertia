// https://docs.cypress.io/api/introduction/api.html

describe('Login', () => {
  it('Abre el dialog del login e intenta iniciar sesión', () => {
    cy.visit('/')
    cy.get('[data-test="btnMenu"]').click()
    cy.get('[data-test="btnLogin"]').click()
    cy.get('[data-test="inputEmail"]').clear().type("dmartinezh97@gmail.com")
    cy.get('[data-test="inputPassword"]').clear().type("123456")
    cy.get('[data-test="btnIniciarSesion"]').click()
  })
})
