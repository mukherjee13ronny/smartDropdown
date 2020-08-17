import React, { Component } from 'react';
import axios from 'axios';
import List from './List';
import { Button } from '../../node_modules/react-bootstrap';

const styles = {
    box: {
        "border": "1px solid #000000",
        "width": "400px"
    },
    input: {
        "listStyleType": "none"
    },
    button: {
        "margin": "10px",
        "backgroundColor": "#0084a6",
        "color": "#ffffff"
    }
};

class Dropdown extends Component {

    state = {
        search: '',
        privelage: true,
        countries: [],
        dispalyCountries: []
    }

    async componentDidMount() {
        /* Please Install json server with command "npm i -g json-server" for Fake API to work*/
        /* Please run "npm json-server", confriguartion done in react scripts in package.json*/
        await axios.get("http://localhost:4200/countries")
            .then((response) => {
                this.setState({
                    countries: response
                })
            })
            .catch((error) => {
                this.setState({
                    countries: ["India", "Singapore", "Australia", "Qatar", "Riyadh", "Phillipines", "Japan", "Russia"]
                })
            })
        this.setState({
            dispalyCountries: this.state.countries.slice(0, 5)
        })
    }

    updateSearch = (e) => {
        this.setState({ search: e.target.value });
    }

    fetchMore = () => {
        // Fetching more countries to display
        this.setState({ dispalyCountries: this.state.countries });
    }

    handleSelect = (country, index) => e => {
        /*For selecting countries in the list and logging it */
        console.log(country);
        alert(country)
    }

    handleAdd = () => {
        /*For Adding new country, User can add new country if user have privilage */
        this.state.countries.push(this.state.search)
        this.setState({
            search: ""
        })
    }

    handlePrev = () => {
        /*For giving and revoking privilage  to add and select country*/
        this.state.countries.push(this.state.search)
        this.setState({
            privelage: !this.state.privelage
        })
    }

    render() {
        const { countries, dispalyCountries, search, privelage } = this.state;
        return (
            <React.Fragment>
                <div style={styles.box}>
                    {/* Input Field to search */}
                    <div className='SearchInput'>
                        <input type='text'
                            style={styles.input}
                            placeholder="Search..."
                            value={search}
                            onChange={this.updateSearch.bind(this)} />
                    </div>
                    {/* List is the child component to dispaly the list of countries,
                    search is the searched country,
                    dispalyCountries is the list of countries to display */}
                    <List
                        search={search}
                        fetchMore={this.fetchMore}
                        handleAdd={this.handleAdd}
                        handleSelect={this.handleSelect}
                        countries={countries}
                        privelage={privelage}
                        dispalyCountries={dispalyCountries}
                    />
                </div>
                {/* Button for Adding and revoking privelage */}
                <button
                    style={styles.button}
                    onClick={this.handlePrev}>
                    {privelage ? "Revoke Privelage" : "Add Privelage"}
                </button>
            </React.Fragment>
        )
    }
};

export default Dropdown;