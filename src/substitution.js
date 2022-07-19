// Greetings! I will be including line-by-line comments breaking down and explaining what's happening at each part of the code. This helps explain my thought process to interviewers, and helps aspiring coders learn what's happening!

const substitutionModule = (function () {
  function substitution(input, alphabet, encode = true) {
    if (!alphabet || alphabet.length !== 26) return false; // auto rejects if our substitution alphabet isn't appropriate/doesn't exist

    //Now for some global variables that will be used throughout the function
    const baseAlphabet = "abcdefghijklmnopqrstuvwxyz".split(""); // creates an array of the alphabet (I didn't feel like typing it all out so this makes it easy ha ha ha)
    const inputToArr = input.toLowerCase().split(""); // turns our input into an array of letters that are lower cased and ready to be worked on
    const subAlphabet = alphabet.toLowerCase().split(""); //does the same as above, except to our substitute alphabet

    // substitute alphabet cannot have any repeat characters, so now we need to address that before moving on
    const subCorrection = subAlphabet.filter(
      (letter, index, arr) => arr.indexOf(letter) === index
    ); // this will loop through the sub alphabet and create a new array where if a letter isn't found at an index, it adds it to the array, and if it is found, it skips it, therefore skipping repeats, which will be important for the next line!
    if (subCorrection.length !== alphabet.length) return false;

    const encoder = () => {
      // This is the encoding portion
      let result = []; // we start with an empty array where we will get our final compilation of encoded letters
      const encode = (character) => {
        //Now we use this callback function within the encoder callback function
        const indexOfChar = baseAlphabet.indexOf(character); // all this does is retreive the number of the index that the character is equal to within the original alphabet
        const encodedCharacter = subAlphabet[indexOfChar]; //now this will locate our desired sub letter in the sub alphabet based on the index we located earlier!
        result.push(encodedCharacter); //finally we push the letter to the result, remember though this is within the callback only
      };
      inputToArr.forEach((character) => {
        //now we can use what we wrote to actually apply it to our input message
        character === " " ? result.push(" ") : encode(character); //this will help preserve spaces, if the character is a space, we just push it, if not, we apply our encoder callback function to the character!
      });
      return result.join(""); //now we join it all together and tada! Our message is encoded! Well, not quite yet, this is all a callback function remember? We'll use this below!
    };

    //Now that we have a callback function for the encoder, we just write the decoder portion! It'll look very similar, just flipped around

    const decoder = () => {
      // decoder portion
      let result = [];
      const decode = (character) => {
        const indexOfChar = subAlphabet.indexOf(character);
        const decodedCharacter = baseAlphabet[indexOfChar];
        result.push(decodedCharacter);
      };
      inputToArr.forEach((character) => {
        character === " " ? result.push(" ") : decode(character);
      });
      return result.join("");
    };
    // Now that we have refined our input array, checked to make sure it applies, and have written out what we want when we either decode or encode, it's just a matter of returning based on our encode argument

    return encode ? encoder() : decoder();
  }

  return {
    substitution,
  };
})();

module.exports = { substitution: substitutionModule.substitution };
