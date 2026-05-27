const ProductService = require('../src/productService');

describe('ProductService', () => {

  let repository;
  let service;

  beforeEach(() => {

    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      save: jest.fn()
    };

    service = new ProductService(repository);

  });

  describe('getById()', () => {

    it('devuelve el producto encontrado', async () => {

      const product = {
        id: 1,
        name: 'Laptop'
      };

      repository.findById.mockResolvedValue(product);

      const result = await service.getById(1);

      expect(result).toEqual(product);
      expect(repository.findById).toHaveBeenCalledWith(1);

    });

    it('lanza error si el producto no existe', async () => {

      repository.findById.mockResolvedValue(null);

      await expect(
        service.getById(99)
      ).rejects.toThrow(Error);

    });

  });

  describe('getByCategory()', () => {

    it('devuelve productos de la categoría indicada', async () => {

      repository.findAll.mockResolvedValue([
        { name: 'Laptop', category: 'Tecnología' },
        { name: 'Mouse', category: 'Tecnología' },
        { name: 'Camisa', category: 'Ropa' }
      ]);

      const result = await service.getByCategory('Tecnología');

      expect(result.length).toBe(2);

    });

    it('devuelve array vacío si no hay productos', async () => {

      repository.findAll.mockResolvedValue([]);

      const result = await service.getByCategory('Comida');

      expect(result).toEqual([]);

    });

  });

  describe('searchByName()', () => {

    it('encuentra productos por nombre', async () => {

      repository.findAll.mockResolvedValue([
        { name: 'Laptop Gamer' },
        { name: 'Mouse Gamer' },
        { name: 'Teclado' }
      ]);

      const result = await service.searchByName('Gamer');

      expect(result.length).toBe(2);

    });

    it('la búsqueda es case-insensitive', async () => {

      repository.findAll.mockResolvedValue([
        { name: 'Laptop Gamer' }
      ]);

      const result = await service.searchByName('laptop');

      expect(result.length).toBe(1);

    });

    it('lanza error si query está vacío', async () => {

      await expect(
        service.searchByName('')
      ).rejects.toThrow(Error);

    });

  });

  describe('create()', () => {

    it('guarda un producto válido', async () => {

      const product = {
        name: 'Monitor',
        price: 500
      };

      repository.save.mockResolvedValue(product);

      const result = await service.create(product);

      expect(result).toEqual(product);

      expect(repository.save)
        .toHaveBeenCalledTimes(1);

      expect(repository.save)
        .toHaveBeenCalledWith(product);

    });

    it('lanza error si el precio es negativo', async () => {

      await expect(
        service.create({
          name: 'Mouse',
          price: -10
        })
      ).rejects.toThrow(Error);

    });

    it('lanza error si falta el nombre', async () => {

      await expect(
        service.create({
          price: 100
        })
      ).rejects.toThrow(Error);

    });

  });

});
