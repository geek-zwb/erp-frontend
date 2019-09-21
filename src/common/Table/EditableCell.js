/**
 * Created by geekzwb on 2017/10/18.
 * What for:
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
const Option = Select.Option;

class EditableCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      editable: this.props.editable || false,
    };
    this.selectChange = this.selectChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
    if (nextProps.editable !== this.state.editable) {
      this.setState({editable: nextProps.editable});
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({value: this.cacheValue});
        //this.props.onChange(this.cacheValue);
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value || nextProps.options !== this.props.options;
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({value});
  }

  selectChange(value) {
    this.setState({value});
  }

  render() {
    const {value, editable} = this.state;
    const {options} = this.props;
    let selectOptions = '';
    let selectdName = '';
    if (options !== undefined && Array.isArray(options)) {
      selectOptions = options.map((option, index) => {
        if(option.key === value) selectdName = option.value;
        return (
          <Option value={option.key} key={index}>
            {option.value}
          </Option>
        )
      })
    }
    
    return (
      <div>
        {
          editable ?
            (
            selectOptions ?
              <Select defaultValue={value} onChange={this.selectChange}>
                {selectOptions}
              </Select>
              :
              <div>
                <Input
                  value={value}
                  onChange={e => this.handleChange(e)}
                />
              </div>
            )
            :
            (
            <div className="editable-row-text">
              {selectOptions ? selectdName : value.toString() || ' '}
            </div>
            )
        }
      </div>
    );
  }
}

EditableCell.propTypes = {
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array
};

export default EditableCell;