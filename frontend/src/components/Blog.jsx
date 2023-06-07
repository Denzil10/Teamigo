import React from "react";
import axios from "axios";
import { Buttons } from "bootstrap";

export default class Blog extends React.Component {
	state = {
		blog_data: [],
		team_data: [],
	};

	componentDidMount() {
		axios.get("http://localhost:5000/blog/fetch").then((response) => {
			this.setState({ blog_data: response.data });
		});

		axios.get("http://localhost:5000/team/fetch").then((response) => {
			console.log("API response:", response);
			this.setState({
				team_data: response.data,
			});
		});
	}

	componentDidUpdate() {}

	render() {
		// making react element using object
		// const child = this.state.data.map((el, index) => {
		// 	return <div key={index}></div>;
		// });

		const { blog_data, team_data } = this.state;

		let team_member = {};
		Object.keys(team_data).forEach((key) => {
			team_member[team_data[key].id] = team_data[key].members;
		});

		var team_field = "";
		Object.keys(blog_data).forEach((key) => {
			if (blog_data[key].team_id != null && team_data.length > 0) {
				team_field = team_member[blog_data[key].team_id];
				team_field = team_field.replace(/["\[\]]/g, "");
			}
			blog_data[key]["team"] = team_field;
		});

		return (
			<div
				id="forum_display"
				className="d-flex flex-column self-align-center align-items-center justify-content-center flex-nowrap overflow-auto text-capitalize p-5 "
			>
				<div className="toprow d-flex flex-row justify-content-center p-2">
					<div className="col1 ">event</div>
					<div className="col1 ">name</div>
					<div className="col1 ">desc</div>
					<div className="col1 ">date</div>
					<div className="col1 ">team</div>
					<div className="col1 ">join</div>
				</div>
				{blog_data.map((data) => (
					<div className="row1 d-flex flex-row justify-content-center p-2">
						<div className="col1 ">{data.event}</div>
						<div className="col1 ">{data.name}</div>
						<div className="col1 ">{data.msg}</div>
						<div className="col1 ">{"15 / 5"}</div>
						<div className="col1 flex-wrap">{data.team}</div>
						<div className="btn btn-success">invite to team</div>
					</div>
				))}
			</div>
		);
	}
}
