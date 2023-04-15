
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("categorias", [
          {
            id: 1,
            nombreCategoria: "Calzado",
            categoriaImagen: "shoes.png"
          },
          {
            id: 2,
            nombreCategoria: "Camisas/Blusas",
            categoriaImagen: "camisa.png"
          },
          {
            id: 3,
            nombreCategoria: "Faldas",
            categoriaImagen: "faldavint.png"
          },
          {
            id: 4,
            nombreCategoria: "Pantalones",
            categoriaImagen: "pantalon.png"
          },
          {
            id: 5,
            nombreCategoria: "Pilotos",
            categoriaImagen: "piloto.png"
          },
          {
            id: 6,
            nombreCategoria: "Sacos/Tapados",
            categoriaImagen: "sacopng.png"
          },
          {
            id: 7,
            nombreCategoria: "Shorts/Bermudas",
            categoriaImagen: "short_2.png"
          },
          {
            id: 8,
            nombreCategoria: "Sweaters",
            categoriaImagen: "sweater.png"
          },
          {
            id: 9,
            nombreCategoria: "Vestidos",
            categoriaImagen: "vestido.png"
          },
          {
            id: 10,
            nombreCategoria: "Accesorios",
            categoriaImagen: "accesorios.png"
          },
      ]);
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("categorias", null, {});
  },
};
