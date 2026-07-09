# API Test Plan

## Objective
Validate the login workflow for the DummyJSON authentication API and confirm that valid credentials succeed while invalid requests return the expected error responses.

## Scope
- Positive scenarios for successful login
- Negative scenarios for invalid input and malformed payloads
- Authentication-related validation and response structure checks

## Assumptions
- The service exposes a public login endpoint at /auth/login.
- The DummyJSON service accepts valid username/password credentials.
- The environment is the QA environment defined in the project configuration.

## Entry Criteria
- Playwright and project dependencies are installed.
- The base URL is reachable.

## Exit Criteria
- All planned automated tests execute successfully or failures are documented with evidence.

## Risks
- Remote API behavior may differ from story expectations.
- Some negative cases may return generic validation messages rather than strict schema errors.

## Traceability Matrix
| ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-01 | Valid login | Status 200 and token returned |
| TC-02 | New user signup then login | Status 200 after signup |
| TC-03 | Invalid password | Status 400 |
| TC-04 | Empty password | Status 400 |
| TC-05 | Missing body | Status 400 |
| TC-06 | Invalid JSON | Status 400 |
| TC-07 | Malformed authorization header | Request still accepted for login |
| TC-08 | Response schema validation | Response contains expected keys |
