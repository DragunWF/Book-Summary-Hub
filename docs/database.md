# Database Tables (Supabase)

## Book

```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "coverColor": "string",
  "category": "string",
  "rating": "number",
  "status": "string",
  "summary": "string",
  "fullContent": "string",
  "dateRead": "string",
  "coverIcon": "string"
}
```

## Comment

```json
{
  "id": "string",
  "bookId": "string",
  "nickname": "string",
  "content": "string",
  "createdAt": "string",
  "isApproved": "boolean"
}
```

### Spam Prevention / Rate Limiting Strategy

For future spam prevention and rate limiting, user IP addresses will be processed. It is important to note:

- **No raw IP addresses will be stored directly in the database.**
- IP addresses will be used primarily in Next.js Middleware or Supabase Edge Functions for transient rate limiting checks.
- If persistent identification for rate limiting is needed, a **one-way hash of the IP (e.g., SHA-256(IP + Secret_Salt))** will be used and stored separately (e.g., in a Redis cache), not as part of the main `Comment` model, to uphold user privacy.
- This processing falls under "Legitimate Interest" for security and abuse prevention and does not require explicit user consent via a browser prompt.
