import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

let accountId = null;
let newAccountId = null;

Given("User is on log in page", async () => {
  cy.visit("/");
  cy.get(selectors.logInButton).should("be.visible");
});

When(
  "User loggs in with username {string} and password {string}",
  async (username, password) => {
    cy.get(selectors.usernameInput).type(username);
    cy.get(selectors.passwordInput).type(password);
    cy.get(selectors.logInButton).click();
  }
);

Given("User in on accounts overview page", async () => {
  cy.visit("/");
  cy.get(selectors.accountsOverview).click();
});

When("User checks existing account founds", async () => {
  cy.get(selectors.accountId)
    .invoke("text")
    .then((text) => {
      accountId = text.trim();
      cy.wrap(accountId).as("accountIdAlias");
    });
});

Then("User has default funds values {string}", async (defaultAmount) => {
  cy.get(selectors.totalAmount).should("have.text", "$" + defaultAmount);
});

When("User creates new account", async () => {
  cy.get(selectors.openNewAccount).click();
  cy.get(selectors.selectAccountType).select("1");
  cy.get(selectors.selectAccountType).should("have.value", "1");
  cy.get(`select#fromAccountId option[value="${accountId}"]`).should("exist");
  cy.get(selectors.openNewAccountButton).click();
});

Then("New account is created", async () => {
  cy.get(selectors.newAccountId).should("be.visible");
  cy.get(selectors.newAccountId)
    .invoke("text")
    .then((text) => {
      newAccountId = text.trim();
    });
});

When(
  "User transfers all available funds {string} to new account",
  async (defaultAmount) => {
    cy.get(selectors.transferFunds).click();
    cy.get(selectors.fromAccountId).select(accountId);
    cy.get(selectors.toAccountId).select(newAccountId);
    cy.get(selectors.amount).type(defaultAmount);
    cy.get(selectors.transferButton).click();
    cy.get(selectors.showResult).should("be.visible");
  }
);

Then(
  "All funds {string} are transfered to new account",
  async (defaultAmount) => {
    cy.get(selectors.amountResult)
      .should("be.visible")
      .and("contain", "$" + defaultAmount);
  }
);
