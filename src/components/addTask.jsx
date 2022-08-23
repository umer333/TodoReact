import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {render} from "@testing-library/react";

function Example() {


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>


    </>
  );
}

export default Example;

