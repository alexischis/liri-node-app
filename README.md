# liri-node-app

In this node app, users will enter arguments on the command line to receive concert, song, and movie information from API calls.

# Motivation
I created this game as a part of the curriculum of the Full-Stack Coding Bootcamp at UConn, offered by Trilogy.

# Tech Used
This app was built with javascript files, APIs, dotenv, and fs.

# How It Works
This app is run by using the terminal; user input their command (spotify-this-song, movies-this, and concert-this) and argument details to pull information from the accompanying API. For spotify-this-song and movies-this there are default commands that will print on the command line even if the user does not input an argument. 

Users can also input a command called do-what-it-says, which does not require an argument. This command will run a function that reads another file, by using fs, to run a spotify-this-song command.

