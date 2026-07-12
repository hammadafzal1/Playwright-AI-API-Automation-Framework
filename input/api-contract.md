DummyJSON API Contract
Application

DummyJSON

Base URL

https://dummyjson.com
Authentication

Authentication Type

JWT Bearer Token

The Login API returns an Access Token that must be captured dynamically and reused for authenticated APIs.

API 1 — Login

Endpoint

POST /auth/login

Headers

Content-Type: application/json
Accept: application/json

Request Body

{
  "username": "<username>",
  "password": "<password>"
}

Expected Status

200 OK

Expected Response

accessToken
refreshToken
id
username
email
firstName
lastName
image
API 2 — Current Authenticated User

Endpoint

GET /auth/me

Headers

Authorization: Bearer <accessToken>

Expected Status

200 OK
API 3 — Get Users

Endpoint

GET /users

Query Parameters

limit
skip
select

Expected Status

200 OK
API 4 — Get User

Endpoint

GET /users/{id}

Expected Status

200 OK
404 Not Found
API 5 — Search Users

Endpoint

GET /users/search?q={keyword}

Expected Status

200 OK
API 6 — Get Todos

Endpoint

GET /todos

Expected Status

200 OK
API 7 — Add Todo

Endpoint

POST /todos/add

Headers

Content-Type: application/json

Request Body

{
  "todo": "<text>",
  "completed": false,
  "userId": 1
}

Expected Status

200 OK
201 Created
API 8 — Update Todo

Endpoint

PUT /todos/{id}

Headers

Content-Type: application/json

Expected Status

200 OK
API 9 — Delete Todo

Endpoint

DELETE /todos/{id}

Expected Status

200 OK
API 10 — Get Products

Endpoint

GET /products

Expected Status

200 OK
API 11 — Get Product

Endpoint

GET /products/{id}

Expected Status

200 OK
404 Not Found
API 12 — Search Products

Endpoint

GET /products/search?q={keyword}

Expected Status

200 OK
Common Validation Requirements

Every API should validate:

HTTP Status Code
Response Headers
Response Schema
Required Properties
Property Data Types
Business Rules
Response Time
Error Handling

The framework should capture authentication tokens automatically and reuse them for dependent APIs.

Do not hardcode tokens or credentials.