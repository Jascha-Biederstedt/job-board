import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const New = () => {
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [salary, setSalary] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();
  const { data: session } = useSession();

  if (!session || !session.user) return null;

  const handleSubmit = async event => {
    event.preventDefault();

    await fetch('/api/job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        location,
        salary,
      }),
    });

    router.push('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-col w-1/2 mx-auto'>
        <h2 className='mt-10 mb-10 text-4xl font-bold'>Post a new job!</h2>
        <div className=' pt-2 mt-2 mr-1'>
          <input
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            placeholder='Job title'
            required
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div className=' pt-2 mt-2 mr-1 '>
          <textarea
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            rows={2}
            cols={50}
            placeholder='Job description'
            required
            onChange={event => setDescription(event.target.value)}
          />
        </div>
        <div className=' pt-2 mt-2 mr-1'>
          <input
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            placeholder='Salary'
            required
            onChange={event => setSalary(event.target.value)}
          />
        </div>
        <div className=' pt-2 mt-2 mr-1'>
          <input
            className='border p-4 w-full text-lg font-medium bg-transparent outline-none color-primary '
            placeholder='Location'
            required
            onChange={event => setLocation(event.target.value)}
          />
        </div>
        <div className='mt-5'>
          <button className='border float-right px-8 py-2 mt-0  font-bold rounded-full'>
            Post job
          </button>
        </div>
      </div>
    </form>
  );
};

export default New;
