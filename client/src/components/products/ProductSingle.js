import React, { Component } from 'react';
import { Grid, Image, Button } from 'semantic-ui-react';
import EditPost from '../admin/EditPost';

export default class ProductSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      product: this.props.product,
    };
    this.showEdit = this.showEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  showEdit() {
    this.setState({ show: !this.state.show });
  }

  handleEditClick(product) {
    this.setState({
      product: product,
      show: !this.state.show,
    });
  }

  render() {
    console.log('this is single ', this.props);

    let contributors = this.props.product.contributors.map(contributor => {
      return this.props.contributors.filter(
        contrib => contrib.id === contributor,
      );
    });
    const product = this.props.product;
    return (
      <div>
        <h1>single view</h1>
        <Grid centered columns={2}>
          <Grid.Row verticalAlign="middle">
            <Grid.Column>
              <p>{product.title}</p>
              <p>{product.description}</p>
              {contributors.map(contributor => {
                return (
                  <p>
                    contributor: {contributor[0].name}
                    <br />
                    role: {contributor[0].role}
                    <br />
                    link: {contributor[0].link}
                  </p>
                );
              })}
              <Button primary onClick={this.showEdit}>
                Edit
              </Button>
              {this.state.show ? (
                <EditPost
                  product={product}
                  contributor={this.props.contributors}
                  onClick={this.handleEditClick}
                />
              ) : (
                ''
              )}
            </Grid.Column>
            <Grid.Column>
              <Image src={product.mainimage} />
              {product.images.map(image => {
                return <Image src={image} />;
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
