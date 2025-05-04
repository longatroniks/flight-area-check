/// <reference types="cypress" />

describe('Home Page Integration', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads the homepage and shows the title and subtitle', () => {
    cy.contains('h1', 'Flight Area Checker').should('be.visible');
  });

  it('displays the location dropdown and fetch button', () => {
    cy.get('input[placeholder="Search and select..."]').should('exist');
    cy.contains('button', 'Fetch data').should('exist');
  });

  it('allows selecting a location and fetching population data', () => {
    cy.contains('button', 'Population').click();

    cy.get('input[placeholder="Search and select..."]').type('Silvaplana');
    cy.contains('li', 'Silvaplana').click();

    cy.contains('button', 'Fetch data').click();

    cy.contains('h2', 'Population').should('be.visible');
  });

  it('allows selecting a location and fetching drone restriction data', () => {
    cy.contains('button', 'Drone').click();

    cy.get('input[placeholder="Search and select..."]').type('Meyrin');
    cy.contains('li', 'Meyrin').click();

    cy.contains('button', 'Fetch data').click();

    cy.contains('h2', 'Drone Restrictions').should('be.visible');
  });

  it('shows an error message when no data is returned', () => {
    cy.contains('button', 'Drone').click();
    cy.get('input[placeholder="Search and select..."]').type('Unknownville');

    cy.contains('No results found').should('be.visible');
  });
});
