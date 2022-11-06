
export const resolvers = {
    Query: {
        balances: async (_parent, _args, context) => await context.prisma.balances.findMany(),
    },
}