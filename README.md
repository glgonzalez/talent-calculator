# DnD Beyond Front-End Developer Challenge Talent Calculator
This project allows users to spend points on talents from talent paths

## Get Started
There are only a few simple steps to get this app running
1. Run `yarn install`
2. Run `yarn start`

The app should open us a browser window/tab to localhost:8080

### Server 
A simple node server runs on port 3000 for the sole purpose of serving the talent data. *(it starts up as part of `yarn start`)*
I wanted to set it up as if the data needed to populate the app was coming from a database being served through an api.

### UI
Users are able to spend points for each talent selected up to their maximum *(in this case 6)*.
You can't select one talent in a path without selected the previous ones.
If a talent is chosen without first selecting it's prerequisites than all talents will be automatically selected up to the chosen *(assuming there are enough points)*. i.e. if talent 3 is selected but talent 1 and 2 aren't then talents 1, 2, and 3 will be auto selected and points will be spent for all.

Same goes for removing talents. If you have talents 1, 2, and 3 selected and want to remove talent 1, than talent 2 and 3 will also be removed.

#### Spending points
You can only choose talents as long as you have points available. If you try to select a talent further down the list than you have points to spend, no talents will be selected.

### Mobile
The app is styled for mobile devices. On smaller screens such as a phone the user can swipe left and right to see the other talents.
For selected and deslecting, since there is no right click on touch devices the users can tap on an already selected talent to remove it.



