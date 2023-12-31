import React from 'react'; 

class Search extends React.Component{ 

    state = {term: ''}; 

    onFormSubmit = (event) => {
        event.preventDefault();                         //Prevents the browser from submitting the form when the user presses enter key
        this.props.onSearch(this.state.term);           //Calling the function onSearch in the parent (App) component
    }


    render(){
        
        return (
            <div>
                <div>
                    <h2>
                        <i aria-hidden="true" className="train icon"></i>
                        <div>Commuter's Rail Schedule</div>
                    </h2>
                </div>
                <br />
                <form onSubmit = {this.onFormSubmit}>
                    <div>
                        <label>Route Search</label>
                        <input type="text" value = {this.state.term} onChange={(e) => this.setState({term: e.target.value})}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;