import { getSession } from 'next-auth/react';

import prisma from 'lib/prisma';

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) return res.end();

  if (req.method === 'POST') {
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: req.body.name,
        company: req.body.company,
      },
    });

    res.end();
  }
};

export default handler;
