@transferToNewAccount
Feature: User can create new account and tranfer money

    Background: User registers a new account in bank
        When Clean database
        When Set initial balance "515.50" and minimum balance "100" on admin page
        Given User is on ParaBank web page registration screen
        When User creates new account with personal information "Jaan" and "Tamm"
        And  User inserts new account contacts "Pikk 3", "Tartu", "Tartumaa", "50444", "555767433" and "99886644"
        And User inserts new account credentials "jaanTest" and "passTest1"
        Then User "jaanTest" is logged in with new account

    Scenario Outline: User creates a new account and transfers all founds on it
        Given User in on accounts overview page
        When User checks existing account founds
        Then User has default funds values "<defaultFunds>"
        When User creates new account
        Then New account is created
        When User transfers all available funds "<defaultFunds>" to new account
        Then All funds "<defaultFunds>" are transfered to new account
        Given User in on accounts overview page
        Then User has default funds values "<defaultFunds>"

        Examples:
            | defaultFunds |
            | 515.50       |