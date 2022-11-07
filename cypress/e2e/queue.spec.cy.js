describe("страница Очередь", function () {
  before(function () {
    cy.visit("http://localhost:3000/queue");
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

  /**
   * Проверьте, правильность добавления элемента в очередь. 
   * Необходимо убедиться, что цвета элементов меняются и каждый шаг 
   * анимации отрабатывает корректно. Не забудьте проверить, 
   * что курсоры head и tail отрисовываются корректно.
   *
   */

  it("правильность добавления элемента", function(){
    
  })
});
