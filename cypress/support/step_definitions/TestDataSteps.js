import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import selectors from "../selectors";

When("Clean database", async () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  });
  cy.request({
    method: "POST",
    url: "https://parabank.parasoft.com/parabank/db.htm",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8,et;q=0.7",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      Origin: "https://parabank.parasoft.com",
      Pragma: "no-cache",
    },
    form: true,
    body: {
      action: "CLEAN",
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

When(
  "Set initial balance {string} and minimum balance {string} on admin page",
  async (initialBalance, minimumBalance) => {
    cy.visit("/");
    cy.get(selectors.admin.adminPage).click();
    cy.get(selectors.admin.initialBalance).clear();
    cy.get(selectors.admin.initialBalance).type(initialBalance);
    cy.get(selectors.admin.initialBalance).should("have.value", initialBalance);
    cy.get(selectors.admin.minimumBalance).clear();
    cy.get(selectors.admin.minimumBalance).type(minimumBalance);
    cy.get(selectors.admin.minimumBalance).should("have.value", minimumBalance);
    cy.get(selectors.admin.submitButton).click();
  }
);

When("Register test account with cypress", async () => {
  cy.visit("/");
  cy.get(selectors.registerButton).click();
  cy.get(selectors.registerNewAccountButton).should("be.visible");
  cy.get(selectors.firstName).type("Jaan");
  cy.get(selectors.lastName).type("Tamm");
  cy.get(selectors.address).type("Pikk 3");
  cy.get(selectors.city).type("Tartu");
  cy.get(selectors.state).type("Tartumaa");
  cy.get(selectors.zipCode).type("50444");
  cy.get(selectors.phone).type("555767433");
  cy.get(selectors.ssn).type("99886644");
  cy.get(selectors.createUsername).type("jaanTest");
  cy.get(selectors.createPassword).type("passTest1");
  cy.get(selectors.confirmPassword).type("passTest1");
  cy.get(selectors.registerNewAccountButton).click();
  cy.get(selectors.logOut).click();
});
