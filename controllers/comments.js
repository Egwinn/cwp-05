const extras = require('../extras');
const validator = require('../validator');
let _articles = require("../content/articles.json");
const comments = exports;

comments.create = function (req, res, payload, cb) {
    if (validator.isCommentValid(payload)) {
        let index = _articles.findIndex(article => article.id === payload.articleId);
        if (index !== -1) {
            payload.id = extras.generateId();
            _articles[index].comments.push(payload);
            cb(null, _articles[index].comments[_articles[index].comments.length - 1]);
            extras.saveArticles(_articles);
        }
        else {
            cb({code: 405, message: 'Article not found'});
        }
    }
    else {
        cb({code: 405, message: 'Article not found'});
    }
};

comments.delete = function (req, res, payload, cb) {
    let indexA = _articles.findIndex(article => article.id === payload.articleId);

    if (indexA !== -1) {
        let indexC = _articles[indexA].comments.findIndex(comment => comment.id === payload.id);
        if (indexC !== -1) {
            _articles[indexA].comments.splice(indexC, 1);
            cb(null, _articles);
            extras.saveArticles(_articles);
        }
        else {
            cb({code: 406, message: 'Comment not found'});
        }
    }
    else {
        cb({code: 405, message: 'Article not found'});
    }
};

