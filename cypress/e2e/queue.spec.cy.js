import {
  DIV_CLASS_CIRCLE,
  DIV_CLASS_CIRCLE_HEAD,
  DIV_CLASS_CIRCLE_TAIL,
} from "../../src/constants/div-class.ts";

describe("страница Очередь", function () {
  before(function () {
    cy.visit("/queue");
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
    cy.get(DIV_CLASS_CIRCLE_HEAD).should("have.text", "head");
    cy.get(DIV_CLASS_CIRCLE_TAIL).should("have.text", "tail");
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
      expect($div.eq(0)).to.have.text("head");
      expect($div.eq(1)).to.have.text("");
    });

    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(0)).to.have.text("");
      expect($div.eq(1)).to.have.text("tail");
    });
  });

  it("правильность удаления", function () {
    cy.contains("Удалить").as("delete");
    cy.get("@delete").click();
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("");
      expect($div.eq(1)).to.have.text("head");
    });
    cy.get("@delete").click();
  });

  it("поведение кнопки «Очистить»", function () {
    cy.contains("Добавить").as("button");
    cy.get("input").type("1");
    cy.get("@button").click();
    cy.get("input").type("2");
    cy.get("@button").click();
    cy.get("input").type("3");
    cy.get("@button").click();
    cy.contains("Очистить").as("remove");
    cy.get("@remove").click();
    cy.get(DIV_CLASS_CIRCLE).each(($div) => {
      expect($div).to.have.text("");
    });
  });
});
