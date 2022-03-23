# Delete post call

- It's just about removing a content in the database.
- We are going to use the `@elastic/elasticsearch` client
- use the delete API for it

```
client.delete({
    index: 'the name of the index',
    id: 'id of the document'
})
```

⚠️ Only the red rectangle are is part of this task ⚠️

```mermaid
sequenceDiagram
    rect rgba(255, 127, 127, 0.75)
    note right of Frontend app: Task 3: Delete post.
    Frontend app->>+Feed service: Delete post.
    Feed service->>+Elasticsearch DB: Remove document with this id parameter.
    end
    Feed service-->>+Elasticsearch DB: Percolate removed document over the active feed filters.
    Feed service-->>+Frontend app: Send feed update to all feeds that matches removed document.
    Frontend app-->>+Frontend app: Applies feed update on feed component.
```
