import React  from "react";
import history from "./history";
import {Router, Route, Switch} from "react-router";
import ModalContainer from 'react-modal-promise'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ListBuckets from "./ListBuckets"
import ListObjects from "./ListObjects"

export default function App() {
  return (
    <div className="h-screen w-screen p-5">
      <h1>Minio JS React Example</h1>
        <Router history={history}>
            <Switch>
                <Route exact path={["/","list-buckets"]} component={ListBuckets}/>
                <Route exact path={["/list-objects/:bucketName"]} component={ListObjects}/>
            </Switch>
        </Router>
        <ModalContainer />
        <ToastContainer/>
    </div>
  );
}
