/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  addArticle: function (req, res) {

    var data = {
      title       : req.param("title"),
      description : req.param('description'),
    };

    var userId = req.session.passport.user;

    User.findOne(userId).exec(function (err, user) {

      if (!user) {
        return res.send(404);
      };

      if (err) {
        return res.send(500);
      };

      data.owner = user;
      data.author = user.username;

      Article.create(data).then(function (err, article) {       
        
        // user.articles.add(article.id);
        // user.save();
        // console.log('USER', user);
       
       res.redirect('/article');
      });

    });


  },

  updateArticle: function (req, res) {

    var articleId = req.param('id');

    var updatedData = {
      title       : req.param('title'),
      description : req.param('description'),
    };

    Article.update(articleId, updatedData).exec(function (err) {

      if (err) {
        return res.send(500);
      }

      res.redirect('/article');
    });
  },

  index: function (req, res) {

    Article.find()
      .sort('id DESC')
      .exec(function (err, articles) {

        if (err) {
          return res.send(500);
        }

        res.view({
          articles : articles
        });
      });
  },

  me: function (req, res) {
    var userId = req.session.passport.user;

    Article.find({owner: userId})
      .sort('id DESC')
      .exec(function (err, articles) {

        if (err) {
          return res.send(500);
        }

        res.view({
          articles : articles
        });
      });
  },

  deleteArticle: function (req, res) {

    var articleId = req.param('id');

    Article.destroy(articleId).exec(function (err) {

      if (err) {
        return res.send(500);
      };

      res.redirect('/article');
    });
  },

  create: function(req, res) {

    res.view();


  },

  view: function (req, res) {

    var articleId = req.param('id');

    Article.findOne(articleId).exec(function (err, article) {

      if (!article) {
        return res.send(404);
      };

      if (err) {
        return res.send(500);
      };

      res.view({
        article: article
      });

    });

  },
};

