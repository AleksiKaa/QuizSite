This is a web application that allows a registered user to create multiple-choice questions. In addition,
any registered user can answer the questions. Questions, answer options, and each answer are stored in a database.
The app also tracks statistics that can be accessed at /statistics for each registered user.

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

Shell command needed to run the application locally: deno run --allow-all --unstable run-locally.js

The tests require a working database with the mentioned tables and database credentials
entered in file database/database.js
For some reason, on my computer, the first test in a file will fail no matter what.
That is why there are duplicate tests in the files.
Feel free to ignore the duplicate tests.
Specifics for passing the tests are given in the test files.
Tests can be run with the shell command deno test --allow-all --unstable

link to heroku: ???