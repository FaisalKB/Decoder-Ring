// Greetings! I will be including line-by-line comments breaking down and explaining what's happening at each part of the code. This helps explain my thought process to interviewers, and helps aspiring coders learn what's happening!

const caesarModule = (function () {
  function helper(arr) {
    // helper function time! Overview of the function below
    return arr.map((char) => {
      //mapping out each character in an array we'll create full of characters from our string
      const unicode = char.toLowerCase().charCodeAt(); //establishing variable that turns all characters lowercase AND converts to the appropriate charcode
      return unicode >= 97 && unicode <= 122 ? unicode : char; // I had to google to find the range of charcodes that equal the lowercase alphabet but once I found it, I set up a return to return either the character's charcode, or the character if it isn't a part of the aplhabet (spaces, punctuation etc)
    });
    // This helper function will take an array and for each character it'll convert it to lowercase and then
    // retreive the charcode. If a character doesn't return a desired charcode (such as spaces) we return
    // that character instead. This will be useful later!
  }

  function caesar(input, shift, encode = true) {
    if (!shift || shift === 0 || shift > 25 || shift < -25) return false; //auto rejects if shift doesn't meet our requirements.
    if (encode === false) shift = shift * -1; // will put us into decode mode by inverting our shift.

    let inputToArr = input.split(""); // splits string into each individual char and formats into array
    let charCodeArr = helper(inputToArr); //now our input string will get the helper function treatment!

    let shiftApplier = charCodeArr.map((code) => {
      // this will apply shift to where it matters
      return typeof code === "number" ? code + shift : code; //if our character/code is a number(charcode) we apply the shift! otherwise(spaces etc) we return just that character
    }); // now we should have an array of charcodes with the shift applied, and the spaces/punctuation/special chars unaffected

    let shiftCorrection = shiftApplier.map((code) => {
      //This will correct situations where we shift from abc etc; to xyz etc; and vice versa
      if (typeof code === "number") {
        // checking here to see if we're at a charcode or some other character
        if (code < 97) {
          // if our shift applier makes our code less than 97 ('a'), we add 26 to it, thus bumping it up
          return code + 26;
        }
        if (code > 122) {
          //if our shift applier makes our code greater than 122 ('z'), we subtract 26 from it, thus bringing it back within range
          return code - 26;
        }
      }
      return code; // if our charcode isn't a charcode but rather a space/punctuation/special char, we just return it
    });

    let arrToOutput = shiftCorrection.map((code) => {
      // lastly we take our fully processed codes and translate them back to a string
      return typeof code === "number" ? String.fromCharCode(code) : code; // if it's a charcode, we use the method to turn it into a string with the letter based on the charcode value! otherwise, just return the character
    });
    return arrToOutput.join(""); // Now we can return our freshly translated letters and join them together to create our string! All done!
  }

  return {
    caesar,
  };
})();

module.exports = { caesar: caesarModule.caesar };
