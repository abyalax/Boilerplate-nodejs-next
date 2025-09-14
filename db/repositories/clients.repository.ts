import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '~/db';

class ClientRepository {
  async findById() {}

  async create() {}

  async update() {}

  async delete(id: number): Promise<boolean> {
    const deleted = await db.delete(users).where(eq(users.id, id));
    return deleted.rowCount !== null;
  }
}

export const clientRepository = new ClientRepository();
