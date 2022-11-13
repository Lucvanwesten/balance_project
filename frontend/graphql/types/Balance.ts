import { Prisma, PrismaClient } from '@prisma/client';
import {extendType, objectType} from 'nexus';

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
                return db.balances.findMany();
            }
        })
    }
})