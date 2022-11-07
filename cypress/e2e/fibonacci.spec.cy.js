describe("страница Последовательность Фибоначчи", function () {
  before(function () {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("состояние кнопки", function () {
    cy.get("input").should("have.value", "");
    cy.contains("Рассчитать").as("button");
    cy.get("@button").should("be.disabled");
    cy.get("input").type("5");
    cy.get("@button").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("@button").should("be.disabled");
  });


  it("числа генерируются корректно", function () {
    cy.get("input").should("have.value", "");
    cy.contains("Рассчитать").as("button");
    cy.get("@button").should("be.disabled");
    cy.get("input").type("5");
    cy.get("@button").click();
   
    cy.wait(5000)
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0)).to.contain("1");
      expect($div.eq(1)).to.contain("1");
      expect($div.eq(2)).to.contain("2");
      expect($div.eq(3)).to.contain("3");
      expect($div.eq(4)).to.contain("5");
      expect($div.eq(5)).to.contain("8");
    });
  });
});
