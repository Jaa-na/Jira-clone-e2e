describe("Issue comments: add, edit, and delete", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  const getIssueDetailsModal = () =>
    cy.get('[data-testid="modal:issue-details"]');
  const getCommentElement = () => cy.get('[data-testid="issue-comment"]');
  const getCommentTextarea = () =>
    cy.get('textarea[placeholder="Add a comment..."]');
  const getSaveButton = () => cy.contains("button", "Save");
  const getConfirmModal = () => cy.get('[data-testid="modal:confirm"]');
  const initialComment = "This is a new comment";
  const editedComment = "This is an edited comment";

  it("Should add, edit, and delete a comment", () => {
    getIssueDetailsModal().within(() => {
      cy.contains("Add a comment...").click();
      getCommentTextarea().type(initialComment);
      getSaveButton().click().should("not.exist");
      cy.contains("Add a comment...").should("exist");
      getCommentElement().should("contain", initialComment);
    });
    getIssueDetailsModal().within(() => {
      getCommentElement()
        .contains(initialComment)
        .parent()
        .within(() => {
          cy.contains("Edit").click().should("not.exist");
          getCommentTextarea().clear().type(editedComment);
        });
      getSaveButton().click().should("not.exist");
      getCommentElement().should("contain", editedComment);
    });
    getIssueDetailsModal().within(() => {
      getCommentElement()
        .contains(editedComment)
        .parent()
        .within(() => {
          cy.contains("Delete").click();
        });
    });
    getConfirmModal()
      .contains("button", "Delete comment")
      .click()
      .should("not.exist");
    getIssueDetailsModal()
      .find('[data-testid="issue-comment"]')
      .should("not.contain", editedComment);
  });
});
