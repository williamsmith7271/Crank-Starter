import React from 'react';
import ProjectItem from './project_item'

class ProjectIndex extends React.Component {
  componentDidMount(){
    this.props.fetchProjects();
    this.props.fetchCategories();
  }

  render() {
    const projects = this.props.projects.map((project) => {
      const category = this.props.categories[project.id]
      return ( <ProjectItem
        key={project.id}
        project={project}
        category={category}
      />);
    });

    return (
      <section className ="all-projects">
        <ul className="indexContainer">
          {projects}
        </ul>
      </section>
    );
  }
}

export default ProjectIndex;
