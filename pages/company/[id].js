import React from 'react';
import Link from 'next/link';

import prisma from 'lib/prisma';
import { getCompany } from 'lib/data';
import { getCompanyJobs } from 'lib/data';
import Job from 'components/Job';

export const getServerSideProps = async ({ params }) => {
  let company = await getCompany(prisma, params.id);
  company = JSON.parse(JSON.stringify(company));

  let companyJobs = await getCompanyJobs(prisma, params.id);
  companyJobs = JSON.parse(JSON.stringify(companyJobs));

  return {
    props: {
      company,
      companyJobs,
    },
  };
};

const CompanyDetailPage = ({ company, companyJobs }) => {
  return (
    <div className='mt-10'>
      <div className='text-center p-4 m-4'>
        <Link href={`/`}>
          <a href='' className='mb-10 text-sm font-bold underline'>
            back
          </a>
        </Link>
      </div>
      <div className='text-center p-4 m-4'>
        <h2 className='text-4xl font-bold'>Profile of {company.name}</h2>
      </div>

      <div className='mb-4 mt-20'>
        <div className='pl-16 pr-16 -mt-6'>
          <p className='text-center text-xl font-bold'>Company jobs</p>
          {companyJobs.map((job, index) => (
            <Job key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
