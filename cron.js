var request = require('request');
var moment = require("moment");

var options = {
    url: 'https://vitally.co.nz',
    method: 'GET',
};

function call() {
    return new Promise((resolve, reject) => {
        options.url += `?ts=${moment().format('x')}`;
        request(options, (error, response, body) => {
            if (error) {
                console.trace(error);
                reject();
                return;
            }
            resolve(body);
        });
    });
}

async function init() {
    try {
        await call();
        init();
    } catch (e) {
        console.log(e);
    }
}

for (let i = 0; i<100; i++) {
    init();
}
