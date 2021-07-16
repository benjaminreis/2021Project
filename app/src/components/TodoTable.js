import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { fetchTodos, editTodo } from "../services/TodoServices";

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

  useEffect(() => {
    console.log(items);
  }, [items]);

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
              <input
                type="checkbox"
                checked={row.isComplete}
                onChange={() => handleTodoToggle(row.id)}
              />
            </label>
          </div>
        );
      },
    },
  ];

  const handleTodoToggle = (id) => {
    let item = items.find((x) => x.id === id);
    item.isComplete = !item.isComplete;
    editTodo(id, item).then((x) => {
      if (!x) {
        setItems([...items]);
      }
    });
  };

  const renderTable = () => {
    if (items != null) {
      return (
        <>
          <BootstrapTable
            keyField={"id"}
            columns={columns}
            // bordered={false}
            data={items}
            bootstrap4={true}
            pagination={paginationFactory()}
          />
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      {renderTable()}
    </>
  );
};

export default TodoTable;
