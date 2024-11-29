import Image from 'next/image';
import { Yaldevi } from 'next/font/google';
import Script from 'next/script';

const yaldevi = Yaldevi({ subsets: ['latin'], weight: '400' });

export const metadata = {
  title: 'Nandani Koli - About',
  icons: {
    icon: '/images/abouticon.jpg',
  },
};

const Aboutme = () => {
  return (
    <>
      <div className="container py-5">
        <Script src="https://app.embed.im/snow.js" strategy="lazyOnload" />

        {/* Title */}
        <h3 className="text-center mb-3 display-5 text-uppercase fw-bold">About Me</h3>

        {/* Content Section */}
        <div className="row d-flex align-items-center justify-content-center">
          {/* Text Section */}
          <div className="col-lg-6 col-md-12 bg-dark text-light p-5 rounded shadow-sm">
            <p className={`${yaldevi.className} lead`} style={{ lineHeight: "1.8" }}>
              Hi there! I’m <strong>Nandani Koli</strong>, a full-stack developer specializing in <strong>Next.js</strong>, <strong>React.js</strong>, <strong>Node.js</strong>, and <strong>MongoDB</strong>.
              With hands-on experience in developing SaaS products, I’m skilled in modern web development, full-stack engineering, and scalable application architecture.
            </p>

            <p className={`${yaldevi.className} lead`} style={{ lineHeight: "1.8" }}>
              I graduated with a degree in <strong>Information Technology</strong> from <strong>SGSITS Indore</strong>, excelling in areas such as <em>Database Design</em>, <em>Web Programming</em>, and <em>Object-Oriented Design</em>.
            </p>

            <p className={`${yaldevi.className} lead`} style={{ lineHeight: "1.8" }}>
              Apart from technical expertise, I value <strong>communication</strong>, <strong>leadership</strong>, <strong>problem-solving</strong>, and <strong>teamwork</strong>. I am passionate about learning and applying my skills to real-world projects.
            </p>
          </div>

          {/* Image Section */}
          <div className="col-lg-6 col-md-12 mt-4 mt-lg-0 text-center">
            <div className="d-flex justify-content-center">
              <div className="shadow-lg" style={{ width: '100%', height: '100%', maxWidth: '500px' }}>
                <Image
                  src="/images/profile.jpg"
                  priority={true}
                  width={500}
                  height={600}
                  alt="Picture of Nandani Koli"
                  className="rounded shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Aboutme;
