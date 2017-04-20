let blacklist = require('react-native/packager/blacklist');
let config = {
    getBlacklistRE(platform) {
        return blacklist(platform, [
            // Ignore IntelliJ directories
            /.*\.idea\/.*/,
            // ignore git directories
            /.*\.git\/.*/,
            // Ignore android directories
            /.*\/app\/build\/.*/,

            // Add more regexes here for paths which should be blacklisted from the packager.
        ]);
    }
};
module.exports = config;