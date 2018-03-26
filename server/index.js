require('dotenv').config();
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0'),
    massive = require('massive'),
    bodyParser = require('body-parser');
const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;
const app = express();
app.use(bodyParser.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
})
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
})
passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_logged_in_user([id]).then( res => {
        done(null, res[0])
    })
})
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/adddoginfo'
}));
app.get('/auth/me', (req, res) => {
    if (!req.user) {
        res.status(404).send('Not There Bruh')
    } else {
        res.status(200).send(req.user);
    }
})
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})

app.get('/api/messages/:userOne/:userTwo', (req, res) => {
    let { userOne, userTwo } = req.params;
    const db = req.app.get('db');
    db.get_messages([userOne, userTwo]).then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/messages/:userOne/:userTwo', (req, res) => {
    let { userOne, userTwo } = req.params;
    let { messageText } = req.body;
    let date = new Date()
    const db = req.app.get('db');
    db.submit_message([userOne, userTwo, messageText, date]).then(response => {
        res.status(200).send(response)
    })
})

app.post('/api/submitNewDog', (req, res) => {
    let { userId, dogName, dogBreed, dogAge, dogGender } = req.body;
    const db = req.app.get('db');
    db.submit_new_dog([userId, dogName, dogBreed, dogAge, dogGender]).then(response => {
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
})

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
})

app.put('/api/updateRadius/:id', (req, res) => {
    let { id } = req.params;
    let { radius } = req.body;
    const db = req.app.get('db');
    db.update_radius([id, radius]).then(response => {
        res.status(200).send(response)
    })
})

app.put('/api/updateInterestedIn/:id', (req, res) => {
    let { id } = req.params;
    let { selectedType } = req.body;
    const db = req.app.get('db');
    db.update_interested_in([id, selectedType]).then(response => {
        res.status(200).send(response)
    })
})

app.put('/api/updateReason/:id', (req, res) => {
    let { id } = req.params;
    let { reason } = req.body;
    const db = req.app.get('db');
    db.update_reason([id, reason]).then(response => {
        res.status(200).send(response)
    })
})

app.get('/api/getDog/:id', (req, res) => {
    let { id } = req.params;
    const db = req.app.get('db');
    db.get_dog([id]).then(response => {
        res.status(200).send(response)
    })
})

app.delete('/api/deleteAccount/:id', (req, res) => {
    let { id } = req.params;
    const db = req.app.get('db');
    db.delete_account([id]).then(response => {
        res.status(200).send('Dog Account has been deleted')
    })
})

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`);
})

