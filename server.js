const app = require('./app');
const config = require('./config.json');
const { getConnection } = require('./lib/sql');

app.use((err, req, res, next) => {
    console.error(err.stack);
});

app.listen(config.port, async () => {
    app.db = await getConnection(`${__dirname}/db/node_api_exercise.sqlite`);
    console.log(`node_api_exercise app listening on port ${config.port}`);
});
