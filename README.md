Swagger demo 2

Description:
Фронт - поле для логина и пароля + кнопка регистрация + кнопка получить данные

Бэк - Сервис 1 принимает логин пароль в случае если это регистрация - криптует пароль и сохраняет в бд, создает и хранит токен для второго сервиса
Если "получить данные" и валидные логин пароль то обращается к сервису 2 по рестапи с токеном

Сервис 2 отдает по запросу скрвису 1 любые данные взятые из другой монгодб базы например имя-фамилия 
Которые после этого Сервис 1 выдает на фронт

To start applications:
```
docker-compose up --build -d
```

TODO:
To restore test-database:
```
docker-compose exec mongo ....
```


Run **app1** OpenApi editor:
```
swagger project edit build/app1
```

Run **app2** OpenApi editor:
```
swagger project edit build/app2
```