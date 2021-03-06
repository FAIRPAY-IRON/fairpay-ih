const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const FBStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const FB_CLIENT_ID = process.env.FB_CLIENT_ID || '814113262107529';
const FB_CLIENT_SECRET = process.env.FB_CLIENT_SECRET || '57f7fa2ef3a1ef30f270d96939f3e2f7';
const FB_CB_URL = '/auth/fb/cb';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ||
    '387291381034-jvfb284fkvnkltau3pc0f3lr7a3sur51.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ||
    'xMON23EBA0svNequqXs77uZX';
const GOOGLE_CB_URL = '/auth/google/cb';

const FB_PROVIDER = 'facebook';
const GOOGLE_PROVIDER = 'google';

module.exports.setup = (passport) => {

    passport.serializeUser((user, next) => {
        next(null, user._id);
    });

    passport.deserializeUser((id, next) => {
        User.findById(id)
            .then(user => {
                next(null, user);
            })
            .catch(error => next(error));
    });

    passport.use('local-auth', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (email, password, next) => {
        User.findOne({email: email})
            .then(user => {
                if (!user) {
                    next(null, user, {password: 'Invalid email or password'});
                } else {
                    user.checkPassword(password)
                        .then(match => {
                            if (match) {
                                next(null, user);
                            } else {
                                next(null, null, {password: 'Invalid email or password'});
                            }
                        })
                        .catch(error => next(error));
                }
            })
            .catch(error => next(error));
    }));
    passport.use('fb-auth', new FBStrategy({
        clientID: FB_CLIENT_ID,
        clientSecret: FB_CLIENT_SECRET,
        callbackURL: FB_CB_URL,
        profileFields: ['id', 'emails', 'photos', 'name']
    }, authenticateOAuthUser));

    passport.use('google-auth', new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CB_URL
    }, authenticateOAuthUser));
};

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.redirect('/login');
    }
};

module.exports.checkRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(401);
            res.redirect('/login');
         } else if (req.user.role === role) {
                next();
            } else {
                 res.status(403);
                 res.render('error', {
                     message: 'Forbidden',
                     error: {}
                 });
            }
    };
};



function authenticateOAuthUser(accessToken, refreshToken, profile, next) {
    let provider;
    let email;
    let name;
    let picture;
    if (profile.provider === FB_PROVIDER) {
        provider = 'facebookId';
        email = profile.emails[0].value;
        name = profile.name.familyName;
        picture = profile.photos[0].value;
    } else if (profile.provider === GOOGLE_PROVIDER) {
        provider = 'googleId';
        email = profile.emails[0].value;
        name = profile.displayName;
        picture = profile.photos[0].value;
    } else {
        next();
    }

    User.findOne({[`social.${provider}`]: profile.id})
        .then(user => {
            if (user) {
                next(null, user);
            } else {
                user = new User({
                    username: name,
                    email: email,
                    picture: picture,
                    password: Math.random().toString(36).slice(-8), // FIXME: insecure, use secure random seed
                    social: {
                        [provider]: profile.id
                    },
                });

                user.save()
                    .then(() => {
                        next(null, user);
                    })
                    .catch(error => next(error));
            }
        })
        .catch(error => next(error));
}
