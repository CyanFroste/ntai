import * as React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Bookmarks from './screens/Bookmarks'
import Doujin from './screens/Doujin'
import Doujins from './screens/Doujins'
import Home from './screens/Home'

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/doujins" component={Doujins} />
                    <Route exact path="/doujin/:id" component={Doujin} />
                    <Route exact path="/bookmarks" component={Bookmarks} />
                </Switch>
            </Router>
        </div>
    )
}

export default App
