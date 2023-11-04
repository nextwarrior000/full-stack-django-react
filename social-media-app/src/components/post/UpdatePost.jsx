import React, { useContext, useState } from "react";
import { Button, Modal, Form, Dropdown } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import { Context } from "../Layout";
function UpdatePost(props) {
  const { post, refresh } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { setToaster } = useContext(Context);

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({});
  const user = getUser();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatePostForm = event.currentTarget;
    if (updatePostForm.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    const data = {
      author: user?.id,
      body: form.body,
    };
    axiosService
      .put(`post/${post?.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Post updated 🚀",
          show: true,
          title: "Post!",
        });
        setForm({});
        refresh();
      })
      .catch((error) => {
        setToaster({ message: "An error occurred." });
        setToaster({ type: "danger" });
      });
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Modify</Dropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                defaultValue={post?.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={form.body === undefined}
          >
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UpdatePost;
