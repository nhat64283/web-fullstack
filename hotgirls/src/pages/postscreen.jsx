import React, { Component } from 'react';

class postscreen extends Component {
    render() {

                   render() {
        return (
            <div className='row mt-5'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <form>
                        <div className='form-group'>
                            <div
                                style={{
                                    position: `relative`,
                                    top: `30px`,
                                    textAlign: 'center',
                                }}
                            >Select image ...</div>
                            <input
                                id='file'
                                type='file'
                                className='form-control'
                                accept="image/*"
                                style={{
                                    color: 'transparent',
                                    margin: `0 auto`,
                                    textIndent: `-999em`,
                                    zIndex: 10,
                                    height: `50px`
                                }}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder='Please input content ...'
                                value={this.state.content}
                            ></textarea>
                        </div>
                        {this.state.errorMessage ? (
                            <div class="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                        ) : null}
                        <div className='form-group'>
                            <input type='submit' className='btn btn-primary' value='Create Post' />
                        </div>
                    </form>
                </div>
                <div className='col-2'></div>
            </div>
        )
    }
         
    }
}

export default postscreen;