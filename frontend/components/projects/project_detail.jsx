import React from 'react';
import { NavLink } from 'react-router-dom';
import { Line } from 'rc-progress';
import { Link } from 'react-router-dom';
import RewardIndex from './rewards/reward_index.jsx';
import { Route } from 'react-router-dom';

class ProjectDetail extends React.Component {
  constructor(props){
    super(props);

    this.userButtons = this.userButtons.bind(this);
    this.stats = this.stats.bind(this);
    this.deleteProject = this.deleteProject.bind(this);
  }

  componentDidMount(){
    this.props.fetchCategories();
    this.props.fetchProject(this.props.match.params.id);
    this.props.fetchProjects();
    window.scroll(0,0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.projectId !== nextProps.match.params.projectId) {
      this.props.fetchProject(nextProps.match.params.projectId);
    }
  }

  dateRemaining(end_date){
    const currentDate = new Date();
    return this.numberWithCommas(
      Math.ceil((new Date(end_date) - currentDate) / 86400000)
    );
  }

  numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  deleteProject(e){
    this.props.deleteProject(this.props.project);
  }

  userButtons() {
    let detailId = this.props.project.creator ? this.props.project.creator_id : 0;
    if (this.props.currentUser && detailId === this.props.currentUser.id) {
      return(
        <span className="userButtons">
          <Link to={`/projects/new`}>
            <button className="show-edit-button">
              <i className="fa fa-pencil-square-o" aria-hidden="true">Edit</i>
            </button>
          </Link> &nbsp;
          <Link to="/">
            <button
              onClick={this.deleteProject}
              className="show-delete-button"
            >
            <i className="fa fa-trash-o" aria-hidden="true">Delete</i>
            </button>
          </Link>
        </span>
      );
    } else {
      return "";
    }
  }

  handleSubmit(e){
    e.preventDefault();
    e.stopPropagation();
  }

  stats(){
    const project = this.props.project;

    const cal_percent = Math.floor(project.funded / project.funding_goal * 100)
    const percent = cal_percent > 100 ? 100 : cal_percent;

    return(
      <div className="detail-stats">
        <Line className="stats-bar-show" percent={percent} strokeWidth="1" strokeColor="#2BDE73" />
        <div className="show-amount">
          <span className="show-number funded-amt">${project.funded}</span>
          <span className="show-stat-txt">
            pledged of {project.funding_goal} goal
          </span>
        </div>

        <div className="show-amount">
          <span className="show-number">{project.num_backers}</span>
          <span className="show-stat-txt">backers</span>
        </div>

        <div className="remaining">
          <span className="show-number">{this.dateRemaining(project.end_date)}</span>
          {' '}
          <span className="show-stat-txt">days to go</span>
        </div>

        <Link to={`/projects/${project.id}/contribution`} className="back-project-button">
          Back this project
        </Link>

        {this.userButtons()}
        <p>
          All or nothing. This project will only be funded if it reaches its
          goal by Sat, {project.end_date}
        </p>
      </div>
    );
  }

  render(){
    const project = this.props.project;
    const categories = this.props.categories;
    if(this.props.project === undefined) return null;
    return(
      <div className="project-show-page">
        <div className="project-show-main-page">
          <div className="show-background-stat-user">
            <div className="detail-user-title">
            <div className="detail-user">
              <img src="http://res.cloudinary.com/ds1qfel8a/image/upload/v1497820642/Stock/avatar_nqzvi4.png"
                alt="User icon" className="user-icon-detail" />
              <p className="detail-user-name">
                By <span>{project.creator}</span>
              </p>
            </div>
            <div className="display-title">
              <p id="display-title">{project.title}</p>
              <p id="descriptionText">{project.description}</p>
            </div>
          </div>
            <div className="detail-img-stats">
            <div className="detail-project-img">
              <img className="detail-img" src={project.project_img} />
            </div>
            {this.stats()}
          </div>
          </div>

          <div className="show-about-project">
            <div className="show-about-title-detail">
              <p className="show-about-title">About this project</p>
              {project.details}
            </div>
            <div>
              <RewardIndex project={project}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectDetail;
