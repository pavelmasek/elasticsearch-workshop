# Lesson zero

1. Follow steps [from](../) about environment preparation.
2. Make sure everything is up & running.
3. Run command `npm start migrate`. This will populate your local database with sample data.
4. Playground is ready so go to play.

# Usefull commands

```
# index creation
PUT /posts-lesson-0

# index info
GET /posts-lesson-0

# index delete
DELETE /posts-lesson-0

# creation of one document
POST /posts-lesson-0/_doc
{ "name":"john doe","age":25 }

# searching for all documents in the given index
GET /posts-lesson-0/_search

# bulk population 
POST /posts-lesson-0/_bulk
{"index": { "_index": "posts-lesson-0" }}
{ "name":"john doe","age":28 }
{"index": { "_index": "posts-lesson-0" }}
{ "name":"john doe","age":28 }
{"index": { "_index": "posts-lesson-0" }}
{ "name":"john doe","age":28 }
{"index": { "_index": "posts-lesson-0" }}
{ "name":"john doe","age":28 }
{"index": { "_index": "posts-lesson-0" }}
{ "name":"john doe","age":28 }

GET /posts-lesson-0/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "statuses": [
              "scheduled"
            ]
          }
        },
        {
          "exists": {
            "field": "attachments"
          }
        },
        {
          "term": {
            "attachments.type": {
              "value": "video"
            }
          }
        }
      ]
    }
  }
}
```