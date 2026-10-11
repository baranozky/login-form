
describe('Login Form E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should allow a user to login', () => {
    cy.get('[data-cy="form-email"]').type('emre@wit.com.tr');
    cy.get('[data-cy="form-password"]').type('12345678Aa');
    cy.get('[data-cy="form-terms"]').check();

    cy.get('[data-cy="form-submit"]')
      .should('not.be.disabled')
      .click();

    cy.url().should('include', '/success');

    cy.get('[data-cy="success-page"]')
      .should('be.visible');

    cy.contains('Login Successful!')
      .should('be.visible');
  });

  it('should show validation errors and disable submit', () => {
    // 1. Hatalı email
    cy.get('[data-cy="form-email"]').type('wrongemail');

    cy.get('[data-cy="error-message"]')
      .should('have.length', 1);

    cy.contains('Please enter a valid email address')
      .should('be.visible');

    cy.get('[data-cy="form-submit"]')
      .should('be.disabled');

    // 2. Hatalı email ve hatalı password
    cy.get('[data-cy="form-password"]').type('123');

    cy.get('[data-cy="error-message"]')
      .should('have.length', 2);

    cy.contains(
      'Password must contain at least 8 characters, an uppercase letter, a lowercase letter and a number'
    ).should('be.visible');

    cy.get('[data-cy="form-submit"]')
      .should('be.disabled');

    // 3. Doğru email ve password, fakat şartlar kabul edilmedi
    cy.get('[data-cy="form-email"]')
      .clear()
      .type('emre@wit.com.tr');

    cy.get('[data-cy="form-password"]')
      .clear()
      .type('12345678Aa');

    cy.get('[data-cy="form-terms"]')
      .should('not.be.checked');

    cy.get('[data-cy="form-submit"]')
      .should('be.disabled');
  });
});
