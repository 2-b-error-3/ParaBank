import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

Given("This test must fail", async () => {
  cy.visit("/");
  cy.get(selectors.failTestElement).click();
});
