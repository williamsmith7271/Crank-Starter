import React from 'react';
import { NavLink } from 'react-router-dom';
import { Line } from 'rc-progress';

const ProjectItem = (props) => {
  const numberWithCommas = (x) => (
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );

  const dateRemaining = (end_date) => {
    const currentDate = new Date();
    return numberWithCommas(
      Math.ceil((new Date(end_date) - currentDate) / 86400000)
    );
  };

  const calculatePercent = () => (
    Math.floor(props.project.funded / props.project.funding_goal * 100)
  );

  let modified;
  if(props.project.title + 2 + props.project.discription > 100){
    modified = props.project.description ? props.project.description : "";
  } else{
    modified = props.project.description.slice(
      0, 100 - props.project.title.length
    ) + "...";
  }

  return(
    <div className="project-item">
      <div className="project-img">
        <img className="img" src={props.project.project_img} />
      </div>

      <div className="discriptions">
        <div className="project-category">
          <h4>{props.category.name}</h4>
        </div>
        <div className="title-block">
          <span className="project-title">
            {props.project.title}:
          </span>
          {' '}
          <span className="project-description">
            {modified}
          </span>
        </div>

        <div className="author">
          <i className="fa fa-user-circle-o user-icon" aria-hidden="true"></i>
          by: {' '}
          <span>{props.project.creator}</span>
        </div>
        <Line percent="60" strokeWidth="2" strokeColor="#2BDE73" />
        <div className="pledged">
          $
          <span>{props.project.funding_goal}</span>
          {' '}
          <span className="stat-txt">pledged</span>
        </div>
        <div className="funded">
          <span>{calculatePercent()}%</span>
           {' '}
          <span className="stat-txt">funded</span>
        </div>
        <div className="remaining">
          <span>{dateRemaining(props.project.end_date)}</span>
          {' '}
          <span className="stat-txt">days to go</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
