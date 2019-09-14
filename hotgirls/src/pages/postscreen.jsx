import React, { Component } from 'react';

class postscreen extends Component {
    state = {
        imageFile: undefined,
        imageSrc: '',
        content: '',
        errorMessage: '',
      };
      handlecontentchange = (event) => {
        this.setState({
            content: event.target.value,
        });
      };
      handleImageChange(event) {
        event.preventDefault();
    
        let reader = new FileReader();
        let file = event.target.files[0];
    
        reader.onloadend = (data) => {
            console.log(data);
          this.setState({
            file: file,
            imagesrc: data.currentTarget.result,
          });
        }
    
        reader.readAsDataURL(file)
      }
      handleformsubmit = (event) => {
          event.preventDefault();
          const formData = new FormData();
            formData.append('image',this.state.imageFile);
            fetch('http://localhost:3001/uploads/photos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
    
                })
                .catch((error) => {
                    console.log(error);
                    window.alert(error.message);
                });
      }
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
                                onChange = {this.handleImageChange}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder='Please input content ...'
                                value={this.state.content}
                                onChange = {handlecontentchange}
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


export default postscreen;