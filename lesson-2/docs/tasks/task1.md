# Create new post call

- It's just about saving new content in the database.
- We are going to use the `@elastic/elasticsearch` client
- Up to you if you are going to use use create or index API (psst but with the index API you can perform updates as well 🤫)

```
client.index({
    index: 'the name of the index',
    body: {
        'field name: 'field value',
        ...
    }
})
```

⚠️ Only the red rectangle are is part of this task ⚠️

```mermaid
sequenceDiagram
    rect rgba(255, 127, 127, 0.75)
    note right of Frontend app: Task 1: Create new post.
    Frontend app->>+Feed service: Create new post.
    Feed service->>+Elasticsearch DB: Create new document with these parameters.
    end
    Feed service-->>+Elasticsearch DB: Percolate new document over the active feed filters.
    Feed service-->>+Frontend app: Send feed update to all feeds that matches new document.
    Frontend app-->>+Frontend app: Applies feed update on feed component.
```
