import { and, eq, inArray, SQL } from 'drizzle-orm';

import { ROLE } from '~/common/const/permission';
import { BaseUser, CreateUser, roles, UpdateUser, User, userRoles, users } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';

import { db } from '..';
import { UserRepository, userRepository } from './users.repository';

class CustomerRepository {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async customerWhere(whereClause?: SQL): Promise<SQL | undefined> {
    const clientRole = await db.query.roles.findFirst({
      where: eq(roles.name, ROLE.CUSTOMER),
    });

    if (!clientRole) throw new NotFoundException(`Role ${ROLE.CUSTOMER} not found`);
    const usersWithClientRole = await db.select({ userId: userRoles.userId }).from(userRoles).where(eq(userRoles.roleId, clientRole.id));
    const userIds = usersWithClientRole.map((u) => u.userId);
    return and(inArray(users.id, userIds), whereClause);
  }

  async find(whereClause?: SQL): Promise<User[]> {
    const clause = await this.customerWhere(whereClause);
    if (clause === undefined) throw new NotFoundException('Customer not found');
    const find = await this.userRepository.findMany(clause);
    if (find === undefined) throw new NotFoundException('Customer not found');
    return find;
  }

  async findById(id: number): Promise<User> {
    const clause = await this.customerWhere(eq(users.id, id));
    if (clause === undefined) throw new NotFoundException('Customer not found');
    const client = await this.userRepository.findFirst(clause);
    if (!client) throw new NotFoundException('Customer not found');
    return client;
  }

  async create(payload: CreateUser): Promise<BaseUser> {
    const clientRole = await db.query.roles.findFirst({
      where: eq(roles.name, ROLE.CUSTOMER),
    });
    if (!clientRole) throw new NotFoundException(`Role ${ROLE.CUSTOMER} not found`);
    return await this.userRepository.create({
      ...payload,
      roleId: clientRole.id,
    });
  }

  async update(id: number, payload: UpdateUser): Promise<BaseUser> {
    const clause = await this.customerWhere(eq(users.id, id));
    if (clause === undefined) throw new NotFoundException('Customer not found');
    return this.userRepository.update(clause, payload);
  }

  async delete(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}

export const customerRepository = new CustomerRepository(userRepository);
