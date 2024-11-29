import style from './page.module.css'
import { Pacifico } from 'next/font/google'

import Aboutme from './static/aboutme/page';
import Skills from './static/skills/page';
import Experience from "./static/experience/page";
import Projects from "./static/projects/page";
import Contact from "./static/contact/page";
import Navbar from './static/components/Navbar'
import Footer from './static/components/Footer'


//client components
import { DownloadCVBtn } from './static/components/DownloadCVBtn';

//database connect 
import connectToDatabase from '@/utils/config';
connectToDatabase();

const pacifico = Pacifico({ subsets: ['latin'], weight: '400', })

export const metadata = {
  title: 'Nandani Koli - Portfolio-Website',
}

const Home = async () => {

  return (
    <div>
      <Navbar />
      <section className={style.main_page}>
        <div className={style.main_content}>
          <h1 className={`${style.heading} ${pacifico.className}`}>
            Software Developer Engineer
          </h1>

          <h4 className={style.heading_two}>
      Hi, I’m Nandani Koli, a passionate Full-Stack Developer. I specialize in creating innovative solutions with modern web technologies. Explore my skills and projects, and feel free to get in touch for collaborations!
    </h4>

          <div className={style.btns_grps}>
            <DownloadCVBtn />
          </div>
        </div>
      </section>


      <Aboutme />
      <Skills />
      <Experience />
      <Projects />
      <Contact />

      <Footer />

    </div>
  )
}

export default Home;