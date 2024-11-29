import Image from "next/image";

export const metadata = {
  title: "Nandani Koli - Skills",
};

const skills = [
  { name: "Next.js", logo: "https://camo.githubusercontent.com/61ab314079c8a671148e55a9f35d17fe8770754bc786d581d313002d9ea17647/68747470733a2f2f696d672e69636f6e73382e636f6d2f3f73697a653d3130302669643d72324f61725857516337423626666f726d61743d706e6726636f6c6f723d303030303030" },
  { name: "React.js", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Node.js", logo: "https://camo.githubusercontent.com/2d9408e5c38698870a7e7d9cc3aebd3ad0ad2eb67e70ff8fad35be9b10f8a93c/68747470733a2f2f696d672e69636f6e73382e636f6d2f3f73697a653d3130302669643d353430383726666f726d61743d706e6726636f6c6f723d303030303030" },
  { name: "MongoDB", logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" },
  { name: "Git", logo: "https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" },
  { name: "GitHub", logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" },
  { name: "DBMS", logo: "https://cdn-icons-png.flaticon.com/512/2402/2402581.png" },
  { name: "OOPS", logo: "https://cdn-icons-png.flaticon.com/512/2784/2784445.png" },
  { name: "DSA", logo: "https://cdn-icons-png.flaticon.com/512/2518/2518313.png" },
  { name: "Postman", logo: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
];


const Skills = () => {
  return (
    <>
      <section className="container mt-5 text-center">
        {/* Title */}
        <h1 className="mb-4 display-4 text-uppercase fw-bold">Tech Skills</h1>

        {/* Skills Grid */}
        <div className="row justify-content-center">
          {skills.map((skill, index) => (
            <div
              className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 d-flex flex-column align-items-center"
              key={index}
            >
              {/* Skill Logo */}
              <Image
                src={skill.logo}
                alt={`${skill.name} Logo`}
                width={80}
                height={80}
                className="img-fluid rounded-circle shadow-sm"
              />

              {/* Skill Name */}
              <p className="mt-2 fw-bold">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Skills;
