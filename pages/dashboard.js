import React from 'react';
import { getSession, useSession } from 'next-auth/react';

import prisma from 'lib/prisma';
import { getUser, getJobsPosted } from 'lib/data';
import Jobs from 'components/Jobs';

export const getServerSideProps = async context => {
  const session = await getSession(context);

  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  let jobs = await getJobsPosted(prisma, user.id);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      user,
      jobs,
    },
  };
};

const Dashboard = ({ user, jobs }) => {
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
                all the jobs you posted
              </p>
            )}
          </>
        )}
      </div>
      <Jobs jobs={jobs} isDashboard={true} />
    </div>
  );
};

export default Dashboard;
