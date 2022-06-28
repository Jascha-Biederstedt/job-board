import React from 'react';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

import prisma from 'lib/prisma';
import { getUser, getJobsPosted, getApplications } from 'lib/data';
import Jobs from 'components/Jobs';

export const getServerSideProps = async context => {
  const session = await getSession(context);

  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  let jobs = [];
  let applications = [];

  if (user.company) {
    jobs = await getJobsPosted(prisma, user.id);
    jobs = JSON.parse(JSON.stringify(jobs));
  } else {
    applications = await getApplications(prisma, user.id);
    applications = JSON.parse(JSON.stringify(applications));
  }

  return {
    props: {
      user,
      jobs,
      applications,
    },
  };
};

const Dashboard = ({ user, jobs, applications }) => {
  const { data: session } = useSession();

  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Dashboard</h2>
        {user.company && (
          <span className='bg-black text-white uppercase text-sm p-2 '>
            Company
          </span>
        )}
        {session && (
          <>
            {user.company && (
              <p className='mt-10 mb-10 text-2xl font-normal'>
                {user.company ? 'all the jobs you posted' : 'your applications'}
              </p>
            )}
          </>
        )}
      </div>
      {user.company ? (
        <Jobs jobs={jobs} isDashboard={true} />
      ) : (
        <>
          {applications.map((application, application_index) => {
            return (
              <div
                key={application_index}
                className='mb-4 mt-20 flex justify-center'
              >
                <div className='pl-16 pr-16 -mt-6 w-1/2'>
                  <Link href={`/job/${application.job.id}`}>
                    <a className='text-xl font-bold underline'>
                      {application.job.title}
                    </a>
                  </Link>
                  <h2 className='text-base font-normal mt-3'>
                    {application.coverletter}
                  </h2>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Dashboard;
