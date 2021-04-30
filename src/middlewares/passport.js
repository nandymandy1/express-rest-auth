import passport from "passport";
import { User } from "../models";
import { Strategy, ExtractJwt } from "passport-jwt";
import { SECRET as secretOrKey } from "../constants";

const opts = {
  secretOrKey,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
  new Strategy(opts, async ({ _id }, done) => {
    try {
      let user = await User.findById(_id);
      if (user) {
        return done(null, user.getUserInfo());
      }
      return done(null, false);
    } catch (err) {
      return done(null, false);
    }
  })
);
