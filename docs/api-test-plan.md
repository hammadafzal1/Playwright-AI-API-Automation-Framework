# API Test Plan

## Objective
Validate the DummyJSON authentication, user, todo, and product APIs by automating the business scenarios described in the project story and contract.

## Scope
- Positive authentication and token reuse scenarios
- User listing and search scenarios
- Todo create, update, and delete scenarios
- Product listing, detail, and search scenarios
- Negative validation for invalid credentials and missing resources
- Performance checks against the configured response-time threshold

## Assumptions
- The active project is configured in config/project.config.json for DummyJSON.
- Test data is loaded from input/dummyjson/testdata.json.
- The base URL is reachable and the business contract is documented in input/api-contract.md.

## Entry Criteria
- Playwright dependencies are installed.
- The base URL is reachable.
- Test data is present and readable.

## Exit Criteria
- The automated tests execute and the results are documented.
- Any API defects are captured in the failure analysis report without weakening the business assertions.

## Risks
- The live DummyJSON API may return behavior that differs slightly from the documented examples for invalid credentials and performance timing.
- Network latency can cause response-time checks to exceed the configured threshold.

## Traceability Matrix
| ID | Scenario | Expected Result |
| --- | --- | --- |
| TC-01 | Login with valid credentials | HTTP 200 and token payload |
| TC-02 | Retrieve current user with reused token | HTTP 200 and matching username |
| TC-03 | Invalid login credentials | HTTP 400 with an error message |
| TC-04 | Retrieve users | HTTP 200 and an array of users |
| TC-05 | Search users | HTTP 200 and matching user results |
| TC-06 | Invalid user ID | HTTP 404 |
| TC-07 | Create todo | HTTP 201 and created todo payload |
| TC-08 | Update todo | HTTP 200 and updated values |
| TC-09 | Delete todo | HTTP 200 |
| TC-10 | Retrieve products | HTTP 200 and product list |
| TC-11 | Retrieve product by ID | HTTP 200 and expected product |
| TC-12 | Search products | HTTP 200 and matching results |
| TC-13 | Invalid product ID | HTTP 404 |
| TC-14 | Performance threshold | Response time below configured threshold |
