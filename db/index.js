const db = {}

db.query = {
   selectColors: 'SELECT * FROM clients ORDER BY id ASC',

   selectAllClints: 'SELECT * FROM clients ORDER BY id ASC',

 
   // insertColor:`INSERT INTO colors (name) VALUES ('${req.body.name}')`
}





module.exports = db;