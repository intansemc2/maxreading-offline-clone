module.exports.parse_level_2 = (source, level_1_title) => {
    let sourceString = `${source}`;

    let parsed = {};
    let lastPosition = 0;
    let cutPosition = 0;
    let stopPosition = 0;
    let searchString = '';

    // Find name of page
    searchString = level_1_title;
    lastPosition = sourceString.indexOf(searchString, lastPosition);

    searchString = `<h3>`;
    lastPosition = sourceString.indexOf(searchString, lastPosition);
    cutPosition = sourceString.indexOf(`<`, lastPosition + searchString.length);

    parsed.title = sourceString.slice(lastPosition + searchString.length, cutPosition);

    // Find all links
    parsed.links = [];
    lastPosition = cutPosition;

    searchString = `div`;
    stopPosition = sourceString.indexOf(searchString, lastPosition);

    while (lastPosition < stopPosition && lastPosition > 0) {
        let linkUrl = ``;
        let linkName = ``;

        // Get href part
        searchString = `href="`;
        lastPosition = sourceString.indexOf(searchString, lastPosition);

        if (lastPosition + searchString.length >= stopPosition) break;

        cutPosition = sourceString.indexOf(`"`, lastPosition + searchString.length);
        linkUrl = sourceString.slice(lastPosition + searchString.length, cutPosition);
        lastPosition = cutPosition;

        // Get link name part
        searchString = `>`;
        lastPosition = sourceString.indexOf(searchString, lastPosition);
        cutPosition = sourceString.indexOf(`<`, lastPosition + searchString.length);
        linkName = sourceString.slice(lastPosition + searchString.length, cutPosition);
        lastPosition = cutPosition;

        // Add new link information
        parsed.links.push({ url: linkUrl, name: linkName });
    }

    return parsed;
};
