import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react';
import { CloudinaryContext, Transformation } from 'cloudinary-react';
import Services from '../services/Services';
import Image from 'react-image-resizer';
import AdminHeader from './AdminHeader';

class gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
      dataLoaded: false,
      title: '',
      description: '',
    };
    this.renderSingleAdded = this.renderSingleAdded.bind(this);
    this.uploadWidget = this.uploadWidget.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const { title, description } = this.state;

  }

  componentDidMount() {
    Services.getProducts()
      .then(products => {
        console.log('Returned all products', products);
        this.setState({
          dataLoaded: true,
          data: products.data.products,
          gallery: products.data.images.resources,
        });
        console.log(this.state.gallery);
      })
      .catch(err => {
        console.log('error in getting all products');
      });
  }

  uploadWidget() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: 'bbandida', upload_preset: 'q0zswxx7', tags: ['photos'] },
      function(error, result) {
        _this.setState({ gallery: _this.state.gallery.concat(result) });
      },
    );
  }

  renderSingleAdded() {
    return <Image publicId={this.state.url} />;
  }

  render() {
    const { title, description } = this.state;
    return (
      <div>
        <AdminHeader />
        <br />
        <br />
        <Grid>
          <Grid.Column width={4}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                fluid
                label="Title"
                placeholder="title"
                value={title}
                onChange={this.handleChange}
              />
              <Form.TextArea
                label="About"
                value={description}
                placeholder="Tell us about this..."
                onChange={this.handleChange}
              />
              <Form.Button>Submit</Form.Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={10}>
            <h1>Galleria</h1>
            <div className="upload">
              <button
                onClick={this.uploadWidget.bind(this)}
                className="upload-button"
              >
                Add Image
              </button>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default gallery;