import Link from "next/link";

const ProjectCard = (props) => {
  return (
    <div className="project-card">
      <h5 className="project-title">{props.title}</h5>
      <Link href={props.url} className="btn btn-link" target="_blank">
        View on GitHub
      </Link>
    </div>
  );
};

export default ProjectCard;
