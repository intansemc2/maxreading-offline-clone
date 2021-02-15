const fs = require('fs');

const parser = require('./parser.js');

const filenames = [
    'dia-ly.html',
    'khoa-hoc.html',
    'kinh-doanh.html',
    'lich-su.html',
    'tam-ly.html',
    'ton-giao.html',
    'triet-hoc.html',
    'truyen-trung-hoa.html',
    'van-hoc-trong-nuoc.html',
    'viet-nam.html',
    'vui-cuoi.html',
    'y-hoc-suc-khoe.html',
    'the-loai-khac.html',
];

// Create data
console.log(`\n\n[INFO] Staring with ${filenames.length} filenames. \n\n`);

let outputData = [];
for (let filename of filenames) {
    console.log(`\n\n[INFO] Working at filename ${filename}. \n\n`);

    outputData.push(parser.parser(filename));

    console.log(`\n\n[INFO] Done. Added filename ${filename}. \n\n`);
}

// Create output
console.log(`\n\n[INFO] Parsing done. Create JSON string ... \n\n`);
let outputString = JSON.stringify(outputData);

console.log(`\n\n[INFO] Write to file ... \n\n`);
fs.writeFileSync('output.json', outputString, { encoding: 'utf-8' });

console.log(`\n\n[INFO] Done. \n\n`);
