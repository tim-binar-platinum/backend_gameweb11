# binar-challenge-chapter-6

## user for login
username: admin
password: 12345

## postgreSQL user and dbname
to connect to user and db
psql -U binar -h 127.0.0.1 binar_challenge_6_dev

"username": "binar",
"password": "binar",
"database": "binar_challenge_6_dev",
"host": "127.0.0.1",

## available endpoints
1. Get '/' renders login page
2. Post '/login/auth' request body for login authorization
3. Get '/page/users' renders array of username objects
4. Get 'page/suit-game' renders suit game page

### user game CRUD endpoints
1. Get '/main-users' renders user list dashboard with username search tool, add user link, and CRUD pages link
2. Get '/detail-user/:id' renders user biodata based on the selected user on the dashboard page
3. Get '/add-user' renders add/create new user page
4. Post '/create' request body for add/create user. requests user game and user game biodata details 
5. Get '/delete/:id' deletes selected user on the dashboard page. Deletes the user game biodata, histories and user game data in that particular order
6. Get '/edit/:id' renders user data edit page
7. Post '/update/:id' request body for editing user data
