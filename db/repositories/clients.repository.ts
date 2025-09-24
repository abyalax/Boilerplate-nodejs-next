import { and, eq, inArray, SQL } from 'drizzle-orm';
import { ROLE } from '~/common/const/permission';
import { BaseUser, CreateUser, roles, UpdateUser, User, userRoles, users } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';
import { db } from '..';
import { UserRepository, userRepository } from './users.repository';

class ClientRepository {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async clientWhere(whereClause?: SQL): Promise<SQL | undefined> {
    const clientRole = await db.query.roles.findFirst({
      where: eq(roles.name, ROLE.CLIENT),
    });

    if (!clientRole) throw new NotFoundException(`Role ${ROLE.CLIENT} not found`);
    const usersWithClientRole = await db.select({ userId: userRoles.userId }).from(userRoles).where(eq(userRoles.roleId, clientRole.id));
    const userIds = usersWithClientRole.map((u) => u.userId);
    return and(inArray(users.id, userIds), whereClause);
  }

  async findMany(whereClause?: SQL): Promise<User[]> {
    const clause = await this.clientWhere(whereClause);
    if (clause === undefined) throw new NotFoundException('Client not found');
    const find = await this.userRepository.findMany(clause);
    if (find === undefined) throw new NotFoundException('Client not found');
    return find;
  }

  async findById(id: number): Promise<User> {
    const clause = await this.clientWhere(eq(users.id, id));
    if (clause === undefined) throw new NotFoundException('Client not found');
    const client = await this.userRepository.findFirst(clause);
    if (!client) throw new NotFoundException('Client not found');
    return client;
  }

  async create(payload: CreateUser): Promise<BaseUser> {
    const clientRole = await db.query.roles.findFirst({
      where: eq(roles.name, ROLE.CLIENT),
    });
    if (!clientRole) throw new NotFoundException(`Role ${ROLE.CLIENT} not found`);

    return await this.userRepository.create({
      ...payload,
      roleId: clientRole.id,
    });
  }

  async update(id: number, payload: UpdateUser): Promise<BaseUser> {
    const clause = await this.clientWhere(eq(users.id, id));
    if (clause === undefined) throw new NotFoundException('Client not found');
    return this.userRepository.update(clause, payload);
  }

  async delete(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}

export const clientRepository = new ClientRepository(userRepository);
