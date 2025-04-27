const mysql = require('mysql');
require('dotenv').config();

jest.mock('mysql', () => {
  return {
    createConnection: jest.fn(() => ({
      connect: jest.fn((callback) => callback(null))
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

    require('../../config/db');

    expect(mysql.createConnection).toHaveBeenCalledWith({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    expect(consoleSpy).toHaveBeenCalledWith('Connected to database');
  });

  it('should throw an error if connection fails', () => {
    jest.resetModules();

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
