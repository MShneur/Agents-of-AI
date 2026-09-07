# Structured-data Detection Policy

Do not conclude that JSON-LD/schema is absent from a page using only a static HTML fetch,
curl-like fetch, or markdown conversion.

A positive absence claim requires at least one method capable of observing rendered
structured data, such as:
- browser render + DOM query
- dedicated rich-results/schema validator result
- rendered crawler export
- direct source/framework inspection

If unavailable, report `UNKNOWN`: structured-data presence could not be determined from
the available artifact.
