describe("Todo MVC", () => {
  beforeEach(() => {
    return resetDatabase();
  });

  after(() => {
    return resetDatabase();
  });

  it("should hide #main and #footer when there are no todos", () => {
    cy.visit("http://localhost:3000");
    cy.get("#main").should("not.exist");
    cy.get("#footer").should("not.exist");
  });

  it("should allow the user to add items", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Create an item");
    cy.get(".new-todo").type("{enter}");
    cy.get(".todo-list > li").should("have.length", 1);
  });

  it("should clear the text input when the user adds an item", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Clear input text after creating item");
    cy.get(".new-todo").type("{enter}");
    cy.get(".new-todo").should("have.value", "");
  });

  it("should allow users to complete all items", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Create item");
    cy.get(".new-todo").type("{enter}");
    cy.get(".new-todo").type("Complete all items");
    cy.get(".new-todo").type("{enter}");
    cy.get(".toggle-all").click();
    cy.get(".todo-list > li.completed").should("have.length", 2);
  });

  it("should allow users to remove complete from all items", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Create an item");
    cy.get(".new-todo").type("{enter}");
    cy.get(".new-todo").type("Mark items as not completed");
    cy.get(".new-todo").type("{enter}");
    cy.get(".toggle-all").click();
    cy.get(".toggle-all").click();
    cy.get(".todo-list > li.completed").should("have.length", 0);
  });

  it("should allow users to complete an item", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Complete an item");
    cy.get(".new-todo").type("{enter}");
    cy.get(".todo-list > li input.toggle").click();
    cy.get(".todo-list > li.completed").should("have.length", 1);
  });

  it("should allow users to remove an item", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Remove an item");
    cy.get(".new-todo").type("{enter}");
    cy
      .get(".todo-list > li button.destroy")
      .invoke("show")
      .click();
    cy.get(".todo-list > li").should("have.length", 0);
  });

  it("should only show active todos on /active", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Create an item");
    cy.get(".new-todo").type("{enter}");
    cy.get(".todo-list > li input.toggle").click();
    cy.get(".new-todo").type("Complete all items");
    cy.get(".new-todo").type("{enter}");
    cy.get('footer a[href="#/active"]').click();
    cy.get(".todo-list > li").should("have.length", 1);
  });

  it("should allow user to edit items", () => {
    cy.visit("http://localhost:3000");
    cy.get(".new-todo").type("Create items");
    cy.get(".new-todo").type("{enter}");
    cy.get(".todo-list > li label").dblclick();
    cy.get(".todo-list input.edit").type(", and also edit them");
    cy.get(".todo-list input.edit").type("{enter}");
    cy
      .get(".todo-list > li label")
      .should("have.text", "Create items, and also edit them");
  });
});

function resetDatabase() {
  return cy.request(
    "DELETE",
    `localhost:${Cypress.env("API_PORT") || 4000}/todos`
  );
}
