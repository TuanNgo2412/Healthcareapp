import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";


class Handbook extends Component {

    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section"><FormattedMessage id="homepage.handbook" /></span>
                        <button className="btn-section"><FormattedMessage id="homepage.see-all" /></button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="img-customize section-handbook"></div>
                                <div className="img-customize-title">Cẩm nang 1</div>
                            </div>
                            <div className="section-customize">
                                <div className="img-customize section-handbook"></div>
                                <div className="img-customize-title">Cẩm nang 2</div>
                            </div>
                            <div className="section-customize">
                                <div className="img-customize section-handbook"></div>
                                <div className="img-customize-title">Cẩm nang 3</div>
                            </div>
                            <div className="section-customize">
                                <div className="img-customize section-handbook"></div>
                                <div className="img-customize-title">Cẩm nang 4</div>
                            </div>
                            <div className="section-customize">
                                <div className="img-customize section-handbook"></div>
                                <div className="img-customize-title">Cẩm nang 5</div>
                            </div>
                            <div className="section-customize">
                                <div className="img-customize section-handbook"></div>
                                <div className="img-customize-title">Cẩm nang 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
