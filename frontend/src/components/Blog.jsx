import React from "react";
import Axios from "axios";
import { Buttons } from "bootstrap";

export default class Blog extends React.Component {
	state = {
		data: [],
	};

	componentDidMount() {
		Axios.get("http://localhost:5000/blog/fetch").then((response) => {
			this.setState({
				data: response.data,
			});
		});
	}

	render() {
		// making react element using object
		// const child = this.state.data.map((el, index) => {
		// 	return <div key={index}></div>;
		// });
		const { data } = this.state;
		console.log("data" + JSON.stringify(data));

		return (
			<div
				id="forum_display"
				className="d-flex flex-column align-self-center flex-nowrap overflow-auto align-content-center justify-content-center text-capitalize "
			>
				<div className="row1 d-flex flex-row justify-content-center bg-white p-2">
					<div className="col1 ">event</div>
					<div className="col1 ">name</div>
					<div className="col1 ">desc</div>
					<div className="col1 ">date</div>
					<div className="col1 ">team</div>
					<div className="col1 ">join</div>
				</div>
				{data.map((data) => (
					<div className="row1 d-flex flex-row justify-content-center bg-white p-2">
						<div className="col1 ">{data.event}</div>
						<div className="col1 ">{data.name}</div>
						<div className="col1 ">{data.msg}</div>
						<div className="col1 ">{15 / 4}</div>
						<div className="col1 ">-</div>
						<div className="btn btn-success">invite to team</div>
					</div>
				))}
			</div>
		);
	}
}
