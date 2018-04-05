require('dotenv').config();

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive'),
    bodyParser = require('body-parser'),
    socket = require('socket.io'),
    app = express(),
    io = socket(app.listen(SERVER_PORT, () => { console.log(`Listening on port: ${SERVER_PORT}`);}));

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json());

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
});

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
   const db = app.get('db');
    const { sub, name, picture } = profile._json;
   db.find_user([sub]).then( response => {
       if (response[0]) {
        done(null, response[0].id)
       } else {
        db.create_user([name, picture, sub]).then( response => {
            done(null, response[0].id)
        })
       }
   })
   
}));

passport.serializeUser((id, done) => {
    done(null, id);
});

passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_logged_in_user([id]).then( res => {
        done(null, res[0])
    })
});

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
<<<<<<< HEAD
    successRedirect: process.env.REACT_APP_ADD_DOG_INFO
=======
    successRedirect: `${process.env.REACT_APP_LOCALHOST_3000}/#/adddoginfo`
>>>>>>> master
}));

app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('Not There Bruh')
    } else {
        const db = app.get('db');
        db.get_dog([req.user.id]).then(response => {
            res.status(200).send({user: req.user, response});
        })
    }
});

app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect(`${process.env.REACT_APP_LOCALHOST_3000}/#/`)
});

io.on('connection', socket => {
    socket.on('join room', data => {
        socket.join(data.room)
    })

    socket.on('message sent', function(data) {
        let { userOne, userTwo, message } = data;
        let date = new Date()
        const db = app.get('db');
        db.submit_message([userOne, userTwo, message, date]).then(response => {
            io.to(data.room).emit('message dispatched', response)
        })
    })

    socket.on('disconnect', () => {
        
    })
});

app.get('/api/messages/:userOne/:userTwo', (req, res) => {
    let { userOne, userTwo } = req.params;
    const db = req.app.get('db');
    db.get_messages([userOne, userTwo]).then(response => {
        res.status(200).send(response)
    })
});

app.post('/api/submitNewDog', (req, res) => {
    let { userId, dogName, dogBreed, dogBirthdate, dogGender, latitude, longitude } = req.body;
    let location =`SRID=4326;POINT(${longitude} ${latitude})`;
    const db = req.app.get('db');
    db.submit_new_dog([userId, dogName, dogBreed, dogBirthdate, dogGender, location, latitude, longitude]).then(response => {
        response[0].birthdate = JSON.stringify(response[0].birthdate)
        response[0].birthdate = response[0].birthdate.substring(1).split('T')[0]
        res.status(200).send(response)
    })
});

app.post('/api/editDogDeets/:id', (req, res) => {
    let { id } = req.params;
    let { name, breed, birthdate, gender, description } = req.body;
    const db = req.app.get('db');
    db.edit_dog_deets([id, name, breed, birthdate, gender, description]).then(response => {
        response[0].birthdate = JSON.stringify(response[0].birthdate)
        response[0].birthdate = response[0].birthdate.substring(1).split('T')[0]
        res.status(200).send(response)
    })
})

app.put('/api/profileImage/:id', (req, res) => {
    let { url } = req.body;
    let { id } = req.params;
    const db = req.app.get('db');
    db.add_profile_image([id, url]).then(response => {
        res.status(200).send(response)
    })
});

