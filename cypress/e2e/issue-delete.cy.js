const getIssueDetailsModal = () =>
  cy.get('[data-testid="modal:issue-details"]');

describe("Issue deleting", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.get('[data-testid="list-issue"]')
          .first()
          .invoke("attr", "data-rbd-draggable-id")
          .as("issueId");
        cy.get('[data-testid="list-issue"]').first().click();
        cy.get('[data-testid="modal:issue-details"]').should("be.visible");
      });
  });

  it("Test Case 1: Should delete the issue", function () {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]')
        .trigger("mouseover")
        .trigger("click");
    });
    cy.get('[data-testid="modal:confirm"]')
      .should("be.visible")
      .should("contain.text", "Are you sure you want to delete this issue?")
      .should("contain.text", "Once you delete, it's gone for good.");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("button", "Delete issue")
        .trigger("mouseover")
        .trigger("click");
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("not.exist");
    cy.reload();
    cy.get(`[data-rbd-draggable-id="${this.issueId}"]`).should("not.exist");
  });

  it.only("Test Case 2: Should cancel the issue deletion", function () {
    getIssueDetailsModal().within(() => {
      cy.get('[data-testid="icon:trash"]')
        .trigger("mouseover")
        .trigger("click");
    });
    cy.get('[data-testid="modal:confirm"]')
      .should("be.visible")
      .should("contain.text", "Are you sure you want to delete this issue?")
      .should("contain.text", "Once you delete, it's gone for good.");
    cy.get('[data-testid="modal:confirm"]').within(() => {
      cy.contains("button", "Cancel").trigger("mouseover").trigger("click");
    });
    cy.get('[data-testid="modal:confirm"]').should("not.exist");
    cy.get('[data-testid="modal:issue-details"]').should("be.visible");
    getIssueDetailsModal().within(() => {
      cy.get('button [data-testid="icon:close"]').click();
    });
    cy.get('[data-testid="modal:issue-details"]').should("not.exist");
    cy.reload();
    cy.get(`[data-rbd-draggable-id="${this.issueId}"]`).should("exist");
  });
});
