import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import Overview from "./routes/overview";
import $ from "jquery";
// import Job from './routes/job';

export default class Careers extends Component {
static propTypes = {
match: PropTypes.object
};


componentDidMount() {
$(function() {
$("#findCareer").on('click', function() {
$('html, body').animate({
scrollTop: $("#open-roles").offset().top - 100
}, 800);
});
})
}



render() {
const { match } = this.props;

return (
<Switch>
  <Route exact path={`${match.url}`} component={Overview} />
  {/*
  <Route path={`${match.url}/:id/:slug?`} component={Job} /> */}
</Switch>
);
}
}