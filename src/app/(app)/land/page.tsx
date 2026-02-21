'use client'

import React, { useEffect, useState } from 'react';

const Page = () => {
  const [iframeMessage, setIframeMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleIframeLogs = (event: any) => {
      if (event.data?.type === 'iframe-log') {
        console.log('Iframe Log:', ...event.data.data);
        setIframeMessage(event.data.data.join(' '));
      }
    };

    window.addEventListener('message', handleIframeLogs);

    return () => {
      window.removeEventListener('message', handleIframeLogs);
    };
  }, []);

  return (
    <div className='select-none'>
      <div className='h-16 w-56 xl:w-64 bg-[#FAFAFA] absolute right-0'></div>
      <iframe
        src="https://project-68826416-c60d-4462-922.projects.earthengine.app/view/vivek"
        height={900}
        width="100%"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default Page;
