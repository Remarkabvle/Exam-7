import React from 'react'
// import Navbar from '../../components/header/Header'
import HeroSection from '../../components/hero/Hero'
import IntroSection from '../../components/IntroSection/IntroSection'
import Features from '../../components/features/Features'
import PromoBanner from '../../components/PromoBanner/PromoBanner'
import Articles from '../../components/Articles/Articles'
import Newsletter from '../../components/Newsletter/Newsletter'
import Product from '../../components/product/Product'

const Home = () => {
  return (
    <div>
      <HeroSection/>
      <IntroSection/>
      <Product/>
      <Features/>
      <PromoBanner/>
      <Articles/>
      <Newsletter/>
    </div>
  )
}

export default Home
