import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Job = ({ job, isDashboard }) => {
  const router = useRouter();

  const handleClick = async task => {
    await fetch('/api/job', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: job.id,
        task,
      }),
    });

    router.reload(window.location.pathname);
  };

  return (
    <div className='mb-4 mt-20 pl-16 pr-16'>
      <Link href={`/job/${job.id}`}>
        <a className='text-xl font-bold underline'>{job.title}</a>
      </Link>{' '}
      <h2 className='text-base font-normal mt-3'>{job.description}</h2>
      <div className='mt-4'>
        {isDashboard && job.published && (
          <p className='mb-5'>
            <span
              onClick={() => handleClick('unpublish')}
              className='bg-black text-white uppercase text-sm p-2 mr-5 cursor-pointer'
            >
              ✅ Published
            </span>
          </p>
        )}
        {isDashboard && !job.published && (
          <p className='mb-5'>
            <span
              onClick={() => handleClick('publish')}
              className='bg-black text-white uppercase text-sm p-2 mr-5 cursor-pointer'
            >
              ❌ Unpublished
            </span>
          </p>
        )}
        <h4 className='inline'>Posted by</h4>
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
  );
};

export default Job;
