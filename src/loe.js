// The name of the sessionStorage item.
const sessionKey = 'cachedData';
// Get stored items
const sessionItems = sessionStorage.getItem(sessionKey);
// Parse the stringified items if it exists else create a empty object
let cachedItems = sessionItems ? JSON.parse(sessionItems) : {};

const handler = {
    // This trap (function) will be run each time we are setting the property values
    set(target, key, value) {

        // Add the new item to our cached array
        cachedItems[key] = value;

        // And parse it and add it to sessionStorage
        sessionStorage.setItem(sessionKey, JSON.stringify(cachedItems));
        return true;
    }
}

// Create a new proxy with our cachedItems and our handler object with the set functiton only
let cache = new Proxy(cachedItems, handler);


//Where we do our api calls we can use it like this:

const url = '/api/some_url';

// If the requested api path have already been requested and stored in our object
if (cache[url]) {
    doSomethingWithResponse(cache[url]);
}
// Else fetch the data from the api and add it to our object
else {
    fetch(url).then((response) => {
        cache[url] = response;
        doSomethingWithResponse(response);
    });
}




// function cache(fn) {
//     var cacheData = new Map();
//     fn = new Proxy(fn, {
//         apply: function(target, thisArg, argumentsList) {
//             var args = argumentsList.toString();
//             if (cacheData.has(args)) {
//                 return cacheData.get(args);
//             }
//             var ret = Reflect.apply(target, thisArg, argumentsList);
//             cacheData.set(args, ret);
//             return ret;
//         }
//     });
//     fn.clearCache = () => !cacheData.clear();
//     return fn;
// }