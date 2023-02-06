import React from 'react'
import Hero from '../components/Hero'
import SecondRow from '../components/SecondRow';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
function Home() {
    return (
      <>
      <Navbar />
      <Hero/>
      <SecondRow/>
      <Footer/>
      </>
    );
  }
  

export default Home