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

    //TRAER CATEGPRIAS DE LA BASE DE DATOS

    const categorias = await Categorias.findAll()

    //TRAER PRODUCTOS DE LA BASE DE DATOS

    const productos = await Productos.findAll({
      limit: 12,
      include: [
        {association: 'imagenes'}
      ]
    })

    //TRAER PRODUCTOS(ULTIMOS RESCATES) DE LA BASE DE DATOS

    const productoUltimosRescates = await Productos.findAll({
      limit: 8,
      order: [['created_at', 'DESC']],
      include: [
        {association: 'imagenes'}
      ]
    })

    res.render("home", { instaData, productos, categorias, productoUltimosRescates });
  },

  productDetail: async (req, res) => {

    const idBuscado = req.params.id   
   
    const producto = await Productos.findAll({
      where: {
        id: idBuscado
      },
      include: [
        {association: 'imagenes'}
      ]
    })
    const imagenes = producto[0].imagenes
    // console.log(JSON.stringify(imagenes,null,4));

    res.render("productDetail", { producto, imagenes })
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
