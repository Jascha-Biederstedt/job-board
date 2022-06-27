import prisma from './prisma';

export const getJob = async (prisma, id) => {
  const job = await prisma.job.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      author: true,
    },
  });

  return job;
};

export const getJobs = async prisma => {
  const jobs = await prisma.job.findMany({
    where: {
      published: true,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  });

  return jobs;
};

export const getCompany = async (prisma, company_id) => {
  const company = await prisma.user.findUnique({
    where: {
      id: company_id,
    },
  });

  return company;
};

export const getCompanyJobs = async (prisma, company_id) => {
  const companyJobs = await prisma.job.findMany({
    where: {
      authorId: company_id,
      published: true,
    },
    orderBy: [{ id: 'desc' }],
    include: {
      author: true,
    },
  });

  return companyJobs;
};

export const getJobsPosted = async (prisma, user_id) => {
  const jobs = await prisma.job.findMany({
    where: {
      authorId: user_id,
    },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
    },
  });

  return jobs;
};

export const getUser = async (prisma, id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
