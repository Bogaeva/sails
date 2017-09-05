/**
 * StatusController
 *
 * @description :: Server-side logic for managing statuses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  addStatus: function (req, res) {

    var data = {
      title       : req.param('title'),
      name        : req.param('name'),
      description : req.param('description'),
    }

    Status.create(data).exec(function (err, status) {

      //res.redirect('/status/view/' + status.id);

      if (err) {
        return res.send(500);
      }

      res.redirect('/status/');

    });
  },

  updateStatus: function (req, res) {

    var statusId = req.param('id');

    var updatedData = {
      title       : req.param('title'),
      name        : req.param('name'),
      description : req.param('description'),
    };

    Status.update(statusId, updatedData).exec(function (err) {

      if (err) {
        return res.send(500);
      }

      res.redirect('/status');
    });
  },

  deleteStatus: function (req, res) {

    var statusId = req.param('id');

    Status.destroy(statusId).exec(function (err) {

      if (err) {
        return res.send(500);
      };

      res.redirect('/status');
    });
  },

  index: function (req, res) {

    Status.find()
      .sort('id DESC')
      .exec(function (err, statuses) {

        if (err) {
          return res.send(500);
        }

        res.view({
          statuses : statuses
        });
      });
  },

  create: function(req, res) {

    res.view();
  },

  view: function (req, res) {

    var statusId = req.param('id');

    Status.findOne(statusId).exec(function (err, status) {

      if (!status) {
        return res.send(404);
      };

      if (err) {
        return res.send(500);
      };

      res.view({
        status: status
      });

    });

  },

};

