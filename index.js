require('dotenv').config({path: `${__dirname}/.env`});
const fetch = require('node-fetch');
const {app} = require('deta');

function getQueryParams(params) {
    return Object.keys(params).reduce((prev, curr) => {
        if (prev.length === 1) {
            prev += `${curr}=${params[curr].toString()}`;
        } else {
            prev += `&${curr}=${params[curr].toString()}`;
        }

        return prev;
    }, "?");
}

class HTTPResponseError extends Error {
    constructor(response, ...args) {
        super(`HTTP Error Response: ${response.status} ${response.statusText}`, ...args);
        this.response = response;
    }
}

async function trigger() {
    const serverUrl = process.env.SERVER_URL;
    const params = {
        url: process.env.STATUS_PAGE_URL,
        cacheTTL: 1000, // always re-propagate the cache
    }

    try {
        const response = await fetch(`${serverUrl}${getQueryParams(params)}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            const data = await response.json();
            console.debug({msg: "cache busted"});

            return data;
        } else {
            throw new HTTPResponseError(response);
        }
    } catch (err) {
        console.error(err);
    }
}

function start(_event) {
    return trigger();
}

// https://docs.deta.sh/docs/micros/run#run-and-cron
app.lib.run(start);
app.lib.cron(start);

module.exports = app;