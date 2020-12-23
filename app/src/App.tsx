import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Appbar from "./components/Appbar";
import Search from "./screens/Search";
import Preview from "./screens/Preview";
import Tag from "./screens/Tag";

const App = () => {
	return (
		<div className="App">
			<Router>
				<Appbar />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/search" component={Search} />
					<Route exact path="/tag/:id/:name" component={Tag} />
					<Route exact path="/doujin/:id" component={Preview} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
