---
title: Conventions And Formats
---

# Conventions And Formats

## JSON response format

JSON responses always have either `data` or `error` as a top-level property.
Any actual response data will be accessible under the `data` property to ensure
there are no naming conflicts with top-level errors.

## Error details

Error details are only displayed on testing environments. When present, the error
response contains a `details` property with more information, for example:

```json
{
    "error": {
        "error": "bad_query",
        "message": "Invalid query format",
        "details": {
            "validation": ["'limit' must be a positive integer"]
        }
    }
}
```

## Datetime

Dates and times are always displayed according to
[RFC 3339 5.6](https://tools.ietf.org/html/rfc3339#section-5.6), in UTC.

For example:

```
2019-10-10T23:53:50.487Z
```

## Ether and Token amounts

All amounts are specified in the smallest unit available. For example, Ether uses wei.

The amounts are expected as strings, because number formats usually don't have enough
precision.
