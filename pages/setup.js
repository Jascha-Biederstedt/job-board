import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import Spinner from 'components/Spinner';

const Setup = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return <Spinner />;

  if (!session || !session.user) {
    router.push('/');
    return null;
  }

  if (status !== 'loading' && session && session.user.name) {
    router.push('/');
  }

  const handleSubmit = async event => {
    event.preventDefault();

    await fetch('api/setup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        company,
      }),
    });

    session.user.name = name;
    session.user.company = company;
    router.push('/');
  };

  return (
    <form className='mt-10 ml-20' onSubmit={handleSubmit}>
      <div className='flex-1 mb-5'>
        <div className='flex-1 mb-5'>Add your name</div>
        <input
          type='text'
          name='name'
          value={name}
          onChange={event => setName(event.target.value)}
          className='border p-1 text-black'
        />
      </div>

      <div className='flex-1 mb-5'>
        <div className='flex-1 mb-5'>
          Check this box if you're a company and you want to post jobs
        </div>
        <input
          type='checkbox'
          name='company'
          checked={company}
          onChange={() => setCompany(!company)}
          className='border p-1'
        />
      </div>

      <button className='border px-8 py-2 mt-0 mr-8 font-bold rounded-full color-accent-contrast bg-color-accent hover:bg-color-accent-hover'>
        Save
      </button>
    </form>
  );
};

export default Setup;
