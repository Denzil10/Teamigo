import React from "react";
import axios from "axios";
import Options from "./Options";

class Form extends React.Component {
	constructor(props) {
		super(props);
		//for now write page refresh code after form submit
		this.state = {
			members: new Array(),
		};
	}

	postOnForum = () => {
		let profile_data = this.props.profileData;
		let box = document.querySelector("#post_box");
		if (profile_data.name == undefined) profile_data.name = "need login";

		//post only if person is logged in

		axios.post("http://localhost:5000/participant/addParticipantAndTeam", {
			google_id: `${profile_data.googleId}`,
			desc: `${box.value}`,
			event_id: this.getEventId(),
			type_id: `${this.props.type}`,
			team: `${JSON.stringify(this.state.members)}`,
		});
	};

	getEventId = () => {
		let event_name = this.props.curr_event;
		let event_list = this.props.event_data;

		if (event_list != undefined) {
			for (let key in event_list) {
				if (event_list[key].eventName == event_name) {
					return event_list[key]._id;
				}
			}
		}
	};

	/* When the user clicks on the button,
	toggle between hiding and showing the dropdown content */
	searchToggle = (e) => {
		e.preventDefault();
		document.getElementById("myDropdown").classList.toggle("show");
	};

	addUnknownMember = (e) => {
		e.preventDefault();
		if (this.state.members.length < 4) {
			let input = document.getElementById("myInput");
			let member_name =
				input.value[0].toUpperCase() + input.value.slice(1);
			let new_list = [...this.state.members];
			new_list.push(member_name);
			this.setState({
				members: new_list,
			});
		}
	};

	addMember = (e) => {
		e.preventDefault();
		let new_list = [...this.state.members];
		if (this.state.members.length < 4) {
			new_list.push(e.target.innerText);
		} else {
			new_list.splice(0, 1); // 2nd parameter means remove one item only
			new_list.push(e.target.innerText);
			// also you should put back removed child in search opts
		}
		this.setState({
			members: new_list,
		});
		e.target.parentNode.removeChild(e.target);
		document.getElementById("myDropdown").classList.toggle("show");
	};

	filterFunction = () => {
		let input, filter, ul, li, a, i, div, txtValue;
		input = document.getElementById("myInput");
		filter = input.value.toUpperCase();
		div = document.getElementById("myDropdown");
		a = div.getElementsByTagName("a");
		for (i = 0; i < a.length; i++) {
			txtValue = a[i].innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
				a[i].style.display = "";
			} else {
				a[i].style.display = "none";
			}
		}
	};

	render() {
		return (
			<div>
				<form action="">
					<label className="title">Post on forum</label>
					<label>Describe your skills in 5-15 words</label>
					<div className="d-flex flex-row justify-content-between">
						<textarea
							id="post_box"
							rows="10"
							maxlength="100"
							placeholder="React, HTML, CSS
							SQL 
							Invictus finalist"
						/>
						<div
							id="team-box"
							className="d-flex flex-column justify-content-center"
						>
							<h5>Already got existing members ?</h5>
							<div className="dropdown">
								<input
									type="text"
									placeholder="Search.."
									id="myInput"
									onClick={this.searchToggle}
									onKeyUp={this.filterFunction}
								></input>
								<button
									className="btn btn-success"
									onClick={this.addUnknownMember}
								>
									+
								</button>
								<div
									id="myDropdown"
									className="dropdown-content"
								>
									<a href="#" onClick={this.addMember}>
										Shaun
									</a>
									<a href="#" onClick={this.addMember}>
										Harsh
									</a>
									<a href="#" onClick={this.addMember}>
										Mukul
									</a>
								</div>
							</div>

							<Options
								total={this.state.members.length}
								data={this.state.members}
								onEvent={() => {}}
							/>
						</div>
					</div>
					<button
						className="btn btn-success mt-4"
						onClick={this.postOnForum}
					>
						Post
					</button>
					<button className="btn btn-success mt-4">
						Or, just get added to participant list
					</button>
				</form>
			</div>
		);
	}
}

export default Form;
