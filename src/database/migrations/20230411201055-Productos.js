const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("productos", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
      },
      titulo: {
          type: DataTypes.STRING(500),
          allowNull: false,
      },
      precio: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      descripcion: {
          type: DataTypes.STRING(500),
          allowNull: false,
      },
      categoriaID: {
        type: DataTypes.INTEGER,
        references: {
            model: {
                tableName: "categorias",
            },
            key: "id",
        },
        allowNull: false,
      },
      talle: {
        type: DataTypes.STRING(5),
        allowNull: false,
      },
      medidas: {
          type: DataTypes.STRING(1000),
          allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("productos");
  }
};