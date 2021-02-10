const { htmlToText } = require('html-to-text');
module.exports.parse_level_3 = (source, level_2_title) => {
    let sourceString = `${source}`;

    let parsed = {};
    let lastPosition = 0;
    let cutPosition = 0;
    let searchString = '';

    // Find name of page
    searchString = level_2_title;
    lastPosition = sourceString.indexOf(searchString, lastPosition);

    searchString = `<h3>`;
    lastPosition = sourceString.indexOf(searchString, lastPosition);
    cutPosition = sourceString.indexOf(`</h3`, lastPosition + searchString.length);

    parsed.title = sourceString.slice(lastPosition + searchString.length, cutPosition);
    parsed.title = htmlToText(parsed.title, {
        wordwrap: false,
        tags: { img: { format: 'skip' }, a: { format: 'skip' } },
    });

    // Find all links
    parsed.content = ``;
    lastPosition = cutPosition;

    // Get href part
    searchString = `<div id="chapter">`;
    lastPosition = sourceString.indexOf(searchString, lastPosition);
    cutPosition = sourceString.indexOf(`</div`, lastPosition + searchString.length);
    let content = sourceString.slice(lastPosition + searchString.length, cutPosition);
    lastPosition = cutPosition;

    // Content to text
    content = htmlToText(content, { wordwrap: false, tags: { img: { format: 'skip' }, a: { format: 'skip' } } });

    // Add content
    parsed.content = content;

    return parsed;
};
