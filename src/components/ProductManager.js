import {promises as fs} from "fs"


export default class ProductManager {
    constructor() {
        this.patch = "./productos.txt"
        this.products = []
    }

    static id = 0
 
    addProduct = async (title, description, precio, imagen, code, stock) => {

        ProductManager.id++

        let newProduct = {
            title,
            description,
            precio,
            imagen,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(newProduct)

        await fs.writeFile(this.patch, JSON.stringify(this.products))
    };

    readProducts = async () => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProduct = async () => {
        let respuesta2 = await this.readProducts()
        return console.log(respuesta2)
    }

    getProductById = async (id) => {
        let respuesta3 = await this.readProducts()
        if(!respuesta3.find(product => product.id === id)) {
            console.log("Producto no encontrado"); 
        } else {
            console.log(respuesta3.find(product => product.id === id));
        }
    }

    deleteProductsById = async (id) => {
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))
        console.log("Producto eliminado");
    }

    updateProducts = async ({id, ...producto}) => {
        await this.deleteProductsById(id);
        let productOld = await this.readProducts();
        let productsModif = [{...producto, id},... productOld]
        await fs.writeFile(this.patch, JSON.stringify(productsModif))
    }
}


//const productos = new ProductManager

// productos.addProduct("Titulo1", "Descripcion1", 1000, "Imagen1", "abc123", 5)
// productos.addProduct("Titulo2", "Descripcion2", 1000, "Imagen2", "abc123", 10)
// productos.addProduct("Titulo3", "Descripcion3", 1000, "Imagen3", "abc123", 15)
// productos.addProduct("Titulo4", "Descripcion4", 1000, "Imagen4", "abc123", 20)
// productos.addProduct("Titulo5", "Descripcion5", 1000, "Imagen5", "abc123", 30)
// productos.addProduct("Titulo6", "Descripcion6", 1000, "Imagen6", "abc123", 60)
// productos.addProduct("Titulo7", "Descripcion7", 1000, "Imagen7", "abc123", 5)
// productos.addProduct("Titulo8", "Descripcion8", 1000, "Imagen8", "abc123", 30)
// productos.addProduct("Titulo9", "Descripcion9", 1000, "Imagen9", "abc123", 15)
// productos.addProduct("Titulo10", "Descripcion10", 1000, "Imagen10", "abc123", 25)



//productos.getProduct()
//productos.getProductById(1)
//productos.deleteProductsById(2)

// productos.updateProducts ({
//     title: 'Titulo1',
//     description: 'Descripcion1',
//     precio: 4500,
//     imagen: 'Imagen1',
//     code: 'abc123',
//     stock: 5,
//     id: 1
// })



