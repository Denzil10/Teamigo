import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Landing from "../components/Landing";
import Login from "../components/Login";
import NavigateToPage from "../components/NavigateToPage";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			login: 0,
			profileData: {},
		};
	}

	handleLoginSuccess = (data) => {
		console.log("successful login");
		this.setState({
			login: 2,
			profileData: data,
		});
	};

	handleLogin = () => {
		this.setState({
			login: 1,
		});
	};

	nav = (search_t, e_id) => {
		return (
			<NavigateToPage
				parameter={{
					search_type: search_t,
					event_id: e_id,
				}}
			/>
		);
	};

	render() {
		const LandingAndLogin = (hlog, hlogsucc) => (
			<div>
				<Landing
					// profileData={this.state.profileData}
					onLogin={hlog()}
				/>
				<Login onLoginSuccess={hlogsucc()} />
			</div>
		);

		return (
			<Layout title="Home / teamfinder">
				<Routes>
					{this.state.login === 0 || this.state.login === 2 ? (
						<Route
							path=""
							element={
								<Landing
									navToForum={this.nav}
									profileData={this.state.profileData}
									onLogin={this.handleLogin}
								/>
							}
						/>
					) : (
						<Route
							path=""
							element={LandingAndLogin(
								this.handleLogin,
								this.handleLoginSuccess
							)}
						/>
					)}
				</Routes>
			</Layout>
		);
	}
}

export default Home;