app.put('/api/removeImage/:id', (req, res) => {
    let { id } = req.params;
    let { number } = req.body;
    const db = req.app.get('db');
    if (number === 1){
        db.remove_profile_image([id]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 2) {
        db.remove_image_two([id]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 3) {
        db.remove_image_three([id]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 4) {
        db.remove_image_four([id]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 5) {
        db.remove_image_five([id]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 6) {
        db.remove_image_six([id]).then(response => {
            res.status(200).send(response)
        })
    }
});

app.put('/api/image/:id', (req, res) => {
    let { id } = req.params;
    let { number, url } = req.body;
    const db = req.app.get('db');
    if (number === 1){
        db.add_profile_image([id, url]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 2) {
        db.add_image_two([id, url]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 3) {
        db.add_image_three([id, url]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 4) {
        db.add_image_four([id, url]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 5) {
        db.add_image_five([id, url]).then(response => {
            res.status(200).send(response)
        })
    } else if (number === 6) {
        db.add_image_six([id, url]).then(response => {
            res.status(200).send(response)
        })
    }
})

app.put('/api/description/:id', (req, res) => {
    let { id } = req.params;
    let { desc } = req.body;
    const db = req.app.get('db');
    db.add_description([id, desc]).then(response => {
        res.status(200).send(response)
    })
});

app.put('/api/updateRadius/:id', (req, res) => {
    let { id } = req.params;
    let { radius } = req.body;
    const db = req.app.get('db');
    db.update_radius([id, radius]).then(response => {
        res.status(200).send(response)
    })
});

app.put('/api/updateInterestedIn/:id', (req, res) => {
    let { id } = req.params;
    let { selectedType } = req.body;
    const db = req.app.get('db');
    db.update_interested_in([id, selectedType]).then(response => {
        res.status(200).send(response)
    })
});

app.put('/api/updateReason/:id', (req, res) => {
    let { id } = req.params;
    let { reason } = req.body;
    const db = req.app.get('db');
    db.update_reason([id, reason]).then(response => {
        res.status(200).send(response)
    })
});

app.put('/api/updateRange/:id', (req, res) => {
    let { id } = req.params;
    let { min, max } = req.body.range;
    const db = req.app.get('db');
    db.update_range([id, min, max]).then(response => {
        res.status(200).send(response)
    })
});

app.get('/api/getDog/:id', (req, res) => {
    let { id } = req.params;
    const db = req.app.get('db');
    db.get_dog([id]).then(response => {
        var today = new Date();
        var birthDate = new Date(response[0].birthdate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        response[0].age = age
        response[0].birthdate = JSON.stringify(response[0].birthdate)
        response[0].birthdate = response[0].birthdate.substring(1).split('T')[0]
        res.status(200).send(response)
    })
})

app.get('/api/getDogByDogId/:id', (req, res) => {
    let { id } = req.params;
    const db = req.app.get('db');
    db.get_dog_by_id([id]).then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/getSwipeArray', (req, res) => {
    let { id, latitude, longitude, radius, interested_in, reason, age_begin, age_end } = req.query;
    const db = req.app.get('db');
    if (interested_in === "Both") {
        interested_in = "(Male|Female)"
    } else if (interested_in === "Male") {
        interested_in = "(Male)"
    } else if (interested_in === "Female") {
        interested_in = "(Female)"
    }
    let date = new Date()
    db.get_swipe_array([id, latitude, longitude, radius, interested_in, reason, age_begin, age_end]).then(response => {
        res.status(200).send(response)
    })
});

app.get('/api/getMatches/:id', (req, res) => {
    let { id } = req.params;
    const db = req.app.get('db');
    db.get_matches([id]).then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/likeDog', (req, res) => {
    let { dogLiking, dogBeingLiked } = req.query;
    const db = req.app.get('db');
    db.like_dog([dogLiking, dogBeingLiked]).then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/unlikeDog', (req, res) => {
    let { dogUnliking, dogBeingUnliked } = req.query;
    const db = req.app.get('db');
    db.unlike_dog([dogUnliking, dogBeingUnliked]).then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/unmatch', (req, res) => {
    let { userOne, userTwo } = req.body;
    const db = req.app.get('db');
    db.unmatch([userOne, userTwo]).then(response => {
        res.status(200).send('dog unmatched')
    })
})

app.get('/api/isItAMatch', (req, res) => {
    let { id, otherId } = req.query;
    const db = req.app.get('db');
    db.is_it_a_match([id, otherId]).then(response => {
        res.status(200).send(response[0].exists)
    })
})

app.delete('/api/deleteAccount/:id', (req, res) => {
    let { id } = req.params;
    const db = req.app.get('db');
    db.delete_account([id]).then(response => {
        res.status(200).send('Dog Account has been deleted')
    })
});



