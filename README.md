This is a web application that allows a registered user to create multiple-choice questions. In addition,
any registered user can answer the questions. Questions, answer options, and each answer are stored in a database.
The app also tracks statistics that can be accessed at /statistics for each registered user.
The app is available at https://deno-quiz.herokuapp.com/
The app can also be run locally with the shell command 'deno run --allow-all --unstable run-locally.js'
Do note that running locally requires you to have a database with the needed tables and inserting 
your database credentials to database/database.js
NOTE! I had to leave out a couple of pictures from the submission due to the .zip archive being too large with the
pictures included.

Create table statements needed for the application, enter these commands to your own database:

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));

The tests require a working database with the mentioned tables and database credentials
entered in file database/database.js
For some reason, on my computer, the first test in a file will fail no matter what.
That is why there are duplicate tests in the files.
Feel free to ignore the duplicate tests.
Specifics for passing the tests are given in the test files.
Tests can be run with the shell command 'deno test --allow-all --unstable'