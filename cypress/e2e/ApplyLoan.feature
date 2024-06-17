@applyLoan
Feature: User can apply a loan

    Background: User registers a new account in bank
        When Clean database
        When Set initial balance "515.50" and minimum balance "100" on admin page
        Given User is on ParaBank web page registration screen
        When User creates new account with personal information "Jaan" and "Tamm"
        And  User inserts new account contacts "Pikk 3", "Tartu", "Tartumaa", "50444", "555767433" and "99886644"
        And User inserts new account credentials "jaanTest" and "passTest1"
        Then User "jaanTest" is logged in with new account

    Scenario Outline: User applies for a loan in bank
        Given User in on request loan page
        When User applies loan for <factor> times bigger than <defaultFunds> with down payment <downPayment>
        Then User loan request has "<loanResult>"
        Given User in on accounts overview page
        Then User has total amount "<totalAmount>" of funds on account

        Examples:
            | defaultFunds | factor | downPayment | loanResult | totalAmount |
            | 515.50       | 10     | 100         | Denied     | 515.50      |
            | 515.50       | 1      | 100         | Approved   | 931.00      |