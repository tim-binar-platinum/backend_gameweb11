# Backend for Game Website

## postgreSQL user, creating db, and creating table
to connect to user and db
1. sudo service postgresql start
2. psql -U postgres_username -h 127.0.0.1 dbname
3. in directory, run

sequelize db:migrate

## available endpoints (all requires jwt token except login and register)
1. Post '/login' reqest body for login authentication. Returns jwt token
2. Post '/register' request body for creating new user
3. Get '/users' returns user list, search_name query for filtering
4. Post '/edit' request body for editing user details, already pass user id from jwt token
5. Get '/delete' deletes user account (masih menggunakan user id yang di pass dari jwt token, belum tau sebaiknya bagaimana) 
