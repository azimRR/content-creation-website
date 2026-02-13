# Text to Image API

Base URL: `http://api.fotiha.uz:8000`

## `POST /image/text2image`

Full URL: `http://api.fotiha.uz:8000/image/text2image`

Generate an image from a text prompt using Google Imagen 3.

### Authentication

Requires JWT token from `POST /auth/google` (see [auth.md](auth.md)).

```
Authorization: Bearer <jwt_token>
```

### Request Body

| Field          | Type     | Required | Default | Description                  |
|----------------|----------|----------|---------|------------------------------|
| `prompt`       | `string` | Yes      | -       | Text description (1-5000 chars) |
| `aspect_ratio` | `enum`   | No       | `1:1`   | Image aspect ratio           |

#### Aspect Ratio Options

| Value  | Name               |
|--------|--------------------|
| `1:1`  | Square             |
| `16:9` | Landscape          |
| `9:16` | Portrait           |
| `4:3`  | Standard           |
| `3:4`  | Standard Portrait  |

#### Example Request

```json
{
  "prompt": "A cat riding a skateboard in space",
  "aspect_ratio": "16:9"
}
```

### Response Body

| Field          | Type       | Description                        |
|----------------|------------|------------------------------------|
| `id`           | `int`      | Generation record ID               |
| `url`          | `string`   | Public GCS URL of the generated image |
| `prompt`       | `string`   | The prompt that was used            |
| `aspect_ratio` | `enum`     | The aspect ratio that was used      |
| `created_at`   | `datetime` | Timestamp of generation             |

#### Example Response

```json
{
  "id": 1,
  "url": "https://storage.googleapis.com/azim/generated/1/abc123.png",
  "prompt": "A cat riding a skateboard in space",
  "aspect_ratio": "16:9",
  "created_at": "2026-02-13T12:00:00Z"
}
```

### Errors

| Status | Detail                          |
|--------|---------------------------------|
| 401    | Invalid or missing JWT token    |
| 422    | Invalid request body            |
| 502    | Image generation failed         |

### Flow

1. User sends prompt + optional aspect ratio
2. Backend calls **Imagen 3** (`imagen-3.0-generate-002`) via `google-genai`
3. Generated PNG is uploaded to **GCS bucket** (`azim`) at `generated/{user_id}/{uuid}.png`
4. Image is made public
5. A `Generation` record is saved to the database (linked to the user)
6. Public URL is returned

### Related Files

- Route: `app/routes/image.py`
- Schema: `app/schemas/image.py`
- Model: `app/models/generation.py`
- Config: `app/config.py`
