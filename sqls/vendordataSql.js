const { database, username, password, host } = require(__dirname + '/../config/dbConfig');
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  database,
  username,
  password,
  host,
  dialect: 'mariadb',
  define: {
    freezeTableName: true
  }
});

sequelize.sync()

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

class VendordataSql extends Sequelize.Model { }

VendordataSql.init({
  vendorAccount: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  vendorPassword: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  vendorName: {
    type: Sequelize.STRING(50)
  },
  vendorEmail: {
    type: Sequelize.STRING(100)
  },
  vendorPhone: {
    type: Sequelize.STRING(100)
  },
  vendorZone: {
    type: Sequelize.STRING(10)
  },
  vendorAddress: {
    type: Sequelize.STRING(100)
  },
  vendorImg: {
    type: Sequelize.STRING(300)
  },
  vendorAbout: {
    type: Sequelize.STRING(800)
  },
  vendorBanner: {
    type: Sequelize.STRING(300)
  }
},
  {
    sequelize,
    modelName: 'vendordata'
  })

module.exports = VendordataSql
