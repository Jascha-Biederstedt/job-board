import Head from 'next/head';
import Link from 'next/link';
import { useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import prisma from 'lib/prisma';
import { getJobs, getUser } from 'lib/data';
import Jobs from 'components/Jobs';

export const getServerSideProps = async context => {
  const session = await getSession(context);

  let jobs = await getJobs(prisma);
  jobs = JSON.parse(JSON.stringify(jobs));

  if (!session) {
    return {
      props: { jobs },
    };
  }

  let user = await getUser(prisma, session.user.id);
  user = JSON.parse(JSON.stringify(user));

  return {
    props: {
      jobs,
      user,
    },
  };
};

export default function Home({ jobs, user }) {
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

      {session && (
        <div className='flex flex-col items-center'>
          <div className='m-10 text-2xl font-normal text-center'>
            Welcome, {user.name}
            {user.company && (
              <p className='mt-2'>
                <span className='bg-black text-white uppercase text-sm p-2'>
                  Company
                </span>
              </p>
            )}
          </div>
          {user.company ? (
            <>
              <Link href={`/new`}>
                <button className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
                  click here to post a new job
                </button>
              </Link>
              <button className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
                see all the jobs you posted
              </button>
            </>
          ) : (
            <>
              <button className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>
                see all the jobs you applied to
              </button>
            </>
          )}
        </div>
      )}

      <Jobs jobs={jobs} />
    </div>
  );
}
