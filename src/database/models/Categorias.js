module.exports = function(sequelize, dataTypes){

    let alias = "Categorias" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {
            type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombreCategoria: {
            type: dataTypes.STRING(500),
            allownull: false,
        },
        categoriaImagen: {
            type: dataTypes.STRING(500),
            allownull: false,
        }
	}
	let config = {
		tableName: "categorias",
		timestamps: false
	}
	let Categorias = sequelize.define(alias,cols,config);

    Categorias.associate = function(models){
        Categorias.hasMany(models.Productos, { 
            as: "productos", 
            foreignKey: "categoriaID"
        });
    }

    return Categorias;
}