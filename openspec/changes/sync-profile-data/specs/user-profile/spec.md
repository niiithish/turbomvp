## ADDED Requirements

### Requirement: Profile Data Synchronization

The profile page SHALL display data fetched from the database instead of mock data.

#### Scenario: Display fetched data

- **WHEN** the user visits the profile page
- **THEN** the fields (first name, last name, email, preferences) MUST be populated with data from the database

### Requirement: Profile Update with Undo

The system SHALL provide an "Undo" option after a successful profile update.

#### Scenario: Successful update

- **WHEN** the user updates a profile field
- **THEN** the system MUST optimistically update the UI
- **AND** trigger a background API update
- **AND** show a toast notification with an "Undo" button

#### Scenario: Undo action

- **WHEN** the user clicks "Undo" on the toast
- **THEN** the system MUST revert the UI to the previous value
- **AND** trigger a background API update to restore the previous value
- **AND** show a confirmation toast
