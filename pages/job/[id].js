import React from 'react';
import Link from 'next/link';

import prisma from 'lib/prisma';
import { getJob } from 'lib/data';

export const getServerSideProps = async ({ params }) => {
  let job = await getJob(prisma, params.id);
  job = JSON.parse(JSON.stringify(job));

  return {
    props: {
      job,
    },
  };
};

const JobDetailPage = ({ job }) => {
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
    </div>
  );
};

export default JobDetailPage;
