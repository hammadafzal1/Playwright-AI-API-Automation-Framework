# API Test Scenarios

## Positive Scenarios
- Login with valid credentials from testdata.json
- Reuse the captured access token against a protected user endpoint
- Validate the response structure and performance threshold

## Negative Scenarios
- Invalid username and invalid password combinations
- Empty credentials
- Missing request body
- Invalid JSON payload
- Malformed authorization header

## Boundary Scenarios
- Long usernames
- Minimum-length password values

## Security Scenarios
- SQL injection payloads
- XSS payloads
- HTML injection payloads
- Invalid token handling via the reusable auth wrapper
