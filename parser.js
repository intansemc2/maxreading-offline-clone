const fs = require('fs');
const path = require('path');

const { htmlToText } = require('html-to-text');

const parse_1 = require('./parser-1.js');
const parse_2 = require('./parser-2.js');
const parse_3 = require('./parser-3.js');

// parser
module.exports.parser = (filename, baseurl = './dataset/') => {
    let parsed = {};

    let source = '';

    // Level 1
    try {
        source = fs.readFileSync(path.resolve(baseurl + filename), { encoding: 'utf-8' });
        let parsed_1 = parse_1.parse_level_1(source);
        parsed.title = parsed_1.title;

        parsed.children = [];
        for (let link_1 of parsed_1.links) {
            let children_1 = { title: link_1.name, url: link_1.url };

            // Level 2
            try {
                source = fs.readFileSync(path.resolve(baseurl + link_1.url), { encoding: 'utf-8' });
                let parsed_2 = parse_2.parse_level_2(source, link_1.name);

                children_1.children = [];
                for (let link_2 of parsed_2.links) {
                    let children_2 = { title: link_2.name, url: link_2.url };

                    // Level 3
                    try {
                        source = fs.readFileSync(path.resolve(baseurl + link_2.url), { encoding: 'utf-8' });
                        let parsed_3 = parse_3.parse_level_3(source, link_2.name);

                        children_2.content = parsed_3.content;
                    } catch (error_3) {
                        console.error(error_3);
                    }
                    children_1.children.push(children_2);
                }
            } catch (error_2) {
                console.error(error_2);
            }
            parsed.children.push(children_1);
        }
    } catch (error_1) {
        console.log(error_1);
    }

    return parsed;
};
