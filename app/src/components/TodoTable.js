import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Container } from "react-bootstrap";

// import Toast from "react-bootstrap/Toast";
// import Button from "react-bootstrap/Button";
import { fetchTodos } from "../services/TodoServices";

//[{id: 1, name: "test ben", isComplete: false},

const TodoTable = ({ children }) => {
  const [items, setItems] = useState();

  const loadData = async () => {
    const todoData = await fetchTodos();
    console.log(todoData);
    setItems(todoData);
    console.log(todoData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Name of TODO",
    },
    {
      dataField: "isComplete",
      text: "Is Complete",
      formatter: (cellContent, row) => {
        console.log(row);
        return (
          <div className="checkbox disabled">
            <label>
              <input type="checkbox" checked={row.isComplete} disabled />
            </label>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/* // <Container> */}
      {items != null && (
        <BootstrapTable
          keyField={"id"}
          columns={columns}
          // bordered={false}
          data={items}
          bootstrap4={true}
          pagination={paginationFactory()}
        />
      )}
      {/* </Container> */}
    </>
  );
};

export default TodoTable;
