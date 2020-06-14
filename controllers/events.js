module.exports = function (app, models) {

    // INDEX
    app.get('/', (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            if (req.header('Content-Type') == 'application/json') {
                return res.json({events});
            } else {
                return res.render('events-index', { events: events });
    }
            res.render('events-index', { events: events });
        })
    })



    var events = [
      { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
      { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" },
      { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn" }
    ]



    app.get('/events/new', (req, res) => {
      res.render('events-new', {});
    })

    // CREATE
    app.post('/events', (req, res) => {
      models.Event.create(req.body).then(event => {
        res.redirect(`/events/${event.id}`)
      }).catch((err) => {
        console.log(err)
      });
    })

    // SHOW
    app.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
        let createdAt = event.createdAt;
        createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        event.createdAtFormatted = createdAt;
        res.render('events-show', { event: event });
    }).catch((err) => {
        console.log(err.message);
    })
});

    // UPDATE
    app.put('/events/:id', (req, res) => {
      models.Event.findByPk(req.params.id).then(event => {
        event.update(req.body).then(event => {
          res.redirect(`/events/${req.params.id}`);
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    });

    // EDIT
    app.get('/events/:id/edit', (req, res) => {
      models.Event.findByPk(req.params.id).then((event) => {
        res.render('events-edit', { event: event });
      }).catch((err) => {
        console.log(err.message);
      })
    });

    // DELETE
    app.delete('/events/:id', (req, res) => {
      models.Event.findByPk(req.params.id).then(event => {
        event.destroy();
        res.redirect(`/`);
      }).catch((err) => {
        console.log(err);
      });
    })
}
