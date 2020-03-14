import React, {Component} from 'react';

class Inputfield extends Component {


    render(){
        const _id = this.props.id
        const _label = this.props.label_tag
        const _input_type = this.props.input_type
        const _placeholder = this.props.placeholder
        const _icon = this.props.icon_class
        const _on_change = this.props.on_text_change_listener
        const _value = this.props.default_value
        const _field_type = this.props.field_type
        
        const input_label = <label className="col-form-label-lg">{_label}</label>
        
        const input_field_type = <input 
                                    type={_input_type} 
                                    className="form-control form-control-lg" 
                                    id={_id} 
                                    placeholder={_placeholder}
                                    onChange={_on_change}
                                    value={_value}></input>
        
        const text_area_field_type = <textarea
                                        row={"5"}
                                        col={"5"}
                                        type={_input_type}
                                        className="form-control form-control-lg"
                                        id={_id}
                                        placeholder={_placeholder}
                                        onChange={_on_change}
                                        value={_value}></textarea>
        let render_field = ''

        if (_field_type === 'text-area'){
            render_field = text_area_field_type
        }
        else if (_field_type === 'date-time'){

        }
        else if (_field_type === 'select'){

        }
        else if (_field_type === 'custom'){
            render_field = this.props.custom_field
        }
        else{
            render_field = input_field_type
        }

        return(
            <div className="form-group row">
                {input_label}
                <div className={`input-group`}>
                    <span className="input-group-prepend">
                        <span className="input-group-text"><i className={_icon}/></span>
                    </span>
                    {render_field}
                </div>
            </div>
        );
    }
}
export default Inputfield;