import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    roles: <T = Role[]>(args: { where?: RoleWhereInput, orderBy?: RoleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    files: <T = File[]>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    role: <T = Role | null>(args: { where: RoleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    file: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    rolesConnection: <T = RoleConnection>(args: { where?: RoleWhereInput, orderBy?: RoleOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    filesConnection: <T = FileConnection>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createRole: <T = Role>(args: { data: RoleCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createFile: <T = File>(args: { data: FileCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateRole: <T = Role | null>(args: { data: RoleUpdateInput, where: RoleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateFile: <T = File | null>(args: { data: FileUpdateInput, where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteRole: <T = Role | null>(args: { where: RoleWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteFile: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertRole: <T = Role>(args: { where: RoleWhereUniqueInput, create: RoleCreateInput, update: RoleUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertFile: <T = File>(args: { where: FileWhereUniqueInput, create: FileCreateInput, update: FileUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyRoles: <T = BatchPayload>(args: { data: RoleUpdateInput, where?: RoleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyFiles: <T = BatchPayload>(args: { data: FileUpdateInput, where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyRoles: <T = BatchPayload>(args: { where?: RoleWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyFiles: <T = BatchPayload>(args: { where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    role: <T = RoleSubscriptionPayload | null>(args: { where?: RoleSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    file: <T = FileSubscriptionPayload | null>(args: { where?: FileSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  User: (where?: UserWhereInput) => Promise<boolean>
  Role: (where?: RoleWhereInput) => Promise<boolean>
  File: (where?: FileWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateFile {
  count: Int!
}

type AggregateRole {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

scalar DateTime

type File implements Node {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
  size: Int!
}

"""A connection to a list of items."""
type FileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
  size: Int!
}

"""An edge in a connection."""
type FileEdge {
  """The item at the end of the edge."""
  node: File!

  """A cursor for use in pagination."""
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  path_ASC
  path_DESC
  filename_ASC
  filename_DESC
  mimetype_ASC
  mimetype_DESC
  encoding_ASC
  encoding_DESC
  size_ASC
  size_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type FilePreviousValues {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
  size: Int!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [FileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FileWhereInput
}

input FileUpdateInput {
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

input FileWhereInput {
  """Logical AND on all given filters."""
  AND: [FileWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  path: String

  """All values that are not equal to given value."""
  path_not: String

  """All values that are contained in given list."""
  path_in: [String!]

  """All values that are not contained in given list."""
  path_not_in: [String!]

  """All values less than the given value."""
  path_lt: String

  """All values less than or equal the given value."""
  path_lte: String

  """All values greater than the given value."""
  path_gt: String

  """All values greater than or equal the given value."""
  path_gte: String

  """All values containing the given string."""
  path_contains: String

  """All values not containing the given string."""
  path_not_contains: String

  """All values starting with the given string."""
  path_starts_with: String

  """All values not starting with the given string."""
  path_not_starts_with: String

  """All values ending with the given string."""
  path_ends_with: String

  """All values not ending with the given string."""
  path_not_ends_with: String
  filename: String

  """All values that are not equal to given value."""
  filename_not: String

  """All values that are contained in given list."""
  filename_in: [String!]

  """All values that are not contained in given list."""
  filename_not_in: [String!]

  """All values less than the given value."""
  filename_lt: String

  """All values less than or equal the given value."""
  filename_lte: String

  """All values greater than the given value."""
  filename_gt: String

  """All values greater than or equal the given value."""
  filename_gte: String

  """All values containing the given string."""
  filename_contains: String

  """All values not containing the given string."""
  filename_not_contains: String

  """All values starting with the given string."""
  filename_starts_with: String

  """All values not starting with the given string."""
  filename_not_starts_with: String

  """All values ending with the given string."""
  filename_ends_with: String

  """All values not ending with the given string."""
  filename_not_ends_with: String
  mimetype: String

  """All values that are not equal to given value."""
  mimetype_not: String

  """All values that are contained in given list."""
  mimetype_in: [String!]

  """All values that are not contained in given list."""
  mimetype_not_in: [String!]

  """All values less than the given value."""
  mimetype_lt: String

  """All values less than or equal the given value."""
  mimetype_lte: String

  """All values greater than the given value."""
  mimetype_gt: String

  """All values greater than or equal the given value."""
  mimetype_gte: String

  """All values containing the given string."""
  mimetype_contains: String

  """All values not containing the given string."""
  mimetype_not_contains: String

  """All values starting with the given string."""
  mimetype_starts_with: String

  """All values not starting with the given string."""
  mimetype_not_starts_with: String

  """All values ending with the given string."""
  mimetype_ends_with: String

  """All values not ending with the given string."""
  mimetype_not_ends_with: String
  encoding: String

  """All values that are not equal to given value."""
  encoding_not: String

  """All values that are contained in given list."""
  encoding_in: [String!]

  """All values that are not contained in given list."""
  encoding_not_in: [String!]

  """All values less than the given value."""
  encoding_lt: String

  """All values less than or equal the given value."""
  encoding_lte: String

  """All values greater than the given value."""
  encoding_gt: String

  """All values greater than or equal the given value."""
  encoding_gte: String

  """All values containing the given string."""
  encoding_contains: String

  """All values not containing the given string."""
  encoding_not_contains: String

  """All values starting with the given string."""
  encoding_starts_with: String

  """All values not starting with the given string."""
  encoding_not_starts_with: String

  """All values ending with the given string."""
  encoding_ends_with: String

  """All values not ending with the given string."""
  encoding_not_ends_with: String
  size: Int

  """All values that are not equal to given value."""
  size_not: Int

  """All values that are contained in given list."""
  size_in: [Int!]

  """All values that are not contained in given list."""
  size_not_in: [Int!]

  """All values less than the given value."""
  size_lt: Int

  """All values less than or equal the given value."""
  size_lte: Int

  """All values greater than the given value."""
  size_gt: Int

  """All values greater than or equal the given value."""
  size_gte: Int
}

input FileWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createRole(data: RoleCreateInput!): Role!
  createFile(data: FileCreateInput!): File!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateRole(data: RoleUpdateInput!, where: RoleWhereUniqueInput!): Role
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  deleteUser(where: UserWhereUniqueInput!): User
  deleteRole(where: RoleWhereUniqueInput!): Role
  deleteFile(where: FileWhereUniqueInput!): File
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertRole(where: RoleWhereUniqueInput!, create: RoleCreateInput!, update: RoleUpdateInput!): Role!
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyRoles(data: RoleUpdateInput!, where: RoleWhereInput): BatchPayload!
  updateManyFiles(data: FileUpdateInput!, where: FileWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyRoles(where: RoleWhereInput): BatchPayload!
  deleteManyFiles(where: FileWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role]!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  user(where: UserWhereUniqueInput!): User
  role(where: RoleWhereUniqueInput!): Role
  file(where: FileWhereUniqueInput!): File
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  rolesConnection(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): RoleConnection!
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Role implements Node {
  id: ID!
  name: String!
  description: String
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

"""A connection to a list of items."""
type RoleConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [RoleEdge]!
  aggregate: AggregateRole!
}

input RoleCreateInput {
  name: String!
  description: String
  users: UserCreateManyWithoutRolesInput
}

input RoleCreateManyWithoutUsersInput {
  create: [RoleCreateWithoutUsersInput!]
  connect: [RoleWhereUniqueInput!]
}

input RoleCreateWithoutUsersInput {
  name: String!
  description: String
}

"""An edge in a connection."""
type RoleEdge {
  """The item at the end of the edge."""
  node: Role!

  """A cursor for use in pagination."""
  cursor: String!
}

enum RoleOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type RolePreviousValues {
  id: ID!
  name: String!
  description: String
}

type RoleSubscriptionPayload {
  mutation: MutationType!
  node: Role
  updatedFields: [String!]
  previousValues: RolePreviousValues
}

input RoleSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: RoleWhereInput
}

input RoleUpdateInput {
  name: String
  description: String
  users: UserUpdateManyWithoutRolesInput
}

input RoleUpdateManyWithoutUsersInput {
  create: [RoleCreateWithoutUsersInput!]
  connect: [RoleWhereUniqueInput!]
  disconnect: [RoleWhereUniqueInput!]
  delete: [RoleWhereUniqueInput!]
  update: [RoleUpdateWithWhereUniqueWithoutUsersInput!]
  upsert: [RoleUpsertWithWhereUniqueWithoutUsersInput!]
}

input RoleUpdateWithoutUsersDataInput {
  name: String
  description: String
}

input RoleUpdateWithWhereUniqueWithoutUsersInput {
  where: RoleWhereUniqueInput!
  data: RoleUpdateWithoutUsersDataInput!
}

input RoleUpsertWithWhereUniqueWithoutUsersInput {
  where: RoleWhereUniqueInput!
  update: RoleUpdateWithoutUsersDataInput!
  create: RoleCreateWithoutUsersInput!
}

input RoleWhereInput {
  """Logical AND on all given filters."""
  AND: [RoleWhereInput!]

  """Logical OR on all given filters."""
  OR: [RoleWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [RoleWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  users_every: UserWhereInput
  users_some: UserWhereInput
  users_none: UserWhereInput
}

input RoleWhereUniqueInput {
  id: ID
  name: String
}

enum Sexs {
  MALE
  FEMALE
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  role(where: RoleSubscriptionWhereInput): RoleSubscriptionPayload
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
}

type User implements Node {
  id: ID!
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
  roles(where: RoleWhereInput, orderBy: RoleOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Role!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
  roles: RoleCreateManyWithoutUsersInput
}

input UserCreateManyWithoutRolesInput {
  create: [UserCreateWithoutRolesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateWithoutRolesInput {
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  password_ASC
  password_DESC
  firstname_ASC
  firstname_DESC
  lastname_ASC
  lastname_DESC
  birthdate_ASC
  birthdate_DESC
  sex_ASC
  sex_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String!
  password: String
  firstname: String!
  lastname: String!
  birthdate: DateTime!
  sex: Sexs!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  email: String
  password: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles: RoleUpdateManyWithoutUsersInput
}

input UserUpdateManyWithoutRolesInput {
  create: [UserCreateWithoutRolesInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  delete: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutRolesInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutRolesInput!]
}

input UserUpdateWithoutRolesDataInput {
  email: String
  password: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
}

input UserUpdateWithWhereUniqueWithoutRolesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutRolesDataInput!
}

input UserUpsertWithWhereUniqueWithoutRolesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutRolesDataInput!
  create: UserCreateWithoutRolesInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  firstname: String

  """All values that are not equal to given value."""
  firstname_not: String

  """All values that are contained in given list."""
  firstname_in: [String!]

  """All values that are not contained in given list."""
  firstname_not_in: [String!]

  """All values less than the given value."""
  firstname_lt: String

  """All values less than or equal the given value."""
  firstname_lte: String

  """All values greater than the given value."""
  firstname_gt: String

  """All values greater than or equal the given value."""
  firstname_gte: String

  """All values containing the given string."""
  firstname_contains: String

  """All values not containing the given string."""
  firstname_not_contains: String

  """All values starting with the given string."""
  firstname_starts_with: String

  """All values not starting with the given string."""
  firstname_not_starts_with: String

  """All values ending with the given string."""
  firstname_ends_with: String

  """All values not ending with the given string."""
  firstname_not_ends_with: String
  lastname: String

  """All values that are not equal to given value."""
  lastname_not: String

  """All values that are contained in given list."""
  lastname_in: [String!]

  """All values that are not contained in given list."""
  lastname_not_in: [String!]

  """All values less than the given value."""
  lastname_lt: String

  """All values less than or equal the given value."""
  lastname_lte: String

  """All values greater than the given value."""
  lastname_gt: String

  """All values greater than or equal the given value."""
  lastname_gte: String

  """All values containing the given string."""
  lastname_contains: String

  """All values not containing the given string."""
  lastname_not_contains: String

  """All values starting with the given string."""
  lastname_starts_with: String

  """All values not starting with the given string."""
  lastname_not_starts_with: String

  """All values ending with the given string."""
  lastname_ends_with: String

  """All values not ending with the given string."""
  lastname_not_ends_with: String
  birthdate: DateTime

  """All values that are not equal to given value."""
  birthdate_not: DateTime

  """All values that are contained in given list."""
  birthdate_in: [DateTime!]

  """All values that are not contained in given list."""
  birthdate_not_in: [DateTime!]

  """All values less than the given value."""
  birthdate_lt: DateTime

  """All values less than or equal the given value."""
  birthdate_lte: DateTime

  """All values greater than the given value."""
  birthdate_gt: DateTime

  """All values greater than or equal the given value."""
  birthdate_gte: DateTime
  sex: Sexs

  """All values that are not equal to given value."""
  sex_not: Sexs

  """All values that are contained in given list."""
  sex_in: [Sexs!]

  """All values that are not contained in given list."""
  sex_not_in: [Sexs!]
  roles_every: RoleWhereInput
  roles_some: RoleWhereInput
  roles_none: RoleWhereInput
}

input UserWhereUniqueInput {
  id: ID
  email: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'password_ASC' |
  'password_DESC' |
  'firstname_ASC' |
  'firstname_DESC' |
  'lastname_ASC' |
  'lastname_DESC' |
  'birthdate_ASC' |
  'birthdate_DESC' |
  'sex_ASC' |
  'sex_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type RoleOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'description_ASC' |
  'description_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type Sexs =   'MALE' |
  'FEMALE'

export type FileOrderByInput =   'id_ASC' |
  'id_DESC' |
  'path_ASC' |
  'path_DESC' |
  'filename_ASC' |
  'filename_DESC' |
  'mimetype_ASC' |
  'mimetype_DESC' |
  'encoding_ASC' |
  'encoding_DESC' |
  'size_ASC' |
  'size_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface UserCreateInput {
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles?: RoleCreateManyWithoutUsersInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  firstname?: String
  firstname_not?: String
  firstname_in?: String[] | String
  firstname_not_in?: String[] | String
  firstname_lt?: String
  firstname_lte?: String
  firstname_gt?: String
  firstname_gte?: String
  firstname_contains?: String
  firstname_not_contains?: String
  firstname_starts_with?: String
  firstname_not_starts_with?: String
  firstname_ends_with?: String
  firstname_not_ends_with?: String
  lastname?: String
  lastname_not?: String
  lastname_in?: String[] | String
  lastname_not_in?: String[] | String
  lastname_lt?: String
  lastname_lte?: String
  lastname_gt?: String
  lastname_gte?: String
  lastname_contains?: String
  lastname_not_contains?: String
  lastname_starts_with?: String
  lastname_not_starts_with?: String
  lastname_ends_with?: String
  lastname_not_ends_with?: String
  birthdate?: DateTime
  birthdate_not?: DateTime
  birthdate_in?: DateTime[] | DateTime
  birthdate_not_in?: DateTime[] | DateTime
  birthdate_lt?: DateTime
  birthdate_lte?: DateTime
  birthdate_gt?: DateTime
  birthdate_gte?: DateTime
  sex?: Sexs
  sex_not?: Sexs
  sex_in?: Sexs[] | Sexs
  sex_not_in?: Sexs[] | Sexs
  roles_every?: RoleWhereInput
  roles_some?: RoleWhereInput
  roles_none?: RoleWhereInput
}

export interface UserUpdateWithWhereUniqueWithoutRolesInput {
  where: UserWhereUniqueInput
  data: UserUpdateWithoutRolesDataInput
}

export interface UserCreateWithoutRolesInput {
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
}

export interface UserUpdateManyWithoutRolesInput {
  create?: UserCreateWithoutRolesInput[] | UserCreateWithoutRolesInput
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
  disconnect?: UserWhereUniqueInput[] | UserWhereUniqueInput
  delete?: UserWhereUniqueInput[] | UserWhereUniqueInput
  update?: UserUpdateWithWhereUniqueWithoutRolesInput[] | UserUpdateWithWhereUniqueWithoutRolesInput
  upsert?: UserUpsertWithWhereUniqueWithoutRolesInput[] | UserUpsertWithWhereUniqueWithoutRolesInput
}

export interface UserCreateManyWithoutRolesInput {
  create?: UserCreateWithoutRolesInput[] | UserCreateWithoutRolesInput
  connect?: UserWhereUniqueInput[] | UserWhereUniqueInput
}

export interface RoleUpdateInput {
  name?: String
  description?: String
  users?: UserUpdateManyWithoutRolesInput
}

export interface RoleWhereInput {
  AND?: RoleWhereInput[] | RoleWhereInput
  OR?: RoleWhereInput[] | RoleWhereInput
  NOT?: RoleWhereInput[] | RoleWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  users_every?: UserWhereInput
  users_some?: UserWhereInput
  users_none?: UserWhereInput
}

export interface RoleUpsertWithWhereUniqueWithoutUsersInput {
  where: RoleWhereUniqueInput
  update: RoleUpdateWithoutUsersDataInput
  create: RoleCreateWithoutUsersInput
}

export interface FileWhereInput {
  AND?: FileWhereInput[] | FileWhereInput
  OR?: FileWhereInput[] | FileWhereInput
  NOT?: FileWhereInput[] | FileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  path?: String
  path_not?: String
  path_in?: String[] | String
  path_not_in?: String[] | String
  path_lt?: String
  path_lte?: String
  path_gt?: String
  path_gte?: String
  path_contains?: String
  path_not_contains?: String
  path_starts_with?: String
  path_not_starts_with?: String
  path_ends_with?: String
  path_not_ends_with?: String
  filename?: String
  filename_not?: String
  filename_in?: String[] | String
  filename_not_in?: String[] | String
  filename_lt?: String
  filename_lte?: String
  filename_gt?: String
  filename_gte?: String
  filename_contains?: String
  filename_not_contains?: String
  filename_starts_with?: String
  filename_not_starts_with?: String
  filename_ends_with?: String
  filename_not_ends_with?: String
  mimetype?: String
  mimetype_not?: String
  mimetype_in?: String[] | String
  mimetype_not_in?: String[] | String
  mimetype_lt?: String
  mimetype_lte?: String
  mimetype_gt?: String
  mimetype_gte?: String
  mimetype_contains?: String
  mimetype_not_contains?: String
  mimetype_starts_with?: String
  mimetype_not_starts_with?: String
  mimetype_ends_with?: String
  mimetype_not_ends_with?: String
  encoding?: String
  encoding_not?: String
  encoding_in?: String[] | String
  encoding_not_in?: String[] | String
  encoding_lt?: String
  encoding_lte?: String
  encoding_gt?: String
  encoding_gte?: String
  encoding_contains?: String
  encoding_not_contains?: String
  encoding_starts_with?: String
  encoding_not_starts_with?: String
  encoding_ends_with?: String
  encoding_not_ends_with?: String
  size?: Int
  size_not?: Int
  size_in?: Int[] | Int
  size_not_in?: Int[] | Int
  size_lt?: Int
  size_lte?: Int
  size_gt?: Int
  size_gte?: Int
}

export interface RoleUpdateWithoutUsersDataInput {
  name?: String
  description?: String
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface RoleUpdateWithWhereUniqueWithoutUsersInput {
  where: RoleWhereUniqueInput
  data: RoleUpdateWithoutUsersDataInput
}

export interface RoleWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface RoleUpdateManyWithoutUsersInput {
  create?: RoleCreateWithoutUsersInput[] | RoleCreateWithoutUsersInput
  connect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
  disconnect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
  delete?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
  update?: RoleUpdateWithWhereUniqueWithoutUsersInput[] | RoleUpdateWithWhereUniqueWithoutUsersInput
  upsert?: RoleUpsertWithWhereUniqueWithoutUsersInput[] | RoleUpsertWithWhereUniqueWithoutUsersInput
}

export interface FileUpdateInput {
  path?: String
  filename?: String
  mimetype?: String
  encoding?: String
  size?: Int
}

export interface UserUpdateInput {
  email?: String
  password?: String
  firstname?: String
  lastname?: String
  birthdate?: DateTime
  sex?: Sexs
  roles?: RoleUpdateManyWithoutUsersInput
}

export interface UserUpdateWithoutRolesDataInput {
  email?: String
  password?: String
  firstname?: String
  lastname?: String
  birthdate?: DateTime
  sex?: Sexs
}

export interface FileSubscriptionWhereInput {
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FileWhereInput
}

export interface RoleCreateInput {
  name: String
  description?: String
  users?: UserCreateManyWithoutRolesInput
}

export interface RoleCreateWithoutUsersInput {
  name: String
  description?: String
}

export interface RoleCreateManyWithoutUsersInput {
  create?: RoleCreateWithoutUsersInput[] | RoleCreateWithoutUsersInput
  connect?: RoleWhereUniqueInput[] | RoleWhereUniqueInput
}

export interface FileCreateInput {
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

export interface RoleSubscriptionWhereInput {
  AND?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput
  OR?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput
  NOT?: RoleSubscriptionWhereInput[] | RoleSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: RoleWhereInput
}

export interface UserUpsertWithWhereUniqueWithoutRolesInput {
  where: UserWhereUniqueInput
  update: UserUpdateWithoutRolesDataInput
  create: UserCreateWithoutRolesInput
}

export interface FileWhereUniqueInput {
  id?: ID_Input
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  email?: String
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface FilePreviousValues {
  id: ID_Output
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface User extends Node {
  id: ID_Output
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
  roles?: Role[]
}

export interface BatchPayload {
  count: Long
}

export interface AggregateFile {
  count: Int
}

export interface Role extends Node {
  id: ID_Output
  name: String
  description?: String
  users?: User[]
}

export interface RoleSubscriptionPayload {
  mutation: MutationType
  node?: Role
  updatedFields?: String[]
  previousValues?: RolePreviousValues
}

/*
 * An edge in a connection.

 */
export interface FileEdge {
  node: File
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface FileConnection {
  pageInfo: PageInfo
  edges: FileEdge[]
  aggregate: AggregateFile
}

export interface AggregateRole {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface RoleConnection {
  pageInfo: PageInfo
  edges: RoleEdge[]
  aggregate: AggregateRole
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  email: String
  password?: String
  firstname: String
  lastname: String
  birthdate: DateTime
  sex: Sexs
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

export interface RolePreviousValues {
  id: ID_Output
  name: String
  description?: String
}

export interface File extends Node {
  id: ID_Output
  path: String
  filename: String
  mimetype: String
  encoding: String
  size: Int
}

export interface FileSubscriptionPayload {
  mutation: MutationType
  node?: File
  updatedFields?: String[]
  previousValues?: FilePreviousValues
}

export interface AggregateUser {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface RoleEdge {
  node: Role
  cursor: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

export type DateTime = Date | string