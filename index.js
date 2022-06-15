const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note. 

💡 HINT: You may want to filter the data first 😉*/


//(a) Home Team name for 2014 world cup final

fifaData
    .filter(arr => arr.Stage === "Final" && arr.Year === 2014)
    .map(arr => console.log(arr['Home Team Name']));


//(b) Away Team name for 2014 world cup final

fifaData
    .filter(arr => arr.Stage === "Final" && arr.Year === 2014)
    .map(arr => console.log(arr['Away Team Name']));

//(c) Home Team goals for 2014 world cup final
fifaData
    .filter(arr => arr.Stage === "Final" && arr.Year === 2014)
    .map(arr => console.log(arr['Home Team Goals']));
//(d) Away Team goals for 2014 world cup final
fifaData
    .filter(arr => arr.Stage === "Final" && arr.Year === 2014)
    .map(arr => console.log(arr['Away Team Goals']));

//(e) Winner of 2014 world cup final */
fifaData
    .filter(arr => arr.Stage === 'Final' && arr.Year === 2014)
    .map(arr => console.log(arr['Home Team Goals'] > arr['Away Team Goals'] ? arr['Home Team Name'] : arr['Away Team Name']));

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive an array as a parameter that will take the fifa data as its argument
2. Return an array of objects with the data of the teams that made it to the final stage

💡 HINT - you should be looking at the stage key inside of the objects
*/

function getFinals(arr) {
    return arr.filter(arr => arr.Stage === "Final");
 }


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(arr,cb) {
    let years = cb(arr).map(arr => arr['Year']);
    return years;
}
console.log(getYears(fifaData,getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Determines the winner (home or away) of each `finals` game. 
💡 HINT: Don't worry about ties for now (Please see the README file for info on ties for a stretch goal.)
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(arr,cb) {
   let winners = cb(arr).map(arr => arr['Home Team Goals'] > arr['Away Team Goals'] ? arr['Home Team Name'] : arr['Away Team Name'])
   return winners;
}

console.log(getWinners(fifaData,getFinals));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array as the first parameter that will take fifaData as an argument
2. Receive a callback function as the second parameter that will take getFinals from task 2 as an argument
3. Receive a callback function as the third parameter that will take getYears from task 3 as an argument
4. Receive a callback function as the fourth parameter that will take getWinners from task 4 as an argument
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

💡 HINT: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(arr,cbRound,cbYears,cbWinners) {
    let strArray = [];
    for (let i=0; i<cbWinners(arr,cbRound).length; i++){
        let year=cbYears(arr,cbRound)[i];
        let winner=cbWinners(arr,cbRound)[i];
        strArray.push(`In ${year}, ${winner} won the world cup!`);
    }
    return strArray;
}

console.log(getWinnersByYear(fifaData,getFinals,getYears,getWinners));


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive a callback function in a parameter that will take getFinals (from task 2) as an argument and ensure you pass in the fifaData as its argument
 
 💡 HINT: Example of invocation: getAverageGoals(getFinals(fifaData));

 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 💡 HINT: use .reduce, .toFixed (refer to MDN for syntax), and do this in 2 steps) 
 
 
*/

function getAverageGoals(cb) {
    let allGoals = cb.map(arr => arr['Home Team Goals'] + arr['Away Team Goals']);
    let avgGoals = allGoals.reduce(
        (a, b) => a+b, 0) / allGoals.length;
    return Number.parseFloat(avgGoals).toFixed(2);
 }

 console.log(getAverageGoals(getFinals(fifaData)));



/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(arr, initials) {
	let winners = getFinals(arr).map(arr => arr['Home Team Goals'] > arr['Away Team Goals'] ? arr['Home Team Initials'] : arr['Away Team Initials'])
	let totalWins = winners.reduce(function(winCount, currentIndex) {
		if (typeof winCount[currentIndex] !== "undefined") {
			winCount[currentIndex]++;
			return winCount;
		} else {
			winCount[currentIndex] = 1;
			return winCount;
		}
	}, {});
    if (totalWins[initials] === undefined) {
        return 0;
    }
    return totalWins[initials];
}

console.log(getCountryWins(fifaData,"GER"));

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(arr) {

}


/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
