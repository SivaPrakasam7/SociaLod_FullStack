const express = require('express'),
    route = require('./src/interfaces/routes/routes'),
    errorHandler = require('./src/interfaces/middleware/responseHandler'),
    connectMDB = require('./src/infrastructure/db/connection'),
    path = require('path'),
    cors = require('cors'),
    helmet = require('helmet'),
    app = express();

require('dotenv').config({ path: path.resolve(__dirname, './src/infrastructure/config/.env') });

const PORT = process.env.PORT || 5000,
    CorsOption = {
        origin: process.env.CURL
    };

connectMDB();

app.use(cors(CorsOption));

app.use(express.json());

app.get('/', (req, res) => {
    var params = ['bearer token required', '{"email":"","password":""}', '{"profile":"","name":"","email":"","mobileno":"","password":"","about":""}', 'bearer token required', '{"email":""}', '{"password":""}', 'bearer token required', 'bearer token required-{"profile":"","name":"","mobileno":"","about":""}', 'bearer token required', 'bearer token required-{"username":"","site":""}', 'bearer token required-{"username":"","site":""}', 'bearer token required', 'bearer token required-{"username":""}', 'bearer token required-{"userid":""}', 'bearer token required-{"username":"","site":""}']
    var info = `<h1>SociaLod Backend Manual</h1><table><tr><th>Paths</th><th>Methods</th><th>Parameters</th></tr>`;
    for (var i in route.stack) {
        info = info + `<tr><td>${route.stack[i].route.path}</td><td>${Object.keys(route.stack[i].route.methods)}</td><td>${params[i]}</td></tr>`;
    }
    info = info + "</table>";
    res.status(200).send(info);
});

app.use('/api', route);

app.use(errorHandler);

process.on("uncaughtException", (err) => {
    process.exit();
});

app.listen(PORT, () => {
    console.log(`Server listen at ${process.env.URL}`)
});