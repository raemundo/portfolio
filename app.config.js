const state = require("./src/config/index");
module.exports = {
    name: "ok",
    slug: "ok-instance",
    version: '0.0.1',
    // All values in extra will be passed to your app.
    ...state,
};
