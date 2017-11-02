const fs = require('fs');
const extras = exports;

let seed = 0;

extras.generateId = function () {
    return Date.now() + seed++;
}

extras.saveArticles = function (data) {
    console.log(data);
    fs.writeFile("content/articles.json", JSON.stringify(data), "utf8", (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("articles updated");
        }
    });
};

extras.logRequest = function (url, body, time) {
    fs.appendFile("logs/" + new Date().toISOString().slice(0,10).replace(/-/g,""),
            time + " :\n" + "\turl : " + url + "\n\tbody : " + body + "\n", (err) => {
        if (err) {
            console.error(err);
        }
        else {
            console.log("log updated");
        }
    });
};