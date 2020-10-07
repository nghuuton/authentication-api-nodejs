const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
require("dotenv").config();

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),

            secretOrKey: process.env.SECRET,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.sub);
                if (!user) return done(null, false);
                done(null, user);
            } catch (error) {
                done(error, false);
            }
        }
    )
);

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            const result = user.comparePassword(password);
            if (!user) return done(null, false);
            if (!result) return done(null, false);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    })
);
