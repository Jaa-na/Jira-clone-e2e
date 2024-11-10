import { faker } from "@faker-js/faker";
const randomSingleWord = faker.lorem.word();
const randomSeveralWords = faker.lorem.words();

describe("Issue create", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board?modal-issue-create=true");
      });
  });

  it("Should create an issue and validate it successfully", () => {
    cy.get('[data-testid="modal:issue-create"]')
      .wait(5000)
      .within(() => {
        cy.get(".ql-editor").type("TEST_DESCRIPTION");
        cy.get(".ql-editor").should("have.text", "TEST_DESCRIPTION");
        cy.get('input[name="title"]').type("TEST_TITLE");
        cy.get('input[name="title"]').should("have.value", "TEST_TITLE");
        cy.get('[data-testid="select:type"]').click();
        cy.get('[data-testid="select-option:Story"]')
          .wait(1000)
          .trigger("mouseover")
          .trigger("click");
        cy.get('[data-testid="icon:story"]').should("be.visible");
        cy.get('[data-testid="select:reporterId"]').click();
        cy.get('[data-testid="select-option:Baby Yoda"]').click();
        cy.get('[data-testid="form-field:userIds"]').click();
        cy.get('[data-testid="select-option:Pickle Rick"]').click();
        cy.get('button[type="submit"]').click();
      });
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("TEST_TITLE")
          .siblings()
          .within(() => {
            cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
            cy.get('[data-testid="icon:story"]').should("be.visible");
          });
      });
    cy.get('[data-testid="board-list:backlog"]')
      .contains("TEST_TITLE")
      .within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
        cy.get('[data-testid="icon:story"]').should("be.visible");
      });
  });

  it("Should validate title is required field if missing", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get('button[type="submit"]').click();
      cy.get('[data-testid="form-field:title"]').should(
        "contain",
        "This field is required"
      );
    });
  });

  it("Test Case 1: Should create a custom issue and validate it succesfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type("My bug description");
      cy.get(".ql-editor").should("have.text", "My bug description");
      cy.get('input[name="title"]').type("Bug");
      cy.get('input[name="title"]').should("have.value", "Bug");
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').wait(1000).click();
      cy.get('[data-testid="select:type"]').within(() => {
        cy.get('[data-testid="icon:bug"]').should("be.visible");
      });
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      cy.get('[data-testid="select:reporterId"]').within(() => {
        cy.get('[data-testid="avatar:Pickle Rick"]').should("be.visible");
      });
      cy.get('[data-testid="form-field:userIds"]').click();
      cy.get('[data-testid="select-option:Lord Gaben"]').click();
      cy.get('[data-testid="form-field:userIds"]').within(() => {
        cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
      });
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();
      cy.get('[data-testid="select:priority"]').within(() => {
        cy.get('[data-testid="icon:arrow-up"]').should("be.visible");
      });
      cy.get('button[type="submit"]').click();
    });
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains("Bug")
          .siblings()
          .within(() => {
            cy.get('[data-testid="icon:bug"]').should("be.visible");
            cy.get('[data-testid="avatar:Lord Gaben"]').should("be.visible");
            cy.get('[data-testid="icon:arrow-up"]').should("be.visible");
          });
      });
  });

  it("Test Case 2: Should create a random issue and validate it succesfully", () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {
      cy.get(".ql-editor").type(randomSeveralWords);
      cy.get(".ql-editor").should("have.text", randomSeveralWords);
      cy.get('input[name="title"]').type(randomSingleWord);
      cy.get('input[name="title"]').should("have.value", randomSingleWord);
      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="icon:close"]').click();
      cy.get('[data-testid="select-option:Task"]').wait(1000).click();
      cy.get('[data-testid="select:type"]').within(() => {
        cy.get('[data-testid="icon:task"]').should("be.visible");
      });
      cy.get('[data-testid="select:reporterId"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      cy.get('[data-testid="select:reporterId"]').within(() => {
        cy.get('[data-testid="avatar:Baby Yoda"]').should("be.visible");
      });
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();
      cy.get('[data-testid="select:priority"]').within(() => {
        cy.get('[data-testid="icon:arrow-down"]').should("be.visible");
      });
      cy.get('button[type="submit"]').click();
    });
    cy.get('[data-testid="modal:issue-create"]').should("not.exist");
    cy.contains("Issue has been successfully created.").should("be.visible");
    cy.reload();
    cy.contains("Issue has been successfully created.").should("not.exist");
    cy.get('[data-testid="board-list:backlog"]')
      .should("be.visible")
      .and("have.length", "1")
      .within(() => {
        cy.get('[data-testid="list-issue"]')
          .should("have.length", "5")
          .first()
          .find("p")
          .contains(randomSingleWord)
          .siblings()
          .within(() => {
            cy.get('[data-testid="icon:task"]').should("be.visible");
            cy.get('[data-testid="icon:arrow-down"]').should("be.visible");
          });
      });
  });
});
