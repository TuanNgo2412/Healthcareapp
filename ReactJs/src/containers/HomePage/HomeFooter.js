import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {

    render() {
        return (
            <div className="home-footer">
                <p>&copy; 2022 Tuấn Ngô. More information, please visit my linkedin.
                    <a href="https://www.linkedin.com/in/tuan-hoang-ngo-070286233/">
                        &#8594; Click here &#8592;
                    </a>
                </p>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
