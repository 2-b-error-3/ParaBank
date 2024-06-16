import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

Given("User in on bill payment page", async () => {
  cy.get(selectors.bill.billPay).click();
});

When(
  "User inserts payee contact information {string}, {string}, {string}, {string}, {string} and {string}",
  async (payeeMame, address, city, state, zipCode, phone) => {
    cy.get(selectors.bill.payeeMame).type(payeeMame);
    cy.get(selectors.bill.address).type(address);
    cy.get(selectors.bill.city).type(city);
    cy.get(selectors.bill.state).type(state);
    cy.get(selectors.bill.zipCode).type(zipCode);
    cy.get(selectors.bill.phone).type(phone);
  }
);

When(
  "User inserts account number {string} and amount {string}",
  async (accountId, amount) => {
    cy.get(selectors.bill.account).type(accountId);
    cy.get(selectors.bill.verifyAccount).type(accountId);
    cy.get(selectors.bill.amount).type(amount);
  }
);

When("User completes the payment", async () => {
  cy.get(selectors.bill.sendPaymentButton).click();
});

Then("Payment is confirmed with {string}", async (amount) => {
  cy.get(selectors.bill.billpayResult).should("be.visible");
  cy.get(selectors.bill.confirmAmount).should("contain", "$" + amount);
});
