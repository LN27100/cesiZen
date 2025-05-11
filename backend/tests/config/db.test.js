const path = require('path');
const originalEnv = process.env;

describe('db.js', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    process.env = { ...originalEnv }; // Remet à zéro les variables d'environnement
  });

  it('should connect to the database successfully (not in test env)', () => {
    process.env.NODE_ENV = 'development'; // Simule un environnement autre que "test"
    process.env.DB_HOST = 'localhost';
    process.env.DB_USER = 'root';
    process.env.DB_PASSWORD = 'password';
    process.env.DB_NAME = 'test_db';

    const mockConnect = jest.fn((cb) => cb(null));
    const mockCreateConnection = jest.fn(() => ({ connect: mockConnect }));

    jest.doMock('mysql', () => ({
      createConnection: mockCreateConnection,
    }));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    require(path.resolve(__dirname, '../../config/db'));

    expect(mockCreateConnection).toHaveBeenCalledWith({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'test_db',
    });
    expect(mockConnect).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Connected to database');

    consoleSpy.mockRestore();
  });

  it('should not connect when NODE_ENV is "test"', () => {
    process.env.NODE_ENV = 'test';

    const mockConnect = jest.fn((cb) => cb(null));
    const mockCreateConnection = jest.fn(() => ({ connect: mockConnect }));

    jest.doMock('mysql', () => ({
      createConnection: mockCreateConnection,
    }));

    require(path.resolve(__dirname, '../../config/db'));

    expect(mockCreateConnection).toHaveBeenCalled();
    expect(mockConnect).not.toHaveBeenCalled();
  });

  it('should throw an error if connection fails (not in test env)', () => {
    process.env.NODE_ENV = 'production';

    const mockConnect = jest.fn((cb) => cb(new Error('Connection failed')));
    const mockCreateConnection = jest.fn(() => ({ connect: mockConnect }));

    jest.doMock('mysql', () => ({
      createConnection: mockCreateConnection,
    }));

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    expect(() => {
      require(path.resolve(__dirname, '../../config/db'));
    }).toThrow('Connection failed');

    consoleSpy.mockRestore();
  });
});
