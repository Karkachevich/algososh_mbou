describe("открыть сайт", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("главная страница", function () {
    cy.contains("МБОУ АЛГОСОШ");
    cy.location("pathname").should("eq", "/");
  });

  const pages = [
    { contains: "Строка", pathname: "recursion" },
    { contains: "Последовательность Фибоначчи", pathname: "fibonacci" },
    { contains: "Сортировка массива", pathname: "sorting" },
    { contains: "Стек", pathname: "stack" },
    { contains: "Очередь", pathname: "queue" },
    { contains: "Связный список", pathname: "list" },
  ];

  pages.forEach((page) => {
    it(`открыть страницу ${page.contains}`, function () {
      cy.get(`a[href*="/${page.pathname}"]`).click();
      cy.contains(page.contains);
      cy.location("pathname").should("eq", `/${page.pathname}`);
      cy.get("button").contains("К оглавлению").click();
      cy.contains("МБОУ АЛГОСОШ");
      cy.location("pathname").should("eq", "/");
    });
  });
});
