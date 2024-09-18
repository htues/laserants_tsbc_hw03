import request from 'supertest';
import { StartBackend } from '../../../src/besetup';
import * as roleService from '../../../src/api/services/roleService';

jest.mock('../../../src/api/services/roleService');

let app: any;
let server: any;

beforeAll(async () => {
  const backend = await StartBackend();
  //app = backend.app;
  //server = backend.server;
});

afterAll((done) => {
  server.close(done);
});

describe('GET /roles/roles', () => {
  it('should return a list of roles', async () => {
    const mockRoles = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' },
    ];
    
    (roleService.getRoles as jest.Mock).mockResolvedValue(mockRoles);

    const response = await request(app).get('/roles/roles');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRoles);
  });

  it('should handle errors', async () => {
    (roleService.getRoles as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/roles/roles');
    expect(response.status).toBe(500);
    expect(response.text).toBe('An unexpected error occurred');
  });
});

describe('GET /roles/role/:id', () => {
  it('should return a role by id', async () => {
    const mockRole = { id: 1, name: 'Admin' };
    
    (roleService.getRoleById as jest.Mock).mockResolvedValue(mockRole);

    const response = await request(app).get('/roles/role/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockRole);
  });

  it('should handle errors', async () => {
    (roleService.getRoleById as jest.Mock).mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/roles/role/1');
    expect(response.status).toBe(500);
    expect(response.text).toBe('An unexpected error occurred');
  });
});