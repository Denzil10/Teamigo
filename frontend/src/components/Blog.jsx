import React from "react";
import axios from "axios";

export default class Blog extends React.Component {
	state = {
		blog_data: [],
	};

	componentDidMount() {
		this.callUsingId();
	}

	callUsingId = () => {
		const { search_type, event_id } = this.props.params;
		let api_call =
			search_type == "teams"
				? "getTeamsByEventId"
				: "getParticipantsByEventId";

		if (search_type) {
			axios
				.post(`http://localhost:5000/${search_type}/${api_call}`, {
					eventId: "6489c38a41c8d6b4df7e8744",
				})
				.then((response) => {
					this.setState({ blog_data: response.data.result });
				});
		}
	};

	render() {
		const { blog_data } = this.state;

		var team_field = "";
		console.log("blog" + JSON.stringify(blog_data));
		if (blog_data != undefined) {
			Object.keys(blog_data).forEach((key) => {
				if ("members" in blog_data[key])
					if (blog_data[key].members.length > 0) {
						team_field = blog_data[key].members;
						// team_field = team_field.replace(/["\[\]]/g, "");
					}
				// blog_data[key]["members"] = team_field;
			});
		}

		return (
			<div
				id="forum_display"
				className="d-flex flex-column self-align-center align-items-center justify-content-center flex-nowrap overflow-auto text-capitalize p-5 "
			>
				<div className="toprow row1 d-flex flex-row justify-content-between p-2">
					{/* <div className="col1 ">event</div> */}
					<div className="col1 ">name</div>
					<div className="col1 ">description</div>
					<div className="col1 ">team</div>
					<div className="col1 ">join</div>
				</div>
				{blog_data.map((data) => (
					<div className="row1 d-flex flex-row justify-content-between p-2">
						<div className="col1 ">{data.leaderName}</div>
						<div className="col1 ">{data.description}</div>
						<div className="col1 flex-wrap">{data.members}</div>
						<div className="btn btn-success">invite to team</div>
					</div>
				))}
			</div>
		);
	}
}
