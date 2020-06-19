# Lesson zero

1. Follow steps [from](../) about environment preparation.
2. Make sure everything is up & running.
3. Run command `npm start migrate`. This will populate your local database with sample data.
4. Playground is ready so go to play.

## Sample tasks
1. Get all posts with Pinterest or Tiktok network (1893)
1. Get all posts which has some attachments (4952)
  * Get posts with link attachments (3242)
  * Get posts with video & photo attachments (4452)
  * Get posts with only link attachments (?)
  * Get posts with only video or photo attachments (?)
1. Get posts with date from ???
1. ...

## Usefull commands

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

# sample search
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