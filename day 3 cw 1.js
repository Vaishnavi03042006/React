import React,{Component}from 'react';
class ToggleMessage extends Component{
    constructor()
    {
        super();
        this.state={
            isVisible:false
        }
    }
    togglemessage=()=>{
        this.setState(prevState=>(
        {
            isVisible : !prevState.isVisible
        }
        ))
}
render()
{
    return(
        <div>
            <button onClick={this.togglemessage}>
                {this.state.isVisible ?'HideComponent ' : 'show Component'}
                </button>
                {this.state.isVisible && <p>Hi,How are you?</p>}
        </div>
    )
}
}
export default ToggleMessage;