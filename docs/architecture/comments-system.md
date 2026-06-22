# Deferred Comments System

Comments are deferred from the first public launch.

When implemented later:

- Comments must not require GitHub login.
- Turnstile must be validated server-side.
- Comments must be moderated by default.
- Raw HTML must not be accepted.
- Contact details must not be displayed publicly.
- Rate limiting is required.
- Moderation actions must not use unsafe GET requests.
- D1 schema changes must be documented as migrations.

Target architecture:

```txt
Astro comment form
  -> Turnstile token
  -> POST /api/comments
  -> Worker validates Turnstile
  -> D1 stores pending comment
  -> moderation
  -> approved comments render on page
```

Initial tables for the later phase:

- `comments`
- `comment_moderation_events`
- `comment_rate_limits`
