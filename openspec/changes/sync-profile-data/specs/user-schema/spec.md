## ADDED Requirements

### Requirement: User Preference Storage

The database SHALL store user preferences including timezone, language, and time format preference.

#### Scenario: Schema definition

- **WHEN** the user schema is defined
- **THEN** it MUST include `timezone` (text), `language` (text), and `use24Hour` (boolean) columns

### Requirement: Extended User Details

The database SHALL store extended user details such as first name and last name.

#### Scenario: Name splitting

- **WHEN** the user schema is defined
- **THEN** it MUST include `firstName` and `lastName` columns
