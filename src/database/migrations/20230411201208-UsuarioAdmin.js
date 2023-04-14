const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("usuario_admin", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      nombre: 
      { 
          type: DataTypes.STRING(500),
          allowNull:false,
      },
      email: {
          type: DataTypes.STRING(500),
          allowNull:false,
      },
      contraseña:{
          type: DataTypes.STRING(500),
          allowNull:false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("usuario_admin");
  }
};