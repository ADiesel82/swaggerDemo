Swagger demo 2

Task description:
Фронт - поле для логина и пароля + кнопка регистрация + кнопка получить данные

Бэк - Сервис 1 принимает логин пароль в случае если это регистрация - криптует пароль и сохраняет в бд, создает и хранит токен для второго сервиса
Если "получить данные" и валидные логин пароль то обращается к сервису 2 по рестапи с токеном

Сервис 2 отдает по запросу скрвису 1 любые данные взятые из другой монгодб базы например имя-фамилия 
Которые после этого Сервис 1 выдает на фронт

To start applications:
```
cd swaggerDemo
docker-compose up --build -d
```

App1 can be found in a browser by url: **http://localhost:8080/**

App1 has 2 registered users:
```
user1/user1pass

user2/user2pass
```

App2 has 99 test-users with username like: userX (example: user1, user2...user99)

!!!In a case if mongo has no test users:
``` 
cd swaggerDemo
docker-compose exec app1 curl -X GET http://app2:10002/api/fill/test -H 'Content-Type: application/json'
```

**To take a look App1/2 OpenAPI editor:**

Run **app1** OpenApi editor:
```
cd swaggerDemo
swagger project edit build/app1
```

Run **app2** OpenApi editor:
```
cd swaggerDemo
swagger project edit build/app2
```

Known issues:
- no success alerts
- 