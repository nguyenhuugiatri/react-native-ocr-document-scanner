const db = require('../utils/db');

module.exports = {
  all: () => db.load('select * from user'),
  single: id => db.load(`select * from user where f_ID = ${id}`),
  add: entity => db.add('user', entity),
  del: id => db.del('user', {id}),
  singleByUsernameOrUsername: async (username, email) => {
    const rows = await db.load(
      `select * from user where username = '${username}' or email = '${email}'`,
    );
    if (rows.length === 0) return null;
    return rows[0];
  },
};
