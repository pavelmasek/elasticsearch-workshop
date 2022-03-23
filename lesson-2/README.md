This lesson includes sample app where we are going to demonstrate the feed update behavior.

# Before we start

We are going to reuse the Kibana & Elasticsearch docker setup from previous. So go back to the root folder and run

```
docker-compose up
```

then go back to `lesson-2` folder.

The database needs to be filled with the data first so go to the `server` folder and run `npm run populate-db`. This will prefill database with some initial data.

# Running the app

Once the servers are running we can run the app as well.

1. Go to `client` folder and run `npm run start` then
1. go to `server` folder and run `nodemon index.js` (If you are using VS Code you can run debugging preset instead `Lesson 2 - server`)
1. Now let's checkout the tasks!

# Data flows [Description](./docs/data-flow.md)

# Tasks

1. ### Create post using ES library - [Description](./docs/tasks/task1.md)
1. ### Edit post using ES library - [Description](./docs/tasks/task2.md)
1. ### Delete post using ES library - [Description](./docs/tasks/task3.md)
1. ### Register percolator and send update - [Description](./docs/tasks/task4.md)
1. ### Receive updates only for visible content - [Description](./docs/tasks/task5.md)
1. ### Receive updates for visible content after load more - [Description](./docs/tasks/task6.md)
1. ### Create percolation cleaner logic - [Description](./docs/tasks/task7.md)
