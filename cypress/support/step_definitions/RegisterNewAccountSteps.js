import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

Given("User is on ParaBank web page registration screen", async () => {
  cy.visit("/");
  cy.get(selectors.registerButton).click();
  cy.get(selectors.registerNewAccountButton).should("be.visible");
});

When(
  "User creates new account with personal information {string} and {string}",
  async (firstName, lastName) => {
    cy.get(selectors.firstName).type(firstName);
    cy.get(selectors.lastName).type(lastName);
  }
);

When(
  "User inserts new account contacts {string}, {string}, {string}, {string}, {string} and {string}",
  async (address, city, state, zipCode, phone, ssn) => {
    cy.get(selectors.address).type(address);
    cy.get(selectors.city).type(city);
    cy.get(selectors.state).type(state);
    cy.get(selectors.zipCode).type(zipCode);
    cy.get(selectors.phone).type(phone);
    cy.get(selectors.ssn).type(ssn);
  }
);

When(
  "User inserts new account credentials {string} and {string}",
  async (username, password) => {
    cy.get(selectors.createUsername).type(username);
    cy.get(selectors.createPassword).type(password);
    cy.get(selectors.confirmPassword).type(password);
    cy.get(selectors.registerNewAccountButton).click();
  }
);

Then("User {string} is logged in with new account", async (username) => {
  cy.get("#rightPanel .title")
    .contains("Welcome " + username)
    .should("be.visible");
});
