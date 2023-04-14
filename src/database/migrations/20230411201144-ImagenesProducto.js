const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("imagenes_producto", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },imagen: {
        type: DataTypes.STRING,
        allownull: true,
    },
    productoID: {
      type: DataTypes.INTEGER,
      references: {
          model: {
              tableName: "productos",
          },
          key: "id",
      },
      allowNull: false,
    }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("imagenes_producto");
  }
};