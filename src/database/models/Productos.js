module.exports = (sequelize, DataTypes) => {
    const alias = "Productos";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
    };
    const config = {
        tableName: "productos",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    };

    const Productos = sequelize.define(alias, cols, config);

    Productos.associate = (models) => {
        Productos.hasMany(models.ImagenesProducto, {
            as: "imagenes",
            foreignKey: "productoID",
        }); 
    };
    return Productos;
};