import React, { useState } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import {
	List,
	ListItem,
	ListItemText,
	Button,
	Divider,
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";

const styles = (theme) => ({
	root: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
	},
	box: {
		width: "80%",
		margin: "3em auto",
		backgroundColor: theme.palette.grey[200],
	},
	row: {
		height: "1.7em",
		// padding: "0 0 0 9em",
	},
	name_col: {
		margin: "0 1em 0 6em",
		width: ".9em",
	},
	col: {
		width: "20%",
	},
});

class Mail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mail_data: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/invites/getInvites")
			.then((response) => {
				this.setState({
					mail_data: response.data.result,
				});
				// console.log("response", this.state.mail_data[0]);
			})
			.catch((error) => {
				console.log("An error occurred:", error);
			});
	}

	render() {
		const { classes } = this.props;
		let mail_data = this.state.mail_data;
		if (mail_data != undefined) {
			let md = JSON.stringify(mail_data);
			console.log("rendered data " + md);
		}
		// if (data.length > 0) {
		// 	Object.keys(data).forEach((key) => {
		// 		data[key]["name_list"] = data[key].team.replace(
		// 			/[ "\[\] ]/g,
		// 			""
		// 		);
		// 	});
		// }

		return (
			<div className={classes.root}>
				<List component="nav" className={classes.box}>
					{mail_data.map((m) => (
						<React.Fragment key={m._id}>
							<ListItem>
								<ListItemText
									className={classes.name_col}
									primary={`${m.sender}`}
								/>
								<ListItemText
									className={classes.col}
									primary={`Join my team for ${m.eventName}`}
								/>
								<Button>
									<FontAwesomeIcon
										icon={icon({ name: "check" })}
									/>
								</Button>
								<Button>
									<FontAwesomeIcon
										icon={icon({ name: "xmark" })}
									/>
								</Button>
							</ListItem>
							<ListItem>
								<ListItemText primary={m.name_list} />
							</ListItem>
							<Divider />
						</React.Fragment>
					))}
				</List>
			</div>
		);
	}
}

export default withStyles(styles)(Mail);
