class newIssueModal {
  constructor() {
    this.issueDetailsModal = '[data-testid="modal:issue-details"]';
    this.estimationInput = 'input[placeholder="Number"]';
    this.timeTrackingIcon = '[data-testid="icon:stopwatch"]';
    this.modalTracking = '[data-testid="modal:tracking"]';

    this.estimationValue = "5";
    this.newEstimationValue = "8";
    this.timeSpentValue = "2";
    this.timeRemainingValue = "3";
    this.newTimeSpentValue = "4";
    this.newTimeRemainingValue = "1";
  }

  getIssueDetailsModal() {
    return cy.get(this.issueDetailsModal);
  }

  getEstimationInput() {
    return cy.get(this.estimationInput);
  }

  getTimeSpentInput() {
    return cy.get('input[placeholder="Number"]').eq(0);
  }

  getTimeRemainingInput() {
    return cy.get('input[placeholder="Number"]').eq(1);
  }

  getTimeTracking() {
    return cy.get(this.timeTrackingIcon);
  }

  getModalTracking() {
    return cy.get(this.modalTracking);
  }

  clearExistingEstimationAndTimeTracking() {
    this.getIssueDetailsModal().within(() => {
      this.getEstimationInput().clear({ force: true });
      cy.contains("Original Estimate (hours)").click();
      this.getTimeTracking().click({ force: true });
    });
    this.getModalTracking().within(() => {
      this.getTimeSpentInput().clear({ force: true });
      this.getTimeRemainingInput().clear({ force: true });
      cy.contains("button", "Done").click();
    });
    this.getModalTracking().should("not.exist");
  }

  clearExistingTimeTracking() {
    this.getIssueDetailsModal().within(() => {
      this.getTimeTracking().click({ force: true });
    });
    this.getModalTracking().within(() => {
      this.getTimeSpentInput().clear({ force: true });
      this.getTimeRemainingInput().clear({ force: true });
      cy.contains("button", "Done").click();
    });
    this.getModalTracking().should("not.exist");
  }

  verifyEstimationPresent() {
    this.getTimeTracking()
      .siblings()
      .should("contain", `${this.estimationValue}h estimated`);
  }

  verifyNewEstimationPresent() {
    this.getTimeTracking()
      .siblings()
      .should("contain", `${this.newEstimationValue}h estimated`);
  }

  verifyEstimationAbsent() {
    this.getTimeTracking()
      .siblings()
      .should("not.contain", `${this.estimationValue}h estimated`);
  }

  verifyNewEstimationAbsent() {
    this.getTimeTracking()
      .siblings()
      .should("not.contain", `${this.newEstimationValue}h estimated`);
  }

  verifyTimeLoggingPresent() {
    this.getTimeTracking()
      .siblings()
      .should("contain", `${this.timeSpentValue}h logged`)
      .and("contain", `${this.timeRemainingValue}h remaining`);
  }

  verifyNewTimeLoggingPresent() {
    this.getTimeTracking()
      .siblings()
      .should("contain", `${this.newTimeSpentValue}h logged`)
      .and("contain", `${this.newTimeRemainingValue}h remaining`);
  }

  verifyTimeLoggingAbsent() {
    this.getTimeTracking()
      .siblings()
      .should("not.contain", `${this.timeSpentValue}h logged`)
      .and("not.contain", `${this.timeRemainingValue}h remaining`);
  }

  verifyNewTimeLoggingAbsent() {
    this.getTimeTracking()
      .siblings()
      .should("not.contain", `${this.newTimeSpentValue}h logged`)
      .and("not.contain", `${this.newTimeRemainingValue}h remaining`);
  }
}

export default new newIssueModal();
