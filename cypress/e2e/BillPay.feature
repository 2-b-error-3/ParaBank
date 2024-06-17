@billPay
Feature: User can pay bill

    Background: User registers a new account in bank
        When Clean database
        When Set initial balance "515.50" and minimum balance "100" on admin page
        Given User is on ParaBank web page registration screen
        When User creates new account with personal information "Jaan" and "Tamm"
        And  User inserts new account contacts "Pikk 3", "Tartu", "Tartumaa", "50444", "555767433" and "99886644"
        And User inserts new account credentials "jaanTest" and "passTest1"
        Then User "jaanTest" is logged in with new account

    Scenario Outline: User can pay bill in the bank
        Given User in on bill payment page
        When User inserts payee contact information "<payeeName>", "<address>", "<city>", "<state>", "<zipCode>" and "<phone>"
        When User inserts account number "<accountId>" and amount "<amount>"
        When User completes the payment
        Then Payment is confirmed with "<amount>"

        Examples:
            | payeeName | address | city    | state    | zipCode | phone      | accountId | amount |
            | Mari      | Turu 2  | Tallinn | Harjumaa | 50022   | 5533004040 | 12345     | 275    |
            | <a        | Uus 99  | Tartu   | Tartumaa | 8765    | 53344556   | 12344     | 5555   |