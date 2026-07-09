# API Automation Story

## Project Information

**Project Name:** Playwright AI API Automation Framework

**Module:** Authentication

**Environment:** QA

**Framework:** Playwright API Automation with AI

**Language:** TypeScript

---

# Business Objective

The application provides user authentication APIs that allow existing users to log in securely.

The AI Automation Framework should:

- Analyze the API requirements
- Generate an API Test Plan
- Design comprehensive API test scenarios
- Generate reusable Playwright API automation
- Execute all API tests
- Analyze failures
- Generate execution reports
- Reuse existing framework components whenever possible

---

# Base URL

```
https://dummyjson.com
```


---

# Authentication

Authentication Type

```
Access Token
```

The Login API returns a Access token that must be reused for authenticated APIs.

---

# API 1 — User Login

## Endpoint

```
POST /auth/login
```

---

## Description

Authenticates an existing user.

---

## Request Headers

```
Content-Type: application/json
Accept: application/json
```

---

## Request Body

```json
{
  "username": "emilys",
  "password": "emilyspass!"
}
```

---

## Expected Status Code

```
200 OK
```

---

## Expected Response

```json
{
  "success": true,
  "message": "Login successful",
  "accessToken": "<JWT Access Token>",
  "refreshToken": "<JWT Refresh Token>"
  "user": {
    "id": 101,
    "name": "John Smith",
    "email": "john@example.com"
  }
}
```

---

## Business Validations

- Status code should be 200
- success should be true
- message should equal "Login successful"
- Access token should exist
- Access token should not be empty
- User object should exist
- User ID should be greater than zero
- Email should match request email
- Response time should be less than 2 seconds

---

## Positive Test Scenarios

Generate automation for:

- Valid login
- Login using newly created user
- Login multiple times
- Login after signup
- Login with valid credentials from test data

---

## Negative Test Scenarios

Generate automation for:

- Invalid email
- Invalid password
- Empty email
- Empty password
- Missing request body
- Invalid JSON
- Invalid Content-Type
- Missing Content-Type
- Unregistered email
- Locked account (if supported)
- Disabled account (if supported)

---

## Boundary Test Scenarios

Generate automation for:

- Minimum password length
- Maximum password length
- Long email address
- Email containing uppercase characters
- Leading/trailing spaces

---

## Security Test Scenarios

Generate automation for:

- SQL Injection
- XSS
- HTML Injection
- Invalid JWT
- Expired JWT
- Malformed Authorization Header

---

# API Dependency

Workflow:

```

Login

↓

Capture Access Token

↓

Reuse Access Token in future authenticated APIs
```

The framework should automatically capture the authentication token and reuse it in subsequent authenticated API tests.

---

# Test Data Requirements

The framework should automatically generate dynamic test data.

Generate:

- Unique email addresses
- Random usernames
- Strong passwords

Avoid hardcoded values whenever possible.

---

# AI Framework Instructions

The automation framework should:

- Read this API story
- Create a complete API Test Plan
- Create API Test Scenarios
- Reuse existing framework components
- Create reusable API classes if missing
- Generate Playwright API automation
- Execute all tests
- Retry failed tests only when appropriate
- Analyze failures
- Generate execution reports
- Suggest improvements when applicable

---

# Expected Deliverables

The AI should generate:

```
docs/
    api-test-plan.md
    api-test-scenarios.md

src/api/
    BaseApi.ts
    AuthApi.ts

tests/
    login/

reports/
    execution-summary.md
    failure-analysis.md

playwright-report/
```

---

# Success Criteria

The automation is considered successful when:

- All positive scenarios pass.
- Expected negative scenarios return correct error responses.
- Response schemas are validated.
- Access token is captured and reused.
- Response times meet performance expectations.
- Reports are generated successfully.
- The framework remains reusable, maintainable, and follows Playwright best practices.