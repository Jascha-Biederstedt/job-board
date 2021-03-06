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

  await Promise.all(
    jobs.map(
      async job => (job.applications = await getJobApplications(prisma, job))
    )
  );

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

export const getApplications = async (prisma, user_id) => {
  const applications = await prisma.application.findMany({
    where: { authorId: user_id },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
      job: true,
    },
  });

  return applications;
};

export const alreadyApplied = async (prisma, user_id, job_id) => {
  const applications = await prisma.application.findMany({
    where: {
      authorId: user_id,
      jobId: parseInt(job_id),
    },
    include: {
      author: true,
    },
  });

  if (applications.length > 0) {
    return true;
  }

  return false;
};

export const getJobApplications = async (prisma, job) => {
  const applications = await prisma.application.findMany({
    where: { jobId: job.id },
    orderBy: [
      {
        id: 'desc',
      },
    ],
    include: {
      author: true,
      job: true,
    },
  });

  return applications;
};
