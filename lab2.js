/*********************************************************
LAB 2: SORTING AND CAMPY SCI-FI

Welcome to Lab 2 =)

Be sure to read all the comments!

All of the instructions are inline with the assignment below.
Look for the word TODO in comments.  Each TODO will have a
description of what is required.

To run this file (in the terminal) use: node lab2.js

*********************************************************/
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log("assertion failure:", failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

 persons consumed  |  rate of consumption
 ------------------|---------------------
        0          |       1/hour
        1          |       2/hour
        2          |       3/hour
        3          |       4/hour

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/

function Blob(rateOfConsuption) {
  this.rateOfConsuption = rateOfConsuption || 0;
  this.peopleConsumed = this.rateOfConsuption - 1;
  this.hoursEaten = 0;
  this.eatForAnHour = function() {
    this.peopleConsumed += this.rateOfConsuption;
    this.rateOfConsuption = this.peopleConsumed + 1;
    this.hoursEaten++;
  };
}

var blob = new Blob(1);

while (blob.peopleConsumed < 1000) {
  blob.eatForAnHour();
}

var hoursSpentInDowington = blob.hoursEaten;
// TODO: assign me the value of the above calculation

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

function hoursToOoze(population, peoplePerHour) {
  var peopleEaten = 0, hoursEaten = 0;
  while (peopleEaten < population) {
    peopleEaten += peoplePerHour;
    peoplePerHour = peopleEaten + 1;
    hoursEaten++;
  }
  return hoursEaten;
  // TODO: implement me based on the instructions above. Be sure to then assign me to the Blob's prototype.
}

Blob.prototype.hoursToOoze = hoursToOoze;

assert(blob.hoursToOoze(0, 1) === 0, "no people means no time needed.");
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  "hoursSpentInDowington should match hoursToOoze\"s result for 1000");
// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.

assert(blob.hoursToOoze(10, 11) === 1, "The blob should eat the town in an hour");
assert(blob.hoursToOoze(31, 1) === 5, "The blob should eat the town in exactly 5 hours");
assert(blob.hoursToOoze(444, 1) === 9, "The blob should eat the town in 9 hours");

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: "nuqneH",  // home planet is Qo"noS
  romulan: "Jolan\"tru", // home planet is Romulus
  "federation standard": "hello" // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method called sayHello.

function SentientBeing (homePlanet, language) {
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor
  this.homePlanet = homePlanet;
  this.language = language;
}

// sb is a SentientBeing object
function sayHello (sb) {
    // TODO: say hello prints out (console.log's) hello in the
    // language of the speaker, but returns it in the language
    // of the listener (the sb parameter above).
    // use the 'hello' object at the beginning of this exercise
    // to do the translating

    return hello[sb.language];

    //TODO: put this on the SentientBeing prototype
  }

SentientBeing.prototype.sayHello = sayHello;

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

function Klingon() {}
Klingon.prototype = new SentientBeing("Qo\"noS", "klingon");
function Romulan() {}
Romulan.prototype = new SentientBeing("Romulus", "romulan");
function Human() {}
Human.prototype = new SentientBeing("Earth", "federation standard");

assert((new Human()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");
// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.
assert((new Human()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Klingon()).sayHello(new Human()) === "hello",
  "the human should hear hello");
assert((new Klingon()).sayHello(new Romulan()) === "Jolan\"tru",
  "the romulan should hear Jolan\"tru");
assert((new Romulan()).sayHello(new Human()) === "hello",
  "the human should hear hello");
assert((new Romulan()).sayHello(new Klingon()) === "nuqneH",
  "the klingon should hear nuqneH");

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one
//*********************************************************

///Here is my original answer that just sorts by the last letter.
///But I think I wrote better code below that sorts by the last letter but
///keeps looking at letters (if it matchs on any leter)
// function lastLetterSort(stringArray) {
//   function byLastLetter(a, b) {
//     //TODO: implement me. sort the strings in alphabetical
//     // order using their last letter
//     // read this: http://www.w3schools.com/jsref/jsref_sort.asp
//     if (lastLetter(a) < lastLetter(b)) {
//       return -1;
//     }
//     if (lastLetter(a) > lastLetter(b)) {
//       return 1;
//     }
//     // a must be equal to b
//     return 0;

//     function lastLetter(string) {
//       return string.charAt(string.length - 1);
//     }
//   }
//   stringArray.sort(byLastLetter);
// }

//TODO: implement me. sort the strings in alphabetical
// order using their last letter
// read this: http://www.w3schools.com/jsref/jsref_sort.asp
function lastLetterSort(stringArray) {
  stringArray = reverseStringsInArray(stringArray);
  stringArray.sort();
  return reverseStringsInArray(stringArray);

  function reverseString(string) {
    return string.split("").reverse().join("");
  }
  function reverseStringsInArray(array) {
    for (var i = 0; i < array.length; i++) {
      array[i] = reverseString(array[i]);
    }
    return array;
  }
}

var arrayToSort = [ "Banana", "Mango", "Orange", "Apple" ];
lastLetterSort(arrayToSort);
assert(arrayToSort[2] === "Apple", "Apple should be the third value in the array");

var arrayToSort = [ "Queen", "Duchess", "Princess", "Prince", "Duke", "King" ];
lastLetterSort(arrayToSort);
assert(arrayToSort[5] === "Duchess", "Duchess should be the last value in the array");

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  numberArray.forEach(function(element) {
    sum += element;
  });
  return sum;
}

var arrayToSum1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
assert(sumArray(arrayToSum1) === 55, "The sum should be 45");

var arrayToSum2 = [ 5, 2, 5, 23, 100, 2 ];
assert(sumArray(arrayToSum2) === 137, "The sum should be 137");

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return sumArray(a) - sumArray(b);
  });
  return arrayOfArrays;
}

var arrayofArrays1 = [ arrayToSum2, arrayToSum1 ];
arrayofArrays1 = sumSort(arrayofArrays1);
assert(sumArray(arrayofArrays1[0]) < sumArray(arrayofArrays1[1]),
  "The first array sum should be less than the second");

var arrayOfArrays2 = [ [ 2, 3, 4, 6, 2, 6, 2 ], [ 4, 23, 7, 4, 3, 2, 4 ],
  [ 4, 6, 3, 2, 1, 2, 3 ], [ 4, 2, 2, 5, 3, 1 ] ];
arrayOfArrays2 = sumSort(arrayOfArrays2);
assert(sumArray(arrayOfArrays2[1]) < sumArray(arrayOfArrays2[2]),
  "The second array sum sould be less than the third");

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
