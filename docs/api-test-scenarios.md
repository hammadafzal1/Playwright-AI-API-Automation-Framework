# API Test Scenarios

## Positive Scenarios
- Login with known valid credentials
- Login immediately after creating a new user
- Validate that the access token is present and non-empty

## Negative Scenarios
- Invalid password
- Empty password
- Missing request body
- Invalid JSON payload
- Invalid content type or malformed headers

## Boundary Scenarios
- Very long password values
- Empty/blank credentials
- Unusual usernames

## Security Scenarios
- Invalid access token handling
- Malformed authorization header
- Injection-style payload strings
