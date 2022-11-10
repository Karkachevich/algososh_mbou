import {
  DIV_CLASS_CIRCLE,
  DIV_CLASS_CIRCLE_HEAD,
} from "../../src/constants/div-class.ts";

describe("страница Стек", function () {
  before(function () {
    cy.visit("/stack");
  });

  it("состояние кнопки", function () {
    cy.get("input").should("have.value", "");
    cy.contains("Добавить").as("button");
    cy.get("@button").should("be.disabled");
    cy.get("input").type("5");
    cy.get("@button").should("not.be.disabled");
    cy.get("input").clear();
    cy.get("@button").should("be.disabled");
  });

  it("правильность добавления элемента", function () {
    cy.contains("Добавить").as("button");
    cy.get("input").type("1");
    cy.get("@button").click();
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should("have.text", "top");

    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.get("input").type("2");
    cy.get("@button").click();

    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(1))
        .to.have.text("2")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(500);

    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(1))
        .to.have.text("2")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("");
      expect($div.eq(1)).to.have.text("top");
    });
  });

  it("Правильность удаления элемента", function () {
    cy.contains("Удалить").as("button");
    cy.get("@button").click();
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 2);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(1))
        .to.have.text("2")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 1);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.get("@button").click();
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 0);
  });

  it("поведение кнопки «Очистить»", function () {
    cy.contains("Добавить").as("button");
    cy.get("input").type("1");
    cy.get("@button").click();
    cy.get("input").type("2");
    cy.get("@button").click();
    cy.get("input").type("3");
    cy.get("@button").click();
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 3);
    cy.contains("Очистить").as("remove");
    cy.get("@remove").click();
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 0);
  });
});
