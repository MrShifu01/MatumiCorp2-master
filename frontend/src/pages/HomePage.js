import Hero from '../components/Hero';
import About from '../components/About';
import InfoSection1 from '../components/InfoSection1';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Team from '../components/Team';
import Contact from '../components/Contact';
import InfoSection2 from '../components/InfoSection2';
import Navigation from '../components/Navigation';

function HomePage() {

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
