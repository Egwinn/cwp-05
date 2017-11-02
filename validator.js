const validator = exports;

validator.isArticleValid = function (req) {
  return req.title !== undefined && req.text !== undefined && req.date !== undefined
  && req.author !== undefined && validator.areCommentsValid(req.comments);
};

validator.areCommentsValid = function (comments) {
    comments.forEach((value) => {
        if (!validator.isCommentValid(value))
            return false;
    });
    return true;
};

validator.isCommentValid = function (req) {
    return Number.isInteger(req.articleId) && req.text !== undefined
    && req.date !== undefined && req.author !== undefined;
};