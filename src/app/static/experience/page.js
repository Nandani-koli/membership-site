export const metadata = {
    title: 'Nandani Koli - Experience',
  }
  
  const Experience = () => {
    return (
      <>
        <div className="container my-5">
          <h1 className="text-center mb-5">Work Experience</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="timeline">
                {/* Experience 1: Full Stack Developer */}
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="bi bi-briefcase-fill"></i>
                  </div>
                  <div className="timeline-content">
                    <h5 className="fw-bold">Software Development Engineer</h5>
                    <p className="text-muted">PixelNX Pvt. Ltd. | Oct 2023 - Present</p>
                    <ul>
                      <li>Lead the end-to-end development lifecycle of multiple high-impact projects as a Full Stack Developer, leveraging Next.js, React.js, Node.js, and MongoDB to create seamless web applications.</li>
                      <li>Architected and implemented complex features such as real-time chat and collaborative functionalities for a client-facing social media application, optimizing the user experience and system performance.</li>
                      <li>Successfully integrated third-party APIs for payment gateways, email automations, and social media authentication to enhance the functionality of the client&apos;s product.</li>
                      <li>Collaborated with cross-functional teams to implement agile methodologies, ensuring timely delivery of features and continuous improvement of the product.</li>
                      <li>Built, deployed, and maintained the company&apos;s proprietary ERP system, improving internal operational efficiency by automating business-critical processes, including customer management and data analytics.</li>
                     </ul>
                  </div>
                </div>
  
                {/* Experience 2: Trainee Backend Developer */}
                <div className="timeline-item">
                  <div className="timeline-icon">
                    <i className="bi bi-briefcase-fill"></i>
                  </div>
                  <div className="timeline-content">
                    <h5 className="fw-bold">Trainee Backend Developer</h5>
                    <p className="text-muted">PixelNX Pvt. Ltd. | Jun 2023 - Sep 2023</p>
                    <ul>
                      <li>Led the backend development of a high-performance CRUD application using Next.js, contributing to the entire software development lifecycle, from requirement gathering to deployment.</li>
                      <li>Collaborated with senior engineers to design and implement robust APIs for seamless data interaction between the front-end and back-end, ensuring efficient data management and retrieval.</li>
                      <li>Enhanced application performance through optimization of database queries and RESTful API endpoints, resulting in a 30% improvement in response time and overall user experience.</li>
                      <li>Worked closely with frontend developers to integrate dynamic user interfaces with scalable backend services, ensuring responsive and fluid applications.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Experience;
  