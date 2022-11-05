describe("открыть сайт", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("главная страница", function () {
    cy.contains("МБОУ АЛГОСОШ");
    cy.location("pathname").should("eq", "/");
  });

  it("открыть страницу Строка", function () {
    cy.get('a[href*="/recursion"]').click();
    cy.contains('Строка');
    cy.location("pathname").should("eq", "/recursion");
    cy.get('button').contains('К оглавлению').click();
    cy.contains("МБОУ АЛГОСОШ");
    cy.location("pathname").should("eq", "/");
  });
});
