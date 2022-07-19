// Greetings! I will be including line-by-line comments breaking down and explaining what's happening at each part of the code. This helps explain my thought process to interviewers, and helps aspiring coders learn what's happening!

const polybiusModule = (function () {
  let cipher = {
    // global variable for our polybius cipher, which breaks it down into key:value pairs.
    11: "a",
    21: "b",
    31: "c",
    41: "d",
    51: "e",
    12: "f",
    22: "g",
    32: "h",
    42: "(i/j)",
    52: "k",
    13: "l",
    23: "m",
    33: "n",
    43: "o",
    53: "p",
    14: "q",
    24: "r",
    34: "s",
    44: "t",
    54: "u",
    15: "v",
    25: "w",
    35: "x",
    45: "y",
    55: "z",
  };

  let baseAlphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // array of our regular alphabet. Helps alot with preserving spaces

  function polybius(input, encode = true) {
    cipherNumbers = Object.keys(cipher); //array of only the cipher numbers
    cipherLetters = Object.values(cipher); //array of only the cipher letters
    //keep in mind the above arrays are the exact same length, this will be important later!

    if (encode) {
      //encoding portion
      let finalResult = ""; //starter variable of an empty string
      let resultNumbers = ""; //this is a placeholder for our cipher numbers, but since we need it in string format, its a string
      input
        .toLowerCase()
        .split("")
        .forEach((letter) => {
          //readying our input for processing by turning it into an array of lowercase letters and spaces, then the forEach will loop through the array and apply the following code to EACH character
          if (!baseAlphabet.includes(letter)) {
            //first off we account for spaces, if the character in our input is a space (isn't included in base alphabet) we just add it to the final result automatically.
            finalResult += letter;
            return finalResult;
          } else {
            // next we manually account for i and j since they're special. if the letter in our input array matches i or j, we'll auto-set the result numbers variable (our desired cipher number) to 42
            if (letter === "i" || letter === "j") {
              resultNumbers = "42";
            } else {
              //otherwise, if the character isn't an i or j, we process as normal
              const match = cipherLetters.find((char) => char === letter); //this is a little tricky, what I'm doing here is locating inside of our cipher alphabet array, specifically *where* the letter in the cipher array matches the letter in our input array
              const letterIndex = cipherLetters.indexOf(match); //we then take that match variable and use it to locate an index! now letter index here will retreive a number, the number is the index of the array where we found the letter in the match variable
              resultNumbers = cipherNumbers[letterIndex]; //lastly we set our desired cipher variable to equal the cipher number located at the index of where the letter would be!
            }
            finalResult += resultNumbers; //then it's just a matter of adding either 42 OR our located cipher number
          }
        });
      return finalResult; // once the forEach loop has concluded, finalResult will be done, we added spaces, 42's and other numbers from our cipher!
    }

    if (!encode) {
      // decoder portion
      let inputWithoutSpaces = input.replace(/ /g, ""); //we're cleaning our input by removing spaces, the only reason is to check and see if the length is even
      if (inputWithoutSpaces.length % 2 !== 0) {
        return false; // if length isn't an even number, we return false automatically
      } else {
        let decodedResult = ""; //starter variable for our final result
        let splitPairs = []; //empty array variable
        input.split(" ").forEach((word) => {
          //now we break apart sentences into just words by splitting at the spaces, and we look at the words
          splitPairs.push(word.match(/.{1,2}/g)); //now we push created pairs into our empty array
        });
        splitPairs.forEach((word, index) => {
          word.forEach((pair) => {
            if (pair === " ") {
              //adds spaces to the final result
              decodedResult += pair;
            } else if (pair === "42") {
              decodedResult += "(i/j)"; //adds our tricky i/j
            } else {
              const match = cipherNumbers.find((number) => number === pair); //now we find the matching cipher numbers in the cipher number array that match the pairs we made
              const numbersIndex = cipherNumbers.indexOf(match); //now we generate an index based on the index of where our match was, but do the searching in cipher numbers array
              const resultLetter = cipherLetters[numbersIndex]; //our resulting letter will be the letter in the cipher letters array located at the index of the corresponding cipher number
              decodedResult += resultLetter; // add the letter to the final message
            }
          });
          if (index !== splitPairs.length - 1) {
            //accounts for spaces
            decodedResult += " ";
          }
        });
        return decodedResult; // return final result
      }
    }
  }

  return {
    polybius,
  };
})();

module.exports = { polybius: polybiusModule.polybius };
