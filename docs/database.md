# Database Tables (Supabase)

## `bookSummaries`

```json
{
  "id": "string",
  "title": "string",
  "author": "string",
  "category": "string",
  "rating": "number",
  "summary": "string",
  "fullContent": "string",
  "coverColor": "string",
  "coverIcon": "string",
  "isPublished": "boolean"
}
```

_Note: `isPublished` indicates that the post is not visible on the home page._

---

## `settings`

```json
{
  "id": "number",
  "featuredBookId": "string"
}
```

---

## `comments`

The `comments` table utilizes a "Persistent Guest" architecture. This allows viewers to comment without creating an account while maintaining database integrity, preventing spam, and enabling future account linking.

```json
{
  "id": "string",
  "bookId": "string",
  "guestToken": "string",
  "username": "string",
  "content": "string",
  "createdAt": "string"
}
```

🏗️ Implementation Notes

- `guestToken` **(The Anchor)**: This is the immutable identifier (UUID) stored as a secure, HTTP-only cookie in the user's browser. It serves as the primary key for tracking a user's session across the site. By storing this, we can easily block spammers at the database/middleware level without relying on IP addresses alone. It also provides a seamless upgrade path if a user later decides to create a permanent account (we simply link their guestToken to their new user_id).
- `username` **(The Presentation)**: This is a derived, flavor-text identifier generated upon the creation of a new guestToken. It typically combines a thematic prefix with a slice of the UUID (e.g., "Wandering Scholar 8A2F"). Storing it directly in the table prevents the need to recalculate or format the display name on every page render.
- **Indexes:** Ensure an index is created on bookId for fast retrieval on the individual summary pages, and on guestToken for rapid querying of a specific user's comment history or for moderation purposes.
