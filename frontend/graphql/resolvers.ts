
export const resolvers = {
    BalancesQuery: {
        balances: async (_parent, _args, context) => await context.prisma.balances.findMany(),
    },

    BalanceById: {        
        balance: async (_parent, args, context) => await context.prisma.balances.findUnique({
            where: {
                id: args.id
            }
        })
        
    }
}