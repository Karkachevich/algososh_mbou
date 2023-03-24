import { DIV_CLASS_CIRCLE } from "../../src/constants/div-class.ts";
describe("страница Строка", function () {
  before(function () {
    cy.visit("/recursion");
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
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("w")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(1))
        .to.have.text("o")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(2))
        .to.have.text("r")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(3))
        .to.have.text("d")
        .attr("class")
        .to.match(/circle_changing__/);
    });
  });

  it("строка разворачивается корректно на второй секунде", function () {
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("d")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.have.text("o")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(2))
        .to.have.text("r")
        .attr("class")
        .to.match(/circle_default__/);
      expect($div.eq(3))
        .to.have.text("w")
        .attr("class")
        .to.match(/circle_modified__/);
    });
  });

  it("строка разворачивается корректно на третьей секунде", function () {
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("d")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.have.text("o")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(2))
        .to.have.text("r")
        .attr("class")
        .to.match(/circle_changing__/);
      expect($div.eq(3))
        .to.have.text("w")
        .attr("class")
        .to.match(/circle_modified__/);
    });
  });

  it("строка разворачивается корректно конечный результат", function () {
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("d")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(1))
        .to.have.text("r")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(2))
        .to.have.text("o")
        .attr("class")
        .to.match(/circle_modified__/);
      expect($div.eq(3))
        .to.have.text("w")
        .attr("class")
        .to.match(/circle_modified__/);
    });
  });
});
