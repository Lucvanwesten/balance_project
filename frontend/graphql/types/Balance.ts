import {extendType, objectType} from 'nexus';

export const Balance = objectType({
    name: 'Balance',
    definition(t){
        t.string('id');
        t.int('balance')
    }
})


export const BalancesQuery = extendType({
    type: 'Query',
    definition(t){
        t.nonNull.list.field('balances', {
            type: 'Balance',
            resolve(_parent, _args, context){
                return context.prisma.balances.findMany();
            }
        })
    }
})