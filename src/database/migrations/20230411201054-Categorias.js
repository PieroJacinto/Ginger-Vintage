const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("categorias", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      nombreCategoria: {
        type: DataTypes.STRING(500),
        allownull: false,
      },
      categoriaImagen: {
        type: DataTypes.STRING(500),
        allownull: false,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("categorias");
  }
};
