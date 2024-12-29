const request = require('supertest');
const app = require('../server');

describe('User API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                nom: 'John Doe',
                email: 'john@example.com',
                mot_de_passe: 'password',
                role: 'utilisateur'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Utilisateur créé');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                email: 'john@example.com',
                mot_de_passe: 'password'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
