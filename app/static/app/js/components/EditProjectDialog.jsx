import React from 'react';
import ErrorMessage from './ErrorMessage';
import FormDialog from './FormDialog';
import $ from 'jquery';

class EditProjectDialog extends React.Component {
    static defaultProps = {
        projectName: "",
        projectDescr: "",
        title: "New Project",
        saveLabel: "Create Project",
        savingLabel: "Creating project...",
        saveIcon: "glyphicon glyphicon-plus",
        deleteWarning: "All tasks, images and models associated with this project will be permanently deleted. Are you sure you want to continue?",
        show: false
    };

    static propTypes = {
        projectName: React.PropTypes.string,
        projectDescr: React.PropTypes.string,
        saveAction: React.PropTypes.func.isRequired,
        onShow: React.PropTypes.func,
        deleteAction: React.PropTypes.func,
        title: React.PropTypes.string,
        saveLabel: React.PropTypes.string,
        savingLabel: React.PropTypes.string,
        saveIcon: React.PropTypes.string,
        deleteWarning: React.PropTypes.string,
        show: React.PropTypes.bool
    };

    constructor(props){
        super(props);

        this.state = {
          name: props.projectName,
          descr: props.projectDescr
        };

        this.reset = this.reset.bind(this);
        this.getFormData = this.getFormData.bind(this);
        this.onShow = this.onShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    reset(){
      this.setState({
        name: this.props.projectName,
        descr: this.props.projectDescr
      });
    }

    getFormData(){
      return this.state;
    }

    onShow(){
      this.nameInput.focus();
    }

    show(){
      this.dialog.show();
    }

    hide(){
      this.dialog.hide();
    }

    handleChange(field){
      return (e) => {
        let state = {};
        state[field] = e.target.value;
        this.setState(state);
      }
    }

    render(){
        return (
            <FormDialog {...this.props} 
                getFormData={this.getFormData} 
                reset={this.reset}
                onShow={this.onShow}
                ref={(domNode) => { this.dialog = domNode; }}>
              <div className="form-group">
                <label className="col-sm-2 control-label">Name</label>
                <div className="col-sm-10">
                  <input type="text" className="form-control" ref={(domNode) => { this.nameInput = domNode; }} value={this.state.name} onChange={this.handleChange('name')} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">Description (optional)</label>
                <div className="col-sm-10">
                  <textarea className="form-control" rows="3" value={this.state.descr} onChange={this.handleChange('descr')} />
                </div>
              </div>
            </FormDialog>
        );
    }
}

export default EditProjectDialog;