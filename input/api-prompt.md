Read:

config/project.config.json

↓

api-story.md

↓

swagger.json (if available)

↓

testdata.json (if available)

Priority

1
Swagger

↓

2
Business Story

↓

3
Test Data

↓

4
Project Configuration


If Swagger exists,

use Swagger as the API contract.

If Swagger does not exist,

infer the contract from api-story.md.

Never hardcode credentials.

Always load data

from testdata.json.

If automation already exists,

compare

↓

Story

↓

Swagger

↓

Current Tests

↓

Generate only missing automation.

Never overwrite working code.

Never duplicate utilities.

Reuse existing framework.

Git Rule
Stage changes.

Prepare commit.

Wait for user approval before pushing.

project.config.json

↓

Read Settings

↓

api-story.md

↓

Understand Business

↓

swagger.json

↓

Understand API Contract

↓

testdata.json

↓

Load Test Data

↓

Generate Test Plan

↓

Generate Scenarios

↓

Generate API Classes

↓

Generate Tests

↓

Execute

↓

Analyze

↓

Generate Reports

↓

Prepare Git Commit