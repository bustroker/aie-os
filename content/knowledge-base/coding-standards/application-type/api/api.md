# API Standards

## Purpose

Application-type standards for backend APIs regardless of the underlying
language.

## Rules

- Treat the API contract as a product boundary with explicit request, response, auth, and error semantics.
- Keep request and response shapes explicit and versionable.
- Validate inputs at the boundary and return actionable error information.
- Prefer additive changes over breaking changes.
- Make idempotency expectations explicit for mutating operations.
- Keep endpoint handlers thin and delegate domain, storage, and infrastructure work to services or repositories.
- Keep error response formats explicit and consistent across adjacent endpoints.

## Preferred Patterns

- Structured error payloads with stable machine-readable codes.
- Consistent pagination, filtering, and sorting semantics where the API shape needs them.
- Contract tests for externally consumed APIs.

## Forbidden Patterns

- Forcing framework migrations in established APIs only to satisfy a preferred default.
- Business logic embedded directly in transport handlers.
- Inconsistent or ad hoc error response formats across endpoints.
- Leaking internal exception messages directly to clients.
- Inconsistent naming across adjacent endpoints.
- Silent coercion of invalid input.
