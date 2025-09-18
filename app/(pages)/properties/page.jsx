import React from 'react'


import HeroSection from '@/app/components/web/common/HeroSection/page.jsx'

export default function Properties() {
  
  const content = [
    {
      title: "Find Your Dream Property",
      desc: "Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey"
    }
  ]

  
  return (
    <main id='page-3' className=''>
      <section className="bg-[#141414] bg-[linear-gradient(95.93deg,#262626_-26.82%,rgba(38,38,38,0)_40.46%)] border-b border-b-[#262626] pr-40 pl-16 py-24">
          <HeroSection title={content[0].title} desc={content[0].desc} />
        </section>

    </main>
  )
}
