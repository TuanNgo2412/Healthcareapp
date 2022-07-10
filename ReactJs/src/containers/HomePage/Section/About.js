import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import '../../../styles/responsive.scss';


class About extends Component {

    render() {
        return (
            <div className=" section-about">
                <div className="section-about-header">
                    <FormattedMessage id="homepage.about-doctor" />
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe
                            width="100%" height="400px" src="https://www.youtube.com/embed/3xccmeAsy8g"
                            title="YouTube video player"
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullscreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <p>Lorem ipsum dolor sit amet. Ut sint dolorem aut officiis maiores eum rerum quos non nihil architecto qui internos dicta qui quia odit. Eum odio eveniet sed voluptates asperiores ad doloremque tempore ex rerum quis vel temporibus voluptate et internos similique. Est accusamus reprehenderit sit dolor molestias et magni eveniet ex perspiciatis ratione non temporibus necessitatibus ut voluptas dolorem nam velit rerum?<br></br>
                        </p>
                        <p>
                            Et odio sapiente et ipsam harum sed quaerat eius eum asperiores necessitatibus ut nostrum tempore est obcaecati minima et animi praesentium. Aut temporibus deleniti et totam dolorum in nisi consequuntur qui aspernatur sunt.<br></br>
                        </p>
                        <p>
                            Ut eveniet maxime et odio fugiat in natus explicabo et quos distinctio ab tempore quod et placeat cumque a omnis provident. A culpa iure ut veritatis rerum et nulla architecto ab saepe dolor aut quasi officiis.
                        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
