const User = require("./models/User.js");
const bcrypt = require("bcryptjs");
const passportLocal = require("passport-local");

const localStrategy = passportLocal.Strategy;

const passportStrategy = (passport) => {
  passport.use(
    new localStrategy(
      { usernameField: "uname", passwordField: "pword" },
      async (username, password, done) => {
        // console.log("x", "y", username, password)
        // console.log("hi")
        // try {
        //   await User.findOne({email_id: "bt20cse019@iiitn.ac.in"}, (err, user)=>{
        //     console.log(user)
        //   }).clone()
        // } catch (error) {
        //   console.log(error)
        // }
        console.log(username, password, "username and password");
        try {
          await User.findOne({ email_id: username }, (err, user) => {
            if (err) throw err;
            if (!user) return done(null, false);
            if (password === user.password) {
              console.log("yes");
              return done(null, user);
            } else {
              // console.log("no")
              return done(null, false);
            }
          }).clone();
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  // save userid in session cookie
  passport.serializeUser((user, done) => {
    // console.log("serialze func", user)
    done(null, user.id);
  });

  // retrieve the whole object stored in session
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};

module.exports = passportStrategy;
