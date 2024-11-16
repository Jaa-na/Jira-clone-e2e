import newIssueModal from "../../pages/newIssueModal";

describe("Issue Time Estimation and Time Logging Functionality", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url()
      .should("eq", `${Cypress.env("baseUrl")}project/board`)
      .then((url) => {
        cy.visit(url + "/board");
        cy.contains("This is an issue of type: Task.").click();
      });
  });

  it("Should add a time estimation successfully", () => {
    newIssueModal.clearExistingEstimationAndTimeTracking();
    newIssueModal.getEstimationInput().type(newIssueModal.estimationValue);
    cy.contains("Original Estimate (hours)").click();
    newIssueModal
      .getEstimationInput()
      .invoke("val")
      .should("eq", newIssueModal.estimationValue);
    newIssueModal.verifyEstimationPresent();
  });

  it("Should edit the time estimation successfully", () => {
    newIssueModal
      .getEstimationInput()
      .should("not.have.value", "")
      .clear({ force: true });
    newIssueModal.getEstimationInput().type(newIssueModal.newEstimationValue);
    cy.contains("Original Estimate (hours)").click();
    newIssueModal
      .getEstimationInput()
      .invoke("val")
      .should("eq", newIssueModal.newEstimationValue);
    newIssueModal.verifyNewEstimationPresent();
  });

  it("Should delete the time estimation successfully", () => {
    newIssueModal
      .getEstimationInput()
      .should("not.have.value", "")
      .clear({ force: true });
    cy.contains("Original Estimate (hours)").click();
    newIssueModal.getEstimationInput().invoke("val").should("be.empty");
    newIssueModal.verifyNewEstimationAbsent();
  });

  it("Combined - Should add, edit, and delete a time estimation successfully", () => {
    newIssueModal.clearExistingEstimationAndTimeTracking();
    newIssueModal.getEstimationInput().type(newIssueModal.estimationValue);
    cy.contains("Original Estimate (hours)").click();
    newIssueModal
      .getEstimationInput()
      .invoke("val")
      .should("eq", newIssueModal.estimationValue);
    newIssueModal.verifyEstimationPresent();
    newIssueModal
      .getEstimationInput()
      .clear({ force: true })
      .type(newIssueModal.newEstimationValue);
    cy.contains("Original Estimate (hours)").click();
    newIssueModal
      .getEstimationInput()
      .invoke("val")
      .should("eq", newIssueModal.newEstimationValue);
    newIssueModal.verifyNewEstimationPresent();
    newIssueModal.getEstimationInput().clear({ force: true });
    cy.contains("Original Estimate (hours)").click();
    newIssueModal.getEstimationInput().invoke("val").should("be.empty");
    newIssueModal.verifyNewEstimationAbsent();
  });

  it("Should add time logging successfully", () => {
    newIssueModal.clearExistingTimeTracking();
    newIssueModal.getTimeTracking().click({ force: true });
    newIssueModal.getModalTracking().within(() => {
      newIssueModal.getTimeSpentInput().type(newIssueModal.timeSpentValue);
      newIssueModal
        .getTimeRemainingInput()
        .type(newIssueModal.timeRemainingValue);
      cy.contains("button", "Done").click();
    });
    newIssueModal.verifyTimeLoggingPresent();
  });

  it("Should edit time logging successfully", () => {
    newIssueModal.getTimeTracking().click({ force: true });
    newIssueModal.getModalTracking().within(() => {
      newIssueModal
        .getTimeSpentInput()
        .clear({ force: true })
        .type(newIssueModal.newTimeSpentValue);
      newIssueModal
        .getTimeRemainingInput()
        .clear({ force: true })
        .type(newIssueModal.newTimeRemainingValue);
      cy.contains("button", "Done").click();
    });
    newIssueModal.verifyNewTimeLoggingPresent();
  });

  it("Should delete time logging successfully", () => {
    newIssueModal.getTimeTracking().click({ force: true });
    newIssueModal.getModalTracking().within(() => {
      newIssueModal.getTimeSpentInput().clear({ force: true });
      newIssueModal.getTimeRemainingInput().clear({ force: true });
      cy.contains("button", "Done").click();
    });
    newIssueModal.verifyNewTimeLoggingAbsent();
  });

  it("Combined - Should add, edit, and delete time logging successfully", () => {
    newIssueModal.clearExistingTimeTracking();
    newIssueModal.getTimeTracking().click({ force: true });
    newIssueModal.getModalTracking().within(() => {
      newIssueModal.getTimeSpentInput().type(newIssueModal.timeSpentValue);
      newIssueModal
        .getTimeRemainingInput()
        .type(newIssueModal.timeRemainingValue);
      cy.contains("button", "Done").click();
    });
    newIssueModal.verifyTimeLoggingPresent();
    newIssueModal.getTimeTracking().click({ force: true });
    newIssueModal.getModalTracking().within(() => {
      newIssueModal
        .getTimeSpentInput()
        .clear({ force: true })
        .type(newIssueModal.newTimeSpentValue);
      newIssueModal
        .getTimeRemainingInput()
        .clear({ force: true })
        .type(newIssueModal.newTimeRemainingValue);
      cy.contains("button", "Done").click();
    });
    newIssueModal.verifyNewTimeLoggingPresent();
    newIssueModal.getTimeTracking().click({ force: true });
    newIssueModal.getModalTracking().within(() => {
      newIssueModal.getTimeSpentInput().clear({ force: true });
      newIssueModal.getTimeRemainingInput().clear({ force: true });
      cy.contains("button", "Done").click();
    });
    newIssueModal.verifyNewTimeLoggingAbsent();
  });
});
