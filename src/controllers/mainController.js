// FETCH INSTAGRAM
const fetch = require("node-fetch");
const token = process.env.IG_ACCESS_TOKEN;
const url = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&limit=50&access_token=${token}`;

//SEQUELIZE
const { Categorias } = require("../database/models");
const { ImagenesProducto } = require("../database/models");
const { Productos } = require("../database/models");
const { UsuarioAdmin } = require("../database/models");

module.exports = {
  home: async (req, res) => {
    let instaData;
    try {
      const instaFetch = await fetch(url);
      const instaJson = await instaFetch.json();
      instaData = instaJson.data;
    } catch (error) {
       console.log("Error en el servicio de Instagram: " + error);
      instaData = null;
    }

    //TRAER PRODUCTOS DE LA BASE DE DATOS

    const productos = 


    res.render("home", { instaData });
  },

  productDetail: async (req, res) => {
    res.render("productDetail");
  },

  categoryList: async (req, res) => {
    res.render("categoryList");
  },

  newProduct: async (req, res) => {
    const categorias = await Categorias.findAll();

    res.render("newProductForm", { categorias });
  },

  chargeProduct: async (req, res) => {
    const productoNuevo = await req.body;
    const productoACrear = await Productos.create({
      titulo: productoNuevo.titulo,
      precio: productoNuevo.precio,
      descripcion: productoNuevo.descripcion,
      categoriaID: productoNuevo.categoria,
      medidas: productoNuevo.medidas,
    });
    if (req.files) {
      for (let i = 0; i < req.files.length; i++) {
        const imagenProductoACrear = await ImagenesProducto.create({
          imagen: req.files ? req.files[i].filename : "",
          productoID: productoACrear.id,
        });
      }
    }
    res.send(productoNuevo);
  },
};
