import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

Given("User in on request loan page", async () => {
  cy.get(selectors.requestLoan).click();
});

When(
  "User applies loan for {int} times bigger than {double} with down payment {int}",
  async (factor, defaultAmount, downPayment) => {
    const appliedLoanAmount = factor * defaultAmount;
    cy.get(selectors.amount).type(appliedLoanAmount);
    cy.get(selectors.downPayment).type(downPayment);
    cy.get(selectors.applyNowButton).click();
  }
);

Then("User loan request has {string}", async (loanResult) => {
  cy.get(selectors.loanStatus).should("contain", loanResult);
});

Then(
  "User has total amount {string} of funds on account",
  async (totalAmount) => {
    cy.get(selectors.totalAmount).should("have.text", "$" + totalAmount);
  }
);
