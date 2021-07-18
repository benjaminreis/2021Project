import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { fetchTodos, editTodo } from "../services/TodoServices";

const TodoTable = ({ children, tableFilter }) => {
  const [items, setItems] = useState();
  const [filteredItems, setFilteredItems] = useState();
  const [tableFilterVal, setTableFilterVal] = useState();

  const loadData = async () => {
    const todoData = await fetchTodos();
    console.log(todoData);
    setItems(todoData);
    console.log(todoData);
  };

  useEffect(() => {
    console.log(tableFilter);
    setTableFilterVal(tableFilter);
    loadData();
  }, []);

  useEffect(() => {
    setTableFilterVal(tableFilter);
  }, [tableFilter]);

  useEffect(() => {
    console.log(items);
    if (items) {
      filterTableData();
    }
  }, [tableFilterVal, items]);

  const filterTableData = () => {
    let itemsToFilter = [...items];
    let filteredItems = [];
    switch (tableFilterVal) {
      case "all":
        filteredItems = [...itemsToFilter];
        break;
      case "completed":
        filteredItems = itemsToFilter.filter((x) => x.isComplete === true);
        break;
      case "incomplete":
        filteredItems = itemsToFilter.filter((x) => x.isComplete === false);

        break;
      default:
        filteredItems = [...itemsToFilter];
        break;
    }
    console.log(filteredItems);
    setFilteredItems(filteredItems);
  };
  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

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
    if (filteredItems != null) {
      return (
        <>
          <BootstrapTable
            keyField={"id"}
            columns={columns}
            // bordered={false}
            data={filteredItems}
            bootstrap4={true}
            pagination={paginationFactory()}
          />
        </>
      );
    } else {
      return null;
    }
  };

  return <>{renderTable()}</>;
};

TodoTable.defaultProps = {
  tableFilter: "all",
};

export default TodoTable;
