import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

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
  const { data: session } = useSession();
  const router = useRouter();

  if (session && !session.user.name) {
    router.push('/setup');
  }

  return (
    <div className='mt-10'>
      <Head>
        <title>Job Board</title>
        <meta name='description' content='Job Board' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {!session && (
        <div className='flex justify-center'>
          <a
            className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
            href='/api/auth/signin'
          >
            login
          </a>
        </div>
      )}

      <div className='text-center p-4 mt-4'>
        <h2 className='text-4xl mt-10 font-bold'>Find a job!</h2>
      </div>

      <Jobs jobs={jobs} />
    </div>
  );
}
