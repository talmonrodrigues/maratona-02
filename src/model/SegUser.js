const Database = require('../db/config');

module.exports = {
   async get() {
      const db = await Database();

      const data = await db.get(`SELECT * FROM seg_user`);

      await db.close();

      return {
         username: data.username,
         password: data.password,
      };
   },
};
