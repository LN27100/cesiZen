const mysql = require('mysql');

jest.mock('mysql', () => {
  return {
    createConnection: jest.fn(() => ({
      connect: jest.fn((callback) => callback(null)) // connexion OK
    }))
  };
});

describe('db.js', () => {
  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it('should connect to the database successfully', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    require('../../config/db'); // déclenche l'appel à connect

    expect(mysql.createConnection).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Connected to database');
  });

  it('should throw an error if connection fails', () => {
    jest.resetModules(); // important pour recharger mysql mock différemment

    jest.doMock('mysql', () => {
      return {
        createConnection: jest.fn(() => ({
          connect: jest.fn((callback) => callback(new Error('Connection failed')))
        }))
      };
    });

    expect(() => require('../../config/db')).toThrow('Connection failed');
  });
});
