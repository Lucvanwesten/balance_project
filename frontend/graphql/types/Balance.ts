import { Prisma, PrismaClient } from '@prisma/client';
import { extendType, objectType, stringArg, nonNull, list } from 'nexus';
import { resolvers } from '../resolvers'

const db = new PrismaClient();

export const Field = objectType({
    name: 'Field',
    definition(t) {
        t.string('id');
        t.string('name');
        t.int('value');
        t.boolean('plusOrMinus');
    }
});

export const Balance = objectType({
    name: 'Balance',
    definition(t) {
        t.string('id')
        t.string('title')
        t.int('balance')
        t.list.field('fields', {
            type: Field
        })
    }});


export const BalancesQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.list.field('balances', {
            type: 'Balance',
            resolve(_parent, _args, context) {
                return resolvers.BalancesQuery.balances(_parent, _args, context);
            }
        })
    }
})

export const BalanceByIdQuery = extendType({
    type: 'Query',
    definition(t) {
        t.nonNull.field('balance', {
            type: 'Balance',
            args: {
                id: nonNull(stringArg())
            },
            resolve(_parent, args, context) {
                return resolvers.BalanceById.balance(_parent, args, context);
            }
        })
    }
})