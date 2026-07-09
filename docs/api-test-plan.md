# API Test Plan

## Objective
Validate the authentication workflow for the DummyJSON login API and confirm that valid credentials succeed, invalid requests fail safely, and reusable tokens can be used for protected requests.

## Scope
- Positive authentication scenarios
- Negative and boundary validation
- Security-focused payload handling
- Token capture and token reuse through a protected endpoint

## Assumptions
- The service exposes a public login endpoint at /auth/login and a protected user endpoint at /auth/me.
- Test data is loaded from input/testdata.json.
- The environment is QA and the base URL is configured in config/project.config.json.

## Entry Criteria
- Playwright dependencies are installed.
- The base URL is reachable.
- Test data file is present and readable.

## Exit Criteria
- All automated tests execute and the results are documented.
- Any non-passing cases are analyzed and reported without weakening assertions.

## Risks
- The public API may return generic error messages for invalid payloads.
- The service contract may differ from the story example, so assertions should follow the actual live response.

## Traceability Matrix
| ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-01 | Valid credentials login | HTTP 200 and token values present |
| TC-02 | Token reuse for protected endpoint | HTTP 200 with user profile returned |
| TC-03 | Invalid credentials | HTTP 400 with an error message |
| TC-04 | Empty credentials | HTTP 400 |
| TC-05 | Missing body | HTTP 400 |
| TC-06 | Invalid JSON | HTTP 400 |
| TC-07 | Malformed authorization header | Request is handled without breaking test flow |
| TC-08 | Boundary data | HTTP 400 for invalid boundary inputs |
| TC-09 | Security payloads | HTTP 400 for malicious input |
| TC-10 | Response schema validation | Expected login response fields are present |
