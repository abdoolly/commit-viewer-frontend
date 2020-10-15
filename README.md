# Commit Viewer Frontend

This is the frontend of a system that allows people to view commits of any public repository they want.

## Prerequisite

make sure you have installed the following dependencies in your system

- node.js
- npm or yarn

In my commands I will be using yarn but, you can use npm if you want 

## Installation

run the install command
```
yarn 
```

## Configuring

you will find a file called `.env.example`
please make a copy of that file and name it `.env`
this has the backend api link it should look like this 

```
REACT_APP_BASE_URL=http://localhost:3000/
```
if  you would like change the backend url than the default then do not forget to change it here too for the frontend to be able to run it.

## Running 

Just run 
```
yarn start
```

this will open the browser on the react app you can now use it.