import React from 'react';
import Link from 'next/link';
import { getSession } from 'next-auth/react';

import prisma from 'lib/prisma';
import { getJob, alreadyApplied } from 'lib/data';

export const getServerSideProps = async context => {
  const session = await getSession(context);

  let job = await getJob(prisma, context.params.id);
  job = JSON.parse(JSON.stringify(job));

  const applied = await alreadyApplied(
    prisma,
    session.user.id,
    context.params.id
  );

  return {
    props: {
      job,
      applied,
    },
  };
};

const JobDetailPage = ({ job, applied }) => {
  return (
    <div className='flex flex-col w-3/4 mx-auto'>
      <div className='text-center p-4 m-4'>
        <Link href={`/`}>
          <a href='' className='mb-10 text-sm font-bold underline'>
            back
          </a>
        </Link>
      </div>
      <div className='text-center p-4 m-4'>
        <h2 className='mb-10 text-4xl font-bold'>{job.title}</h2>
      </div>

      <div className='mb-4'>
        <div className='pl-16 pr-16 -mt-6'>
          <p className='text-base font-normal mt-3'>{job.description}</p>
          <div className='mt-4'>
            <h4 className='inline'>Posted by</h4>
            <div className='inline'>
              <div className='ml-3 -mt-6 inline'>
                <span>
                  <p>
                    <Link href={`/company/${job.author.id}`}>
                      <a>
                        <span className='text-base font-medium color-primary underline'>
                          {job.author.name}
                        </span>
                      </a>
                    </Link>
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {applied ? (
        <div className='m-10 flex justify-center '>
          <Link href={`/dashboard`}>
            <button className=' border  px-8 py-2 mt-0  font-bold rounded-full bg-black text-white '>
              You already applied!
            </button>
          </Link>
        </div>
      ) : (
        <div className='m-10 flex justify-center '>
          <Link href={`/job/${job.id}/apply`}>
            <button className=' border  px-8 py-2 mt-0  font-bold rounded-full bg-black text-white '>
              Apply to this job
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;
