describe("страница Строка", function () {
    before(function () {
      cy.visit("http://localhost:3000/recursion");
    });

    it('состояние кнопки', function() {
        cy.get("input").should("have.value", "");
        cy.contains("Развернуть").as("button");
        cy.get("@button").should("be.disabled");
        cy.get("input").type("q");
        cy.get("@button").should("not.be.disabled");
        cy.get("input").clear();
        cy.get("@button").should("be.disabled");
    })

});