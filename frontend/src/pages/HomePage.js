import Hero from '../components/Hero';
import About from '../components/About';
import InfoSection1 from '../components/InfoSection1';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import Contact from '../components/Contact';
import InfoSection2 from '../components/InfoSection2';
import Navigation from '../components/Navigation';
import axios from 'axios';
import { useQuery, useQueryClient } from 'react-query';

function HomePage() {

  const queryClient = useQueryClient();
  queryClient.prefetchQuery(['transactions', "", ""], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "Sell-Side", ""], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "Buy-Side", ""], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "Capital Raising", ""], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "", "Industrial"], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "", "Financial Services"], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "", "Technology"], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "", "Logistics"], () => axios.get('/api/transactions'));
  queryClient.prefetchQuery(['transactions', "", "Other"], () => axios.get('/api/transactions'));

  return (
    <div>
      <Navigation/>
      <Hero />
      <InfoSection1 />
      <About />
      <Services />
      <Testimonials />
      <InfoSection2 />
      <Team />
      <Contact />
    </div>
  );
}

export default HomePage;
