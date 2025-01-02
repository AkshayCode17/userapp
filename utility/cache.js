const nodeCache = require("node-cache");

const cache = new nodeCache({ stdTTL: 100, checkperiod: 120 });

const checkCache = (req, res, next) => {
    const key = req.originalUrl;
    const cachedData = cache.get(key);

    if (cachedData) {
        return res.status(200).json(cachedData);
    }
    next();
}

const setCache = (key, value, ttl = 100) => {
    cache.set(key, value, ttl);
};

module.exports = {checkCache,setCache};