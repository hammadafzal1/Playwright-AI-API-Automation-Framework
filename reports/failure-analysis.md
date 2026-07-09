# Failure Analysis

## Failed Scenarios
- Newly created user login returns HTTP 400 with Invalid credentials.
- The API story expected a success-style response envelope, but the live service returns a flattened user payload.

## Root Cause
The DummyJSON login service behaves differently from the documented story. The tests were updated to validate the actual contract rather than the documented sample.

## Recommendations
- Add a dedicated data setup strategy for known-good users.
- Expand the framework with schema validation utilities for future API modules.
- Re-test the signup/login flow after validating the service contract with the provider.
