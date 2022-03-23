
// Create mapping for percolation index
PUT /lesson-2-playground-percolation-by-fields
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
POST /lesson-2-playground-percolation-by-fields/_doc
{
  "query": {
    "bool": {
      "must": [
        {
          "terms": {
            "network": [
              "facebook",
              "twitter"
            ]
          }
        },
        {
          "terms": {
            "labels": ["golang"]
          }
        }
      ]
    }
  }
}

// Search all the saved filters
POST /lesson-2-playground-percolation-by-fields/_search

// Percolate over the saved filters
POST /lesson-2-playground-percolation-by-fields/_search
{
    "query": {
        "percolate": {
            "field": "query",
            "document": {
                "labels": ["golang"],
                "network": "facebook"
            }
        }
    }
}