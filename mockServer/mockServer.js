const express = require('express');
// const path = require('path');

const app = express();
const port = 3000;

const bodyParser = require('body-parser')

const Login = require('./stub/brand1/Login/default.json')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send({ MockServer: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

app.get('/login', (req, res) => {
    res.json(Login)
});

// NBS routes base path
// app.use('/nbs/self-service/api', nbsRoutes);
// app.use('/ybs/self-service/api', ybsRoutes);


// app.use(express.static(`${__dirname}/public`));
// app.use('/scripts', express.static(`${__dirname}/node_modules`));
// app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/index.html`)));
app.listen(port, () => console.log(`mock server listening on port ${port}! ${new Date()} 
                        .-"""-.
                       / .===. \\
                       \\/ 6 6 \\/
                       ( \\___/ )
  _________________ooo__\\_____/_____________________
 /                                                  \\
|   This is a Mock Server at http://localhost:3000   |
|                  open in chrome                    |
|          use this update mocks runtime             |
|           restart it to reset mocks                |
 \\______________________________ooo_________________/
                       |  |  |
                       |_ | _|
                       |  |  |
                       |__|__|
                       /-'Y'-\\
                      (__/ \\__)`));