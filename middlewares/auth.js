const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../users/model');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_PRIVATE_KEY;

module.exports = passport => {
    passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
        User.findById(jwt_payload._id)
            .then(user=>{
                return done(null,user);
            });
        
    })
  );
}
