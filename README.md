# binar-challenge-chapter-7

## user for login for admin => redirects to user dashboard
username: admin

password: binar

## postgreSQL user, creating db, and creating table
to connect to user and db
1. sudo service postgresql start
2. psql -U binar -h 127.0.0.1 binar_challenge_6_dev
3. in repo, run

sequelize db:migrate

sequelize db:seed:all



## available endpoints
1. Get '/login-admin' renders login page for admin
2. Post '/auth' request body for login authentication using local strategy
3. Get '/login' renders login page for user (register new user through admin user dashboard)
4. Post '/verify' request body for login authentication, returns jwt token
5. Get '/index' renders index page, require bearer token
6. Get '/suit-game?id=<id>' renders suit-game page, jwt auth not added for code testing. Still uses hardcoded id

### user game CRUD endpoints, can only be accessed through admin login
1. Get '/main-users' renders user list dashboard with username search tool, add user link, and CRUD pages link
2. Get '/detail-user/:id' renders user biodata based on the selected user on the dashboard page
3. Get '/add-user' renders add/create new user page
4. Post '/create' request body for add/create user. requests user game and user game biodata details 
5. Get '/delete/:id' deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
6. Get '/edit/:id' renders user data edit page
7. Post '/update/:id' request body for editing user data
