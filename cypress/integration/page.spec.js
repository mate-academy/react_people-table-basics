describe('Page', () => {
  beforeEach(() => {
    cy.intercept('**/person.ts.json', { fixture: 'person.ts' });
    cy.visit('/');
  });

  const head = {
    getCell(num) {
      return cy.get('th')
        .eq(`${num}`);
    }
  };

  const person = {
    getCell(num) {
      return cy.get('.person')
        .eq(`${num}`);
    }
  };

  it('should redirect to the "Home" page', () => {
    cy.visit('/home');
    cy.get('h1')
      .should('contain', 'Home Page');
      cy.url()
        .should('not.contain', '/home');
  });

  it('should open the "Home" page', () => {
    cy.get('h1')
      .should('contain', 'Home Page');
  });

  it('should open the table, which contains Name, Sex, Born, Died, Mother, Father', () => {
    cy.visit('/person.ts');
    head.getCell(0)
      .should('contain', 'Name');
    head.getCell(1)
      .should('contain', 'Sex');
    head.getCell(2)
      .should('contain', 'Born');
    head.getCell(3)
      .should('contain', 'Died');
    head.getCell(4)
      .should('contain', 'Mother');
    head.getCell(5)
      .should('contain', 'Father');
});

  it ('should open the table with personal data', () => {
    cy.visit('/person.ts');
    person.getCell(0)
      .should('contain', 'Carolus Haverbeke')
      .and('contain', 'm')
      .and('contain', '1832')
      .and('contain', '1905')
      .and('contain', 'Maria van Brussel')
      .and('contain', 'Carel Haverbeke');
    person.getCell(1)
      .should('contain', 'Joanna Claes')
      .and('contain', 'f')
      .and('contain', '1876')
      .and('contain', '1956')
      .and('contain', 'Petrus de Milliano')
      .and('contain', 'Sophia van Damme');
    person.getCell(2)
      .should('contain', 'Maria de Rycke')
      .and('contain', 'f')
      .and('contain', '1683')
      .and('contain', '1724')
      .and('contain', 'Frederik de Rycke')
      .and('contain', 'Laurentia van Vlaenderen');
  });

  it('should redirect from other URLs to the "404" page', () => {
    cy.visit('/404');
    cy.get('h1')
      .should('contain', 'Page not found');
    cy.visit('/error');
    cy.get('h1')
      .should('contain', 'Page not found');
  });
});
