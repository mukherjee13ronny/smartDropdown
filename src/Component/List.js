import React, { Component } from 'react';
import isEmpty from 'lodash/isEmpty';

const styles = {
    unorderedli: {
        "listStyleType": "none"
    },
    button: {
        "margin": "10px",
        "backgroundColor": "#0084a6",
        "color": "#ffffff"
    },
    link: {
        "color" : "blue"
    }
};

class List extends Component {

    render() {
        const { countries, dispalyCountries, search, privelage } = this.props;
        let data = [...dispalyCountries];
        let searchData = search.toLowerCase();
        /*Filtering the country from the list and returning new list of countries */
        if (searchData) {
            data = data.filter((row) => {
                let flag = false;
                if (row.toLowerCase().includes(searchData)) {
                    flag = true;
                }
                return flag;
            });
        };
        return (
            // If the Country is present in list then success block else failed block
            (!isEmpty(data) ?
                (<div>
                    <ul style={styles.unorderedli}>
                        {data.map((country, key) => (
                            <li key={key} onClick={this.props.handleSelect(country)}>{country}</li>
                        ))}
                    </ul>
                    {(countries.length > dispalyCountries.length) ?
                        <span onClick={this.props.fetchMore} style={styles.link}>{countries.length - dispalyCountries.length} more...</span>
                        : null
                    }
                </div>) :
                (<div>
                    <ul style={styles.unorderedli}>
                        <li>
                            {'"'}{search}{'" not Found'}
                            {privelage ?
                                <button
                                    style={styles.button}
                                    onClick={this.props.handleAdd}>
                                    Add & Select
                                </button>
                                : null}
                        </li>
                    </ul>
                </div>))
        )
    }
};

export default List;