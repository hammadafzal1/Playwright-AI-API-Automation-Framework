# API Test Scenarios

## Positive Scenarios
- Login with valid credentials and confirm the returned token payload is present.
- Reuse the captured access token to request the current authenticated user profile.
- Retrieve the user list and perform a user search with known keywords.
- Create, update, and delete a todo using the configured payloads.
- Retrieve the product catalog, fetch a product by ID, and search for products by keyword.

## Negative Scenarios
- Submit invalid login credentials and expect a 400 response with an error message.
- Request a user with an invalid identifier and expect a not-found response.
- Request a product with an invalid identifier and expect a not-found response.

## Boundary Scenarios
- Validate the configured performance threshold for API responses.
- Check that the API returns well-formed objects and arrays for valid requests.

## Business Rule Checks
- Validate HTTP status codes, response bodies, required fields, and response timing.
- Document any discrepancies where the live API deviates from the expected behavior.
