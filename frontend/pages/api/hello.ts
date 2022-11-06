// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type Data = {
  balances: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const balances = await prisma.balances.findMany()
    res.status(200).json({ balances: balances })
}

