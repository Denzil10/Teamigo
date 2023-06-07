import React, { useState } from "react";
import Axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

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
	name_text: {
		margin: "0 1em 0 6em",
		width: ".9em",
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
		Axios.get("http://localhost:5000/invite/fetch").then((response) => {
			this.setState({
				mail_data: response.data,
			});
		});
	}

	render() {
		// let mail = this.state.mail_data;
		const { classes } = this.props;
		const { mail_data } = this.state;
		if (mail_data.length > 0) {
			Object.keys(mail_data).forEach((key) => {
				mail_data[key]["name_list"] = mail_data[key].team.replace(
					/[ "\[\] ]/g,
					""
				);
			});
		}

		return (
			<div className={classes.root}>
				<List component="nav" className={classes.box}>
					{mail_data.map((m) => (
						<React.Fragment key={m.id} className={classes.row}>
							<ListItem button>
								<ListItemText
									className={classes.name_text}
									primary={`${m.sender}`}
									// secondary={`Team: ${typeof m.team}`}
								/>
								<ListItemText
									primary={`Join my team for ${m.event}`}
								/>
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
