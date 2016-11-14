"use strict";

const promptify = require("../lib");

let name = promptify("Enter your name");
console.log(`Hey, ${name}!`);

let pass = promptify("Enter your password", {
    char: "*"
});
console.log(`You entered: ${pass}`);


