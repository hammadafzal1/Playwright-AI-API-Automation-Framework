Playwright AI Agentic API Automation Framework
Overview

The Playwright AI Agentic API Automation Framework is an AI-assisted, enterprise-ready API automation framework built with Playwright, TypeScript, and GitHub Copilot.

Unlike traditional automation frameworks where engineers manually write every test case, this framework uses AI to analyze business requirements, compare them with the existing implementation, generate or update Playwright API tests, execute the suite, analyze failures, generate reports, and prepare Git changes.

The framework follows a modular architecture and is designed to evolve from simple Markdown-based requirements to enterprise integrations such as Jira, Swagger/OpenAPI, Postman Collections, and CI/CD pipelines.

Key Features
AI-assisted API automation using GitHub Copilot
Playwright APIRequestContext with TypeScript
Reusable and modular framework design
Business requirement–driven automation
Externalized test data
Automatic documentation generation
Execution summary generation
Failure analysis reporting
Playwright HTML reporting
Git-ready workflow
Designed for future Jira and Swagger integration
Technology Stack
Playwright
TypeScript
Node.js
GitHub Copilot
Playwright APIRequestContext
Git
GitHub

Framework Workflow
Business Requirements
(api-story / Jira)

        │
        ▼

API Contract
(Swagger / Postman / api-contract)

        │
        ▼

Test Data
(testdata.json)

        │
        ▼

AI Instructions
(api-prompt.md)

        │
        ▼

GitHub Copilot

        │
        ▼

Analyze Existing Framework

        │
        ▼

Generate or Update Playwright API Tests

        │
        ▼

Execute Tests

        │
        ▼

Failure Analysis

        │
        ▼

Reports & Documentation

        │
        ▼

Git Commit / CI/CD
Framework Inputs

The framework separates responsibilities into four independent inputs.

1. Business Requirements

Business requirements define what should be tested.

Examples:

Markdown Story
Jira Story
Azure DevOps Work Item
2. API Contract

The API contract defines how the APIs work.

Supported sources:

Swagger/OpenAPI
Postman Collection
API Contract Document
3. Test Data

Test data is maintained separately from automation.

Examples include:

Usernames
Passwords
IDs
Search values
Performance thresholds
4. AI Instructions

The AI prompt instructs GitHub Copilot how to:

Analyze requirements
Compare existing automation
Reuse framework components
Generate or update automation
Execute tests
Generate reports
Prepare Git changes
Current Demo Project

This repository demonstrates the framework using the DummyJSON REST API.

Modules include:

Authentication
Users
Todos
Products

The architecture is generic and can be adapted to any REST API project.

Execution Flow
Read project configuration.
Load business requirements.
Load API contract.
Load test data.
Analyze the existing framework.
Generate or update missing automation.
Execute the Playwright API suite.
Analyze failures.
Generate documentation and reports.
Prepare Git changes.
Reports Generated

The framework generates:

API Test Plan
API Test Scenarios
Playwright HTML Report
Execution Summary
Failure Analysis
Future Enhancements

The framework has been designed to support future integrations with:

Jira
Azure DevOps
Swagger/OpenAPI
Postman Collections
MCP Servers
GitHub Actions
Jenkins
Azure Pipelines
AI Self-Healing
AI Test Optimization
Benefits
Reduced manual scripting effort
Faster automation development
Reusable architecture
AI-assisted maintenance
Externalized configuration
Scalable enterprise design
CI/CD ready
Author

Hammad Afzal

Software QA Automation Engineer | AI Test Automation | Playwright | Selenium | API Testing | TypeScript | AI Agentic Automation

License

This repository is intended for learning, research, and demonstration purposes. Customize it according to your organization's standards and requirements.
