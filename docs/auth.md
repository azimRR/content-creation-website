# Authentication API

Base URL: `http://api.fotiha.uz:8000`

## `POST /auth/google`

Full URL: `http://api.fotiha.uz:8000/auth/google`

Authenticate with a Google OAuth token. Returns a JWT for use with all protected endpoints.

### Request Body

| Field   | Type     | Required | Description              |
|---------|----------|----------|--------------------------|
| `token` | `string` | Yes      | Google OAuth ID token    |

#### Example Request

```json
{
  "token": "eyJhbGciOiJSUzI1NiIs..."
}
```

### Response Body

| Field          | Type     | Description                  |
|----------------|----------|------------------------------|
| `access_token` | `string` | JWT token (valid for 7 days) |
| `token_type`   | `string` | Always `"bearer"`            |
| `user`         | `object` | User info                    |
| `user.id`      | `int`    | User ID                      |
| `user.email`   | `string` | User email                   |
| `user.name`    | `string` | User display name            |
| `user.picture` | `string` | User profile picture URL     |

#### Example Response

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "email": "user@gmail.com",
    "name": "John Doe",
    "picture": "https://lh3.googleusercontent.com/..."
  }
}
```

### Using the JWT

After login, store the `access_token` and include it in all subsequent requests:

```
Authorization: Bearer <access_token>
```

### JWT Details

| Property    | Value     |
|-------------|-----------|
| Algorithm   | HS256     |
| Expiry      | 7 days    |
| Payload     | `sub` (user ID), `email`, `iat`, `exp` |

### Errors

| Status | Detail                          |
|--------|---------------------------------|
| 401    | Invalid Google token             |
| 403    | Email not in allowed list        |

### Flow

1. Frontend gets Google OAuth ID token (from Google Sign-In)
2. Frontend sends it to `POST /auth/google`
3. Backend verifies with Google, creates/updates user
4. Backend issues a JWT and returns it with user info
5. Frontend stores the JWT and uses it for all protected endpoints

### Related Files

- Route: `app/routes/auth.py`
- Schema: `app/schemas/auth.py`
- Dependencies: `app/dependencies.py`
- Config: `app/config.py`
