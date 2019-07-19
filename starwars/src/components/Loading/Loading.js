import React from "react";
import { Container, Header, Icon } from "semantic-ui-react";

const Loading = () => {
  return (
    <Container text textAlign="center">
      <Header size="huge">
        <div>
          <Icon loading name="spinner" />
          <Header.Content>Loading...</Header.Content>
        </div>
      </Header>
    </Container>
  );
};

export default Loading;
