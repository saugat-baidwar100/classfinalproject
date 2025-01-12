import { Prisma } from '@prisma/client';
import { db } from './client';

export const userRepo = {
  create,
  updateById,
  updateByEmail,
  findById,
  findByEmail,
  findByUsername,
  updateByUsername,
  deleteUserById,
  findAll
};

// User creation
async function create(input: Prisma.UserCreateInput) {
  return db.user.create({
    data: input,
  });
}

// Update user by ID with role check (admin only)
async function updateById(id: string, input: Prisma.UserUpdateInput, role: string) {
  if (role !== 'admin') {
    throw new Error('Permission Denied: Admin role required');
  }
  return db.user.update({
    where: {
      id,
    },
    data: input,
  });
}

// Update user by email with role check (admin only)
async function updateByEmail(email: string, input: Prisma.UserUpdateInput, role: string) {
  if (role !== 'admin') {
    throw new Error('Permission Denied: Admin role required');
  }
  return db.user.update({
    where: {
      email,
    },
    data: input,
  });
}

// Find user by ID
async function findById(id: string) {
  return db.user.findUnique({
    where: {
      id,
    },
  });
}

// Find user by email
async function findByEmail(email: string) {
  return db.user.findUnique({
    where: {
      email,
    },
  });
}

// Find user by username
async function findByUsername(username: string) {
  return db.user.findUnique({
    where: {
      username,
    },
  });
}

// Update user by username with role check (admin only)
async function updateByUsername(
  username: string,
  input: Prisma.UserUpdateInput,
  role: string
) {
  if (role !== 'admin') {
    throw new Error('Permission Denied: Admin role required');
  }
  return db.user.update({
    where: {
      username,
    },
    data: input,
  });
}

// Delete user by ID with role check (admin only)
async function deleteUserById(id: string, role: string) {
  if (role !== 'admin') {
    throw new Error('Permission Denied: Admin role required');
  }
  return db.user.delete({
    where: {
      id,
    },
  });
}
async function findAll(input:Prisma.UserWhereUniqueInput) {
  return db.user.findMany({
    where:input,
  });
}