# Elasticsearch Workshop

## Enviroment preparation 

### Install Docker
Install stable version of Docker Desktop for Mac [link](https://hub.docker.com/editions/community/docker-ce-desktop-mac/)

### Install Elasticsearch image [DOC](https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html)
1. Install Elastic search image 
```
docker pull docker.elastic.co/elasticsearch/elasticsearch:7.7.1
```
2. Start single-node cluster
```
docker run --name elasticsearch-workshop-node -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.7.1
```
3. Verify node is running by opening this link [http://localhost:9200/](http://localhost:9200/).
### Install Kibana image [DOC](https://www.elastic.co/guide/en/kibana/current/docker.html)
1. Install Kibana image
```
docker pull docker.elastic.co/kibana/kibana:7.7.1
```
2. Start Kibana, this step takes some time(up to 1 or 2 minutes) 
```
docker run --name kibana-workshop --link elasticsearch-workshop-node:elasticsearch -p 5601:5601 docker.elastic.co/kibana/kibana:7.7.1
```
3. Verify Kibana is running by opening this link [http://localhost:5601/](http://localhost:5601/).

## Tools to use
You can use whatever you want but using **Kibana Dev Tools** is pretty handy for our case because it has powerful intellisense.

### Kibana Dev Tools
To get started, open the menu, go to **Dev Tools**, then click **Console**.
![Kibana Dev Tools](../assets/kibana-console.png?raw=true)
### Postman
### Insomnia
### Browser

