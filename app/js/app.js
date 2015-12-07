const React = require('react');
const ReactDOM = require('react-dom');
const AppBar = require('material-ui/lib/app-bar');

class Hello extends React.Component{
  render(){
    return(
      <AppBar
        title="example"
        iconClassNameRight="muidocs-icon-navigation-expand-more" />

    );
  }
}

ReactDOM.render(
  <Hello />,
  document.getElementById('example')
);
