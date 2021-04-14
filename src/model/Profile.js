const Database = require('../db/config');

module.exports = {
   async get() {
      const db = await Database();

      const data = await db.get(`SELECT * FROM profile`);

      await db.close();

      return {
         id: data.id,
         name: data.name,
         lastname: data.lastname,
         username: data.username,
         password: data.password,
         avatar: data.avatar,
         'monthly-budget': data.monthly_budget,
         'hours-per-day': data.hours_per_day,
         'days-per-week': data.days_per_week,
         'vacation-per-year': data.vacation_per_year,
         'value-hour': data.value_hour,
      };
   },
   async update(newData) {
      const db = await Database();

      await db.run(`UPDATE profile SET
         name = "${newData.name}",
         lastname = "${newData.lastname}",
		 username= "${newData.username}",
		 password= "${newData.password}",
         avatar = "${newData.avatar}",
         monthly_budget = ${newData['monthly-budget']},
         hours_per_day = ${newData['hours-per-day']},
         days_per_week = ${newData['days-per-week']},
         vacation_per_year = ${newData['vacation-per-year']},
         value_hour = ${newData['value-hour']}
      `);

      await db.close();
   },
};
