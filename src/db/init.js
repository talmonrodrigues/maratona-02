const Database = require('./config');

// o await faz com o que o js aguarde a conclusão de uma transação
// para a próxima transação seja executada.

const initDb = {
   async init() {
      const db = await Database();

      await db.exec(`CREATE TABLE profile 
	  	(
		 	id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			lastname TEXT,
			avatar TEXT,
			monthly_budget INT,
			hours_per_day INT,
			days_per_week INT,
			vacation_per_year INT,
			value_hour INT
		)`);

      await db.exec(`CREATE TABLE jobs 
	  	(
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT,
			daily_hours INT,
			total_hours INT,
			created_at DATETIME
		)`);

      await db.run(`INSERT INTO profile 
	  	(
			name,
			lastname,
			avatar,
			monthly_budget,
			hours_per_day,
			days_per_week,
			vacation_per_year,
			value_hour
		) VALUES (
			"Talmon",
			"Rodrigues",
			"https://github.com/talmonrodrigues.png",
			3000,
			5,
			5,
			4,
			75
		)`);

      await db.run(`INSERT INTO jobs 
		(
			name,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"Pizzaria Guloso",
			2,
			1,
			1617849698165
		)`);

      await db.run(`INSERT INTO jobs
	  	(
			name,
			daily_hours,
			total_hours,
			created_at
		) VALUES (
			"OneTwo Project",
			3,
			47,
			1617849698165
		)`);

    //   await db.run(`UPDATE profile SET value_hour=75`); // atualizar dados de um campo

      await db.close();
   },
};

initDb.init();
