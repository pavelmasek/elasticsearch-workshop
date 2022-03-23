// Create mapping for post index
PUT /lesson-2-playground-posts
{
    "mappings" : {
      "properties" : {
        "feed_id" : {
          "type" : "keyword"
        },
        "labels" : {
          "type" : "keyword"
        },
        "message" : {
          "type" : "text"
        },
        "network" : {
          "type" : "keyword"
        },
        "profile" : {
          "type" : "keyword"
        },
        "publish_time" : {
          "type" : "date"
        }
      }
    }
}
// Create sample post
POST /lesson-2-playground-posts/_doc
{
    "feed_id": "feed-fake-id",
    "labels": ["label1", "label2"],
    "message": "message",
    "network": "instagram",
    "profile": "instagram-fake-id",
    "publish_time": "2020-01-01T00:00:00Z"
}

// Search through all posts
POST /lesson-2-playground-posts/_search

// Create mapping for percolation index
PUT /lesson-2-playground-percolation-by-index-data
{
    "mappings" : {
      "properties" : {
        "feed_id" : {
          "type" : "keyword"
        },
        "labels" : {
          "type" : "keyword"
        },
        "message" : {
          "type" : "text"
        },
        "network" : {
          "type" : "keyword"
        },
        "profile" : {
          "type" : "keyword"
        },
        "publish_time" : {
          "type" : "date"
        },
        "query" : {
          "type" : "percolator"
        }
      }
    }
}
// Save feed filter
POST /lesson-2-playground-percolation-by-index-data/_doc
{
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "network": [
              "youtube",
              "instagram"
            ]
          }
        },
        {
          "terms": {
            "labels": ["label1"]
          }
        }
      ]
    }
  }
}

// Search all the saved filters
POST /lesson-2-playground-percolation-by-index-data/_search


// Percolate over the saved filters
POST /lesson-2-playground-percolation-by-index-data/_search
{
    "query": {
        "percolate": {
            "field": "query",
            "index": "lesson-2-playground-posts",
            "id": "qa3wnH8BuDDziJDBxv6U"
        }
    }
}