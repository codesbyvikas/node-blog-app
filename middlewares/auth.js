const { validateToken } = require("../services/auth");

function checkForAuthCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next(); // no token, skip auth
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // attach to req object
        } catch (error) {
            // Optional: log the error or handle invalid token
            console.error("Invalid token:", error.message);
        }

        next();
    };
}

module.exports = checkForAuthCookie;
