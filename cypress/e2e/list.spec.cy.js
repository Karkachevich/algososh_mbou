import {
  DIV_CLASS_CIRCLE,
  DIV_CLASS_CIRCLE_HEAD,
  DIV_CLASS_CIRCLE_TAIL,
  DIV_CLASS_CIRCLE_SMALL,
} from "../../src/constants/div-class.ts";

describe("страница Очередь", function () {
  before(function () {
    cy.visit("/list");
  });

  it("состояние кнопок", function () {
    cy.get("input:first").as("inputText");
    cy.get("input:last").as("inputIndex");
    cy.contains("Добавить в head").as("buttonAddHead");
    cy.contains("Добавить в tail").as("buttonAddTail");
    cy.contains("Добавить по индексу").as("buttonAddByIndex");
    cy.contains("Удалить по индексу").as("buttonDeleteByIndex");

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

  it("корректность отрисовки дефолтного списка", function () {
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 4)
      .each(($div) => {
        expect($div[0].textContent).to.not.equal("");
      });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });

    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });

  it("корректность добавления элемента в head", function () {
    cy.get("input:first").as("inputText");
    cy.contains("Добавить в head").as("buttonAddHead");
    cy.get("@inputText").type("1");
    cy.get("@buttonAddHead").click();

    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.text("1")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.have.text("1")
          .attr("class")
          .to.match(/circle_default__/);
      });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });

    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(4)).to.have.text("tail");
    });
  });

  it("корректность удаления элемента из head", function () {
    cy.contains("Удалить из head").as("button");
    cy.get("@button").click();
    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(0))
        .to.have.text("")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 4);
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });
    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });

  it("корректность добавления элемента в tail", function () {
    cy.get("input:first").as("inputText");
    cy.contains("Добавить в tail").as("buttonAddTail");
    cy.get("@inputText").type("5");
    cy.get("@buttonAddTail").click();

    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("5")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(4))
          .to.have.text("5")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(4))
          .to.have.text("5")
          .attr("class")
          .to.match(/circle_default__/);
      });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });

    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(4)).to.have.text("tail");
    });
  });

  it("корректность удаления элемента из tail", function () {
    cy.contains("Удалить из tail").as("button");
    cy.get("@button").click();
    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("5")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get(DIV_CLASS_CIRCLE).should(($div) => {
      expect($div.eq(4))
        .to.have.text("")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE).should("have.length", 4);
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });
    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });

  it("корректность добавления элемента по индексу", function () {
    cy.get("input:first").as("inputText");
    cy.get("input:last").as("inputIndex");
    cy.contains("Добавить по индексу").as("buttonAddIndex");
    cy.get("@inputText").type("2");
    cy.get("@inputIndex").type("2");
    cy.get("@buttonAddIndex").click();

    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("2")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("2")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(1000);
    cy.get(DIV_CLASS_CIRCLE_SMALL).should(($div) => {
      expect($div.eq(0))
        .to.have.text("2")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(2))
          .to.have.text("2")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(2))
          .to.have.text("2")
          .attr("class")
          .to.match(/circle_default__/);
      });
    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });

    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(4)).to.have.text("tail");
    });
  });

  it("корректность удаления элемента по индексу", function () {
    cy.get("input:last").as("inputIndex");
    cy.contains("Удалить по индексу").as("button");

    cy.get("@inputIndex").type("2");
    cy.get("@button").click();

    cy.get(DIV_CLASS_CIRCLE)
      .eq(0)
      .should(($div) => {
        expect($div)
          .attr("class")
          .to.match(/circle_changing__/);
      });

    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .eq(1)
      .should(($div) => {
        expect($div)
          .attr("class")
          .to.match(/circle_changing__/);
      });
    cy.wait(500);
    cy.get(DIV_CLASS_CIRCLE)
      .eq(2)
      .should(($div) => {
        expect($div)
          .attr("class")
          .to.match(/circle_changing__/);
      });
    cy.wait(500);

    cy.get(DIV_CLASS_CIRCLE_SMALL)
      .eq(0)
      .should(($div) => {
        expect($div)
          .to.have.text("2")
          .attr("class")
          .to.match(/circle_changing__/);
      });

    cy.get(DIV_CLASS_CIRCLE_HEAD).should(($div) => {
      expect($div.eq(0)).to.have.text("head");
    });

    cy.get(DIV_CLASS_CIRCLE_TAIL).should(($div) => {
      expect($div.eq(3)).to.have.text("tail");
    });
  });
});
