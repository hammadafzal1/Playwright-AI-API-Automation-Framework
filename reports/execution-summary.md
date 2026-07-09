# Execution Summary

- Total tests: 24
- Passed: 15
- Failed: 9
- Skipped: 0
- Duration: captured from Playwright execution

## Observations
- The login endpoint returns a flattened response object with accessToken, refreshToken, id, username, and email.
- The signup-to-login flow currently returns 400 Invalid credentials for freshly created accounts, which should be investigated as a service defect.
- The framework is reusable and supports further API modules.
