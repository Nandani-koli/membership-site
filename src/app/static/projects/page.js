import ProjectCard from "../components/ProjectCard";

export const metadata = {
  title: 'Nandani Koli - Projects',
};

const Projects = () => {
  return (
    <>
      <section className="container mt-5 text-center">
        <h1 className="m-5 text-uppercase font-weight-bold">My Projects</h1>
        <p className="lead mb-5 text-muted">
          Explore the projects I’ve worked on. Click on any project name to view the code and learn more.
        </p>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          <div className="col">
          {/* Multi-tenant  */}
          <ProjectCard
              title="Multi-tenant site"
              url="https://github.com/Nandani-koli/sublekh"
              description="A simple blog app built with NextJs and Node.js"
            />

            <ProjectCard
              title="Blog App"
              url="https://github.com/Nandani-koli/Blog-App"
              description="A simple blog app built with React and Node.js"
            />
           
          </div>

          <div className="col">
          <ProjectCard
              title="Quiz App"
              url="https://github.com/Nandani-koli/QuizHub"
              description="An interactive quiz app with real-time feedback"
            />
            <ProjectCard
              title="Result Analysis System"
              url="https://github.com/Nandani-koli/Result-analysis-System"
              description="An application for analyzing academic results"
            />
            
          </div>

          <div className="col">
          <ProjectCard
              title="MemberShip App"
              url="https://github.com/Nandani-koli/portfolio-website"
              description="A project predicting dance forms based on user input"
            />
            <ProjectCard
              title="Dance Form Prediction"
              url="https://github.com/Nandani-koli/LGM-TASK1-Single-page-website"
              description="A project predicting dance forms based on user input"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
