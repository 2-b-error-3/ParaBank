@registerAccount
Feature: User registers a new account in bank

    Scenario Outline: User registers a new account in bank
        When Clean database
        Given User is on ParaBank web page registration screen
        When User creates new account with personal information "<firstName>" and "<lastName>"
        And  User inserts new account contacts "<address>", "<city>", "<state>", "<zipCode>", "<phone>" and "<ssn>"
        And User inserts new account credentials "<username>" and "<password>"
        Then User "<username>" is logged in with new account

        Examples:
            | firstName | lastName | address | city  | state    | zipCode | phone     | ssn      | username | password  |
            | Jaan      | Tamm     | Pikk 3  | Tartu | Tartumaa | 50444   | 555767433 | 99886644 | jaanTest | passTest1 |