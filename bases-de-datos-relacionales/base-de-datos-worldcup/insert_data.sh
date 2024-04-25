#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
echo $($PSQL "TRUNCATE TABLE teams, games")
cat games.csv | while IFS="," read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
if [[ $YEAR != year ]]
then

# get team_id
WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")

if [[ -z $WINNER_ID ]]
    then
# insert winner and opponent
INSERT_WINNER=$($PSQL "INSERT INTO teams(name) VALUES('$WINNER')")
if [[ $INSERT_WINNER == 'INSERT 0 1' ]]
then
echo Inserted Winner into teams, $WINNER
fi
#get new team_id
      WINNER_ID=$($PSQL "select team_id from teams where name = '$WINNER'")
fi

if [[ -z $OPPONENT_ID ]]
    then
INSERT_OPPONENT=$($PSQL "INSERT INTO teams(name) VALUES('$OPPONENT')")

if [[ $INSERT_OPPONENT == 'INSERT 0 1' ]]
then
echo Inserted Opponent into teams, $OPPONENT
fi
#get new team_id
      OPPONENT_ID=$($PSQL "select team_id from teams where name = '$OPPONENT'")
fi
fi

# insert in games
INSERT_GAME=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES('$YEAR', '$ROUND', '$WINNER_ID', '$OPPONENT_ID', '$WINNER_GOALS', '$OPPONENT_GOALS')")
if [[ $INSERT_GAME == 'INSERT 0 1' ]]
then
echo Inserted into games, $YEAR, $ROUND, $WINNER_ID, $OPPONENT_ID, $WINNER_GOALS, $OPPONENT_GOALS
fi
done