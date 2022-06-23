import { faker } from '@faker-js/faker';
import { getSession } from 'next-auth/react';

import prisma from 'lib/prisma';

const handler = async (req, res) => {
  const session = await getSession({ req });

  const generateFakeJob = user => ({
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraphs(),
    author: {
      connect: { id: user.id },
    },
  });

  if (req.method !== 'POST') return res.end();

  if (req.body.task === 'clean_database') {
    await prisma.job.deleteMany({});
    await prisma.user.deleteMany({
      where: {
        NOT: {
          email: {
            in: [session?.user?.email],
          },
        },
      },
    });
  }

  if (req.body.task === 'generate_users_and_jobs') {
    let count = 0;

    while (count < 10) {
      await prisma.user.create({
        data: {
          name: faker.internet.userName().toLowerCase(),
          email: faker.internet.email().toLowerCase(),
          company: faker.datatype.boolean(),
        },
      });

      count++;
    }

    const users = await prisma.user.findMany({
      where: {
        company: true,
      },
    });

    users.forEach(async user => {
      await prisma.job.create({
        data: generateFakeJob(user),
      });
    });
  }

  if (req.body.task === 'generate_one_job') {
    const user = await prisma.user.findFirst({
      where: {
        company: true,
      },
    });

    await prisma.job.create({
      data: generateFakeJob(user),
    });
  }

  res.end();
};

export default handler;
