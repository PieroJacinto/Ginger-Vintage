module.exports = function(sequelize, dataTypes){

    let alias = "UsuarioAdmin" //Como sequelize llama a nuestra tabla
	let cols = {
		id: {
            type:dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nombre: {
            type:dataTypes.STRING(500),
            allowNull:false,
        },
        email: {
            type: dataTypes.STRING(500),
            allowNull:false,
        },
        contraseña:{
            type:dataTypes.STRING(500),
            allowNull:false,
        },
	}
	let config = {
		tableName: "usuario_admin",
		timestamps: true
	}

    const UsuarioAdmin = sequelize.define(alias, cols, config);

    return UsuarioAdmin
}