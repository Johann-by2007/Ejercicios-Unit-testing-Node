class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async getById(id) {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Producto no encontrado.');
    }

    return product;
  }

  async getByCategory(category) {
    const products = await this.productRepository.findAll();

    return products.filter(
      product => product.category === category
    );
  }

  async searchByName(query) {
    if (!query || query.trim() === '') {
      throw new Error('La búsqueda no puede estar vacía.');
    }

    const products = await this.productRepository.findAll();

    return products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async create(productData) {
    if (
      !productData.name ||
      productData.price === undefined ||
      productData.price <= 0
    ) {
      throw new Error('Datos del producto inválidos.');
    }

    return await this.productRepository.save(productData);
  }
}

module.exports = ProductService;