# Update post call

- It's just about updating a content in the database.
- We are going to use the `@elastic/elasticsearch` client
- Up to you if you are going to use use create or index API (psst but with the index API you can perform updates as well 🤫)

⚠️ Only the red rectangle are is part of this task ⚠️

```mermaid
sequenceDiagram
    rect rgba(255, 127, 127, 0.75)
    note right of Frontend app: Task 2: Edit post.
    Frontend app->>+Feed service: Edit post.
    Feed service->>+Elasticsearch DB: Update document with these parameters.
    end
    Feed service-->>+Elasticsearch DB: Percolate updated document over the active feed filters.
    Feed service-->>+Frontend app: Send feed update to all feeds that matches updated document.
    Frontend app-->>+Frontend app: Applies feed update on feed component.
```
