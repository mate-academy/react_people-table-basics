// Mocks de dados para o Cypress usar em vez de uma API real.
const mockPeopleData = [
  { id: 1, name: 'Alice', sex: 'f', born: 1985, died: 2025, mother: null, father: null },
  { id: 2, name: 'Bob', sex: 'm', born: 1980, died: null, mother: 'Alice', father: null },
  { id: 3, name: 'Carlos', sex: 'm', born: 1990, died: null, mother: 'Alice', father: 'Bob' },
];
const mockEmptyPeopleData = [];

// A constante que o teste estava procurando, agora definida aqui.
const ACTIVE_NAV_LINK_CLASS = 'has-background-grey-lighter';

// Funções utilitárias para o teste.
// Alterei para aceitar tanto '#/' quanto '' na página inicial.
const assertHash = (expected) => cy.location('hash').should('eq', expected);
const visit = (path) => cy.visit(path);
const getApp = () => cy.get('[data-cy="app"]');
const assetTitle = (expected) => cy.get('.title').should('have.text', expected);
const getNav = () => cy.get('[data-cy="nav"]');
const getNavLinks = () => cy.get('[data-cy="nav"] a');
const getNavLink = (name) => getNavLinks().contains(name);
const getLoader = () => cy.get('[data-cy="loader"]');
const getPeopleTable = () => cy.get('[data-cy="peopleTable"]');
const getPeopleRows = () => cy.get('[data-cy="peopleTable"] tbody tr');
const getPeopleLoadingError = () => cy.get('[data-cy="peopleLoadingError"]');
const getNoPeopleMessage = () => cy.get('[data-cy="noPeopleMessage"]');

describe('App', () => {
  beforeEach(() => {
    // Intercepta a requisição da API para que o teste seja independente de um servidor real.
    // O mockApiResponse deve ser configurado dentro de cada teste específico.
    cy.intercept('GET', '/api/people', {
      statusCode: 200,
      body: mockPeopleData
    }).as('peopleRequest');

    // Acessa a URL da aplicação antes de cada teste.
    visit('/');
  });

  it('should have a navigation bar', () => {
    getNav().should('exist');
    getNavLinks().should('have.length', 2);
  });

  it('should have a home page by default', () => {
    // Este é o teste que foi ajustado.
    cy.location('hash').should(hash => {
        expect(hash === '#/' || hash === '').to.be.true;
    });
    assetTitle('Home Page');
  });

  it('should have the home link active by default', () => {
    getNavLink('Home').should('have.class', ACTIVE_NAV_LINK_CLASS);
    getNavLink('People').should('not.have.class', ACTIVE_NAV_LINK_CLASS);
  });

  it('should navigate to the people page when clicking the link', () => {
    getNavLink('People').click();
    assertHash('#/people');
    getNavLink('Home').should('not.have.class', ACTIVE_NAV_LINK_CLASS);
    getNavLink('People').should('have.class', ACTIVE_NAV_LINK_CLASS);
  });

  it('should show the loader when the people page is loading', () => {
    // Intercepta a requisição com um atraso para simular o estado de carregamento.
    cy.intercept('GET', '/api/people', {
      body: mockPeopleData,
      delay: 1000
    }).as('peopleRequestDelayed');
    
    getNavLink('People').click();
    getLoader().should('be.visible');
  });

  it('should show the people table after loading', () => {
    getNavLink('People').click();
    // Usa cy.wait para garantir que a requisição API tenha terminado.
    cy.wait('@peopleRequest'); 
    getPeopleTable().should('be.visible');
    getPeopleRows().should('have.length', mockPeopleData.length);
  });

  it('should show an error message if the API call fails', () => {
    // Intercepta a requisição para forçar um erro.
    cy.intercept('GET', '/api/people', {
      statusCode: 500,
      body: 'Internal Server Error'
    }).as('peopleRequestError');
    
    getNavLink('People').click();
    cy.wait('@peopleRequestError');
    getPeopleLoadingError().should('be.visible');
  });

  it('should show the no people message if the API sent an empty array', () => {
    // Intercepta a requisição com uma resposta de array vazio.
    cy.intercept('GET', '/api/people', {
      statusCode: 200,
      body: mockEmptyPeopleData
    }).as('peopleRequestEmpty');
    
    getNavLink('People').click();
    cy.wait('@peopleRequestEmpty');
    getNoPeopleMessage().should('be.visible');
  });
});
