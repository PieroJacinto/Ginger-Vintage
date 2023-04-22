// FETCH INSTAGRAM
const fetch = require("node-fetch");
const token = process.env.IG_ACCESS_TOKEN;
const url = `https://graph.instagram.com/me/media?fields=thumbnail_url,media_url,caption,permalink&limit=50&access_token=${token}`;

//SEQUELIZE
const { Categorias } = require("../database/models");
const { ImagenesProducto } = require("../database/models");
const { Productos } = require("../database/models");
const { UsuarioAdmin } = require("../database/models");
const { Op } = require("sequelize");

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
    
    res.render("productDetail", { producto, imagenes })
  },

  categoryList: async (req, res) => {

    const limite = 12
    const filtros =[]
    //BUSCO NUMERO DE PAGINA
    const pagina = (Number.parseInt(req.params.pagina) - 1)
    const paginaActual = Number.parseInt(req.params.pagina);
    const categoriaId = await req.params.categoriaId
    const productosBuscados = await Productos.findAndCountAll({
      where: {
        categoriaID: categoriaId
      },
      include: [
        {association: 'imagenes'}
      ],
       limit: limite,
       offset: pagina != 1? (limite * pagina): 1
    })
    const productos = productosBuscados.rows

    // REDONDEO NUMERO DE PAGINAS PARA ARRIBA
    const cantidadPaginas = Math.ceil(Number.parseInt(productosBuscados.count)/12)

    res.render('categoryList2', { productos, cantidadPaginas, categoriaId, paginaActual, filtros })
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
      talle: productoNuevo.talle,
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

  filterProduct: async (req, res) => {

    //DATOS PARA RENDERIZACION 
    const limite = 12
    //BUSCO NUMERO DE PAGINA
    const pagina = (Number.parseInt(req.params.pagina) - 1)
    const paginaActual = Number.parseInt(req.params.pagina);
    const categoriaId = await req.params.categoriaId

    const filtros = await req.body;
    const tallesBuscados = filtros.talle

    if (tallesBuscados) {
      const productosFiltrados = await Productos.findAndCountAll({
        where:{
          categoriaID: categoriaId,
            precio: {
              [Op.and]: [{[Op.gte]: filtros.precioMinimo},{[Op.lte]: filtros.precioMaximo}]
          },
          talle: {
             [Op.in]:[tallesBuscados],  
          }
        },
        include: [
          {association: 'imagenes'}
        ],
        limit: limite,
        offset: pagina != 1? (limite * pagina): 1
      })

      const productos = productosFiltrados.rows
      // REDONDEO NUMERO DE PAGINAS PARA ARRIBA
      const cantidadPaginas = Math.ceil(Number.parseInt(productosFiltrados.count)/12)

      res.render('categoryList2', { productos, cantidadPaginas, categoriaId, paginaActual, filtros})

    } else {
      const productosFiltrados = await Productos.findAndCountAll({
        where:{
          categoriaID: categoriaId,
            precio: {
              [Op.and]: [{[Op.gte]: filtros.precioMinimo},{[Op.lte]: filtros.precioMaximo}]
          }
        },
        include: [
          {association: 'imagenes'}
        ],
        limit: limite,
        offset: pagina != 1? (limite * pagina): 1
      }) 

      const productos = productosFiltrados.rows
      // REDONDEO NUMERO DE PAGINAS PARA ARRIBA
      const cantidadPaginas = Math.ceil(Number.parseInt(productosFiltrados.count)/12)

      res.render('categoryList2', { productos, cantidadPaginas, categoriaId, paginaActual, filtros })
    }

  },
};
