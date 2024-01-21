const sqlite3 = require("sqlite3").verbose();

const createTableArticulos = `CREATE TABLE IF NOT EXISTS articulos (
  id          INTEGER PRIMARY KEY,
  nombre      TEXT NOT NULL,
  descripcion TEXT,
  precio      DECIMAL(10,2),
  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`

const createTableProveedores = `CREATE TABLE IF NOT EXISTS proveedores (
  id          INTEGER PRIMARY KEY,
  nombre      TEXT NOT NULL,
  telefono    CHAR(9) NOT NULL
  );`

// Connecting to or creating a new SQLite database file
const db = new sqlite3.Database(
  "./db.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => { if (err) return console.error(err.message); console.log("Connected to the SQlite database."); }
);

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items of table if it doesn't exist
  db.run(createTableArticulos,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");

      // Clear the existing data in the products table
      db.run(`DELETE FROM articulos`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from items");

        // Insert new data into the products table
        const values1 = ["Teclado", "Mi teclado favorito", 22.01];
        const values2 = ["Monitor", "Monitor de 17 pulgadas", 99.99];

        const insertSqlA = `INSERT INTO articulos(nombre, descripcion, precio) VALUES(?, ?, ?)`;

        db.run(insertSqlA, values1, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted at articulos, ID ${id}`);
        });

        db.run(insertSqlA, values2, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted at articulos, ID ${id}`);
        });
      });


    });

  db.run(createTableProveedores,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created people table.");
      // Clear the existing data in the proveedores table
      db.run(`DELETE FROM proveedores`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from proveedores");

        // Insert new data into the proveedores table
        const values3 = ["Juan García Domínguez", "987654321"];
        const values4 = ["Laura Sánchez Salido", "654321987"];

        const insertSqlP = `INSERT INTO proveedores(nombre, telefono) VALUES(?, ?)`;

        db.run(insertSqlP, values3, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted at proveedores, ID ${id}`);
        });

        db.run(insertSqlP, values4, function (err) {
          if (err) {
            return console.error(err.message);
          }
          const id = this.lastID; // get the id of the last inserted row
          console.log(`Rows inserted at proveedores, ID ${id}`);
        });

        //   Close the database connection after all insertions are done
        db.close((err) => {
          if (err) { return console.error(err.message); }
          console.log("Closed the database connection.");
        });
      });
    });
});