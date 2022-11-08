describe("страница Очередь", function () {
  before(function () {
    cy.visit("http://localhost:3000/list");
  });

  it("состояние кнопок", function () {
    cy.get("input:first").as("inputText");
    cy.contains("Добавить в head").as("buttonAddHead");
    cy.contains("Добавить в tail").as("buttonAddTail");
    cy.contains("Добавить по индексу").as("buttonAddByIndex");
    cy.contains("Удалить по индексу").as("buttonDeleteByIndex");
    cy.get("input:last").as("inputIndex");

    cy.get("@inputText").should("have.value", "");
   
    cy.get("@buttonAddHead").should("be.disabled");
    cy.get("@buttonAddTail").should("be.disabled");
    cy.get("@buttonAddByIndex").should("be.disabled");

    cy.get("@inputText").type("5");

    cy.get("@buttonAddHead").should("not.be.disabled");
    cy.get("@buttonAddTail").should("not.be.disabled");

    cy.get("@inputText").clear();

    cy.get("@buttonAddHead").should("be.disabled");
    cy.get("@buttonAddTail").should("be.disabled");
    cy.get("@buttonAddByIndex").should("be.disabled");
   
    cy.get("@buttonDeleteByIndex").should("be.disabled");
    
    cy.get("@inputIndex").type("1");
    cy.get("@buttonDeleteByIndex").should("not.be.disabled");
    cy.get("@inputIndex").clear();
  });
});
