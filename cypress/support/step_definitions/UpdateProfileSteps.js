import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

Given("User is on update contact info page", async () => {
  cy.get(selectors.updatePage).click();
});

When("User updates {string} and {string}", async (firstName, lastName) => {
  cy.get(selectors.firstName).should("be.visible");
  cy.get(selectors.firstName).clear();
  cy.get(selectors.firstName).type(firstName);
  cy.get(selectors.lastName).clear();
  cy.get(selectors.lastName).type(lastName);
  cy.get(selectors.firstName).clear();
  cy.get(selectors.firstName).type(firstName);
  cy.get(selectors.updateButton).click();
});

When("User logs out from bank", async () => {
  cy.get(selectors.logOut).click();
});

When(
  "User logs in to the bank with {string} and {string}",
  async (username, password) => {
    cy.get(selectors.usernameInput).type(username);
    cy.get(selectors.passwordInput).type(password);
    cy.get(selectors.logInButton).click();
  }
);

Then("User is logged in to the bank successfully", async () => {
  cy.get(selectors.logOut).should("be.visible");
});

Then(
  "Fullname {string} {string} is displayed after welcome text",
  async (firstName, lastName) => {
    cy.get(selectors.leftPanel)
      .find(selectors.welcomeText)
      .should("contain.text", "Welcome " + firstName + " " + lastName);
  }
);
