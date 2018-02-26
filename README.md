# Skeleton project for Swagger

To test App, please use next commands:

Starts Api:
````
swagger project start
````

Starts editor:
````
swagger project edit
````

Quick test:
```
curl -X POST \
  http://localhost:10010/api/add \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 47088666-911a-1cd2-313f-1627bd97568b' \
  -d '{
  "points": [
    {
      "lat": 44.960278,
      "lon": 34.114679
    },
    {
      "lat": 44.962123,
      "lon": 34.120322
    }
  ]
}'
```