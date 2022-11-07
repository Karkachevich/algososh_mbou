describe("страница Строка", function () {
  before(function () {
    cy.visit("http://localhost:3000/recursion");
  });

  it("состояние кнопки", function () {
    cy.get("input").should("have.value", "");
    cy.contains("Развернуть").as("button");
    cy.get("@button").should("be.disabled");
    cy.get("input").type("q");
    cy.get("@button").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("ввод данных", function () {
    cy.contains("Развернуть").as("button");
    cy.get("input").type("word");
    cy.get("@button").click();
  });
  it("строка разворачивается корректно на первой секунде", function () {
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.contain("w")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(1))
        .to.contain("o")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(2))
        .to.contain("r")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(3))
        .to.contain("d")
        .attr("class")
        .to.match(/circle_changing__/);
    });
  });

  it("строка разворачивается корректно на второй секунде", function () {
    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.contain("d")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.contain("o")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(2))
        .to.contain("r")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(3))
        .to.contain("w")
        .attr("class")
        .to.match(/circle_modified__/);
    });
  });

  it("строка разворачивается корректно на третьей секунде", function () {
    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.contain("d")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.contain("o")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(2))
        .to.contain("r")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(3))
        .to.contain("w")
        .attr("class")
        .to.match(/circle_modified__/);
    });
  });

  it("строка разворачивается корректно конечный результат", function () {
    cy.wait(1000);
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.contain("d")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.contain("r")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(2))
        .to.contain("o")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(3))
        .to.contain("w")
        .attr("class")
        .to.match(/circle_modified__/);
    });    
  });

});
