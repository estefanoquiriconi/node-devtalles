const fs = require("fs");

const data = fs.readFileSync('README.md', 'utf-8');

const newContent = data.replace(/React/ig, "Angular");

fs.writeFileSync('README2.md', newContent);

console.log(data);