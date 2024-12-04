const fs = require("fs");

const content = fs.readFileSync('README.md', 'utf-8');

const words = content.split(' ');

const reactWordCount = content.match(/React/ig).length;
const reactWordCount2 = words.filter(word => word.toLowerCase().includes('react')).length;
const reactWordCount3 = words.filter(word => word.toLowerCase() === 'react').length;


console.log('Palabras React: ', reactWordCount ); // case sensitive
console.log('Palabras React: ', reactWordCount2 ); // case insensitive
console.log('Palabras React: ', reactWordCount3 ); // case insensitive