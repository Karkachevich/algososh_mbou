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

  it("корректность отрисовки дефолтного списка", function () {
    cy.get('div[class^="circle_circle"')
      .should("have.length", 4)
      .each(($div) => {
        expect($div[0].textContent).to.not.equal("");
      });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.contain("head");
    });

    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(3)).to.contain("tail");
    });
  });

  it("корректность добавления элемента в head", function () {
    cy.get("input:first").as("inputText");
    cy.contains("Добавить в head").as("buttonAddHead");
    cy.get("@inputText").type("1");
    cy.get("@buttonAddHead").click();

    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.contain("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.wait(500);
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.contain("1")
          .attr("class")
          .to.match(/circle_modified__/);
      });
    cy.wait(500);
    cy.get('div[class^="circle_circle"')
      .should("have.length", 5)
      .should(($div) => {
        expect($div.eq(0))
          .to.contain("1")
          .attr("class")
          .to.match(/circle_default__/);
      });
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.contain("head");
    });

    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(4)).to.contain("tail");
    });
  });

  it("корректность удаления элемента из head", function () {
    cy.contains("Удалить из head").as("button");
    cy.get("@button").click();
    cy.get('div[class*="circle_small"').should(($div) => {
      expect($div.eq(0))
        .to.contain("1")
        .attr("class")
        .to.match(/circle_changing__/);
    });
    cy.get('div[class^="circle_circle"').should(($div) => {
      expect($div.eq(0))
        .to.contain("")
        .attr("class")
        .to.match(/circle_default__/);
    });
    cy.wait(500);
    cy.get('div[class^="circle_circle"').should("have.length", 4);
    cy.get('div[class*="circle_head"').should(($div) => {
      expect($div.eq(0)).to.contain("head");
    });
    cy.get('div[class*="circle_tail"').should(($div) => {
      expect($div.eq(3)).to.contain("tail");
    });
  });
});

/**
добавления элемента в tail.
добавления элемента по индексу.
удаления элемента из tail.
удаления элемента по индексу.
 */