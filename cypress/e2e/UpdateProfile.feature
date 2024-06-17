@updateProfile
Feature: User can update profile information

    Background: User registers a new account in bank
        When Clean database
        When Set initial balance "515.50" and minimum balance "100" on admin page
        Given User is on ParaBank web page registration screen
        When User creates new account with personal information "Jaan" and "Tamm"
        And  User inserts new account contacts "Pikk 3", "Tartu", "Tartumaa", "50444", "555767433" and "99886644"
        And User inserts new account credentials "jaanTest" and "passTest1"
        Then User "jaanTest" is logged in with new account

    Scenario Outline: User updates profile information
        Given User is on update contact info page
        When User updates "<newFrstName>" and "<newLastName>"
        When User logs out from bank
        And User logs in to the bank with "<username>" and "<password>"
        Then User is logged in to the bank successfully
        Then Fullname "<newFrstName>" "<newLastName>" is displayed after welcome text

        Examples:
            | newFrstName | newLastName | username | password  |
            | Albert      | Varblane    | jaanTest | passTest1 |
            | Mikk        | Sammal      | jaanTest | passTest1 |



