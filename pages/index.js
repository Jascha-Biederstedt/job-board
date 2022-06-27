import Head from 'next/head';

import prisma from 'lib/prisma';
import { getJobs } from 'lib/data';
import Jobs from 'components/Jobs';

export const getServerSideProps = async () => {
  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  return {
    props: {
      jobs,
    },
  };
};

export default function Home({ jobs }) {
  return (
    <div className='mt-10'>
      <Head>
        <title>Job Board</title>
        <meta name='description' content='Job Board' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>Find a job!</h2>
      </div>

      <Jobs jobs={jobs} />
    </div>
  );
}
