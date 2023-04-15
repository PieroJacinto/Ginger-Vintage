module.exports = function(sequelize, dataTypes){

    let alias = "ImagenesProducto" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {
            type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		imagen: {
            type: dataTypes.STRING,
            allownull: true,
        },
        productoID: {
            type:dataTypes.INTEGER,
            allownull: true,
        }
	}
	let config = {
		tableName: "imagenes_producto",
		timestamps: false
	}
	let ImagenesProducto = sequelize.define(alias,cols,config);

    ImagenesProducto.associate = function(models){
        ImagenesProducto.belongsTo(models.Productos, { 
            as: "productos", 
            foreignKey: "productoID"
        });
    }
	return ImagenesProducto;
}