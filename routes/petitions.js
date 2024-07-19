const jsonPromiseHandler = require('../lib/jsonPromiseHandler');
const { runQuery } = require('../lib/sql');

/**
 *
 * Get petitions
 *
 * Reads petitions entity and return the 3 most recently created petitions from the past week
 * @param {Object} app
 * @returns {Record<String, unknown>}
 */
async function getPetitions(app) {
    return runQuery(
        app.db,
        `SELECT * FROM
            petitions
        WHERE
            petitions.created_at BETWEEN DATE('now', 'weekday 0', '-15 days') AND DATE('now', 'weekday 0', '-7 days')
        ORDER BY
            created_at ASC
        LIMIT 3`
    );
}

/**
 * Get petitions for newsfeed
 *
 * Returns a list of petitions from starters that you follow ordered by most recently updated
 * @param {Object} app
 * @returns {Record<String, unknown>}
 */
async function getPetitionsNewsFeed(app, req) {
    const { id } = req.params;
    const result = [];

    const stmt = app.db.prepare(`
        SELECT petitions.* FROM
            follows
            INNER JOIN petitions ON follows.starter_urn = petitions.starter_urn
        WHERE
            follows.user_id = :user
        ORDER BY
            petitions.created_at DESC;
    `);

    stmt.bind({ ':user': id });

    while (stmt.step()) {
        const row = stmt.getAsObject();
        result.push(row);
    }

    return result;
}

module.exports = (app) => {
    app.get('/petitions', jsonPromiseHandler(getPetitions, app));
    app.get(
        '/petitions/:id/feed',
        jsonPromiseHandler(getPetitionsNewsFeed, app)
    );
};
