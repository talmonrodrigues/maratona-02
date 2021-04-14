const Database = require('./config');

const initDb = {
   async init() {
      const db = await Database();

      await db.exec(`CREATE TABLE profile
	  	(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, lastname TEXT, username TEXT, password TEXT, avatar TEXT, monthly_budget INT, hours_per_day INT, days_per_week INT, vacation_per_year INT, value_hour INT)`);

      await db.exec(`CREATE TABLE jobs 
	  	(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, daily_hours INT, total_hours INT, created_by INT, created_at DATETIME)`);

      await db.run(`INSERT INTO profile 
	  	(name, lastname, username, password, avatar, monthly_budget, hours_per_day, days_per_week, vacation_per_year, value_hour)
			VALUES ("Talmon", "Rodrigues", "admin", "admin", "https://github.com/talmonrodrigues.png", 8500, 5, 5, 4, 75)`);

      await db.run(`INSERT INTO jobs 
		(name, daily_hours, total_hours, created_by, created_at)
			VALUES ("Maratona 2.0", 4, 20, 1, 1617849698165)`);

      await db.close();
   },
};

initDb.init();
