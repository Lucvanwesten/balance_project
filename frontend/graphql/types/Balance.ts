import { Prisma, PrismaClient } from '@prisma/client';
import {extendType, objectType, stringArg, nonNull} from 'nexus';
import {resolvers} from '../resolvers'

const db = new PrismaClient();

export const Balance = objectType({
    name: 'Balance',
    definition(t){
        t.string('id')
        t.string('title')
        t.int('balance')
    }
})


export const BalancesQuery = extendType({
    type: 'Query',
    definition(t){
        t.nonNull.list.field('balances', {
            type: 'Balance',
            resolve(_parent, _args, context){
                return resolvers.BalancesQuery.balances(_parent, _args, context);
            }
        })
    }
})

export const BalanceByIdQuery = extendType({
    type: 'Query',
    definition(t){
        t.nonNull.field('balance', {
            type: 'Balance',
            args: {
                id: nonNull(stringArg())
            },
            resolve(_parent, args, context){
                console.log(args.id);
                return resolvers.BalanceById.balance(_parent, args, context);
            }
        })
    }
})