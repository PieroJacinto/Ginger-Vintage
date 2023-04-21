"use strict";
const { faker } = require("@faker-js/faker");
const db = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const productos = [];
    const productosImgs = [];
    const Categorias = await db.Categorias.findAll();
      
    const productosImgsArray = [
      "camisa.png",
      "faldavint.png",
      "pantalon.png",
      "piloto.png",
      "sacopng.png",
      "shoes.png",
      "short_2.png",
      "sweater.png",
      "tapado-ging.png",
      "vestido-ging.png",
      "vestido.png",      
    ];
    const tallesArray = [
      'XS',
      'S',
      'M',
      'L',
      'XL',
    ]    

    Array(500)
      .fill(0)
      .forEach((_, i) => {
        
        const randomCategoria = Categorias[Math.floor(Math.random() * Categorias.length)];        
        const randomProductosImg = productosImgsArray[Math.floor(Math.random() * productosImgsArray.length)];
        const randomTalle = tallesArray[Math.floor(Math.random() * tallesArray.length)]
        

        const randomProductos = {
          id: i + 1,
          titulo: faker.lorem.words(5),
          precio: faker.commerce.price(1000, 6000, 0),
          descripcion: faker.lorem.paragraphs(1),
          categoriaID: randomCategoria.id,
          talle: randomTalle,       
          medidas: faker.lorem.paragraphs(1),
          created_at: new Date(),
          updated_at: new Date(),
        };
        productos.push(randomProductos);
        productosImgs.push({  
          productoID: randomProductos.id,        
          imagen: randomProductosImg,         
        });
      });
    await queryInterface.bulkInsert("productos", productos);
    await queryInterface.bulkInsert("imagenes_producto",productosImgs );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("imagenes_producto", null, {});
    await queryInterface.bulkDelete("productos", null, {});
  },
};
