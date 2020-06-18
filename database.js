var sequelize = require('sequelize'); 
var db = new sequelize({
    database: "ironspider",
    username: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: false
    },
    define: {
        freezeTableName: true
    }
})
db.authenticate()
.then(() => console.log("Success"))
.catch((err)=> console.log(err.message))

var timeline = db.define('timeline', {
    content: sequelize.STRING,
    timestamp: sequelize.STRING,
    image: sequelize.STRING
})

db.sync();
var today = new Date();

function add(content, timestamp, image){
    timeline.create({
        content: content,
        timestamp: timestamp,
        image: image
    })
}


module.exports = add;