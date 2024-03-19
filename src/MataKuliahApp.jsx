import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

function MataKuliahApp() {
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const addItem = (newItem) => {
    console.log(items);
    const isDuplicate = items.find(
      (item) =>
        item.name.trim().toLowerCase() === newItem.name.trim().toLowerCase()
    );
    if (isDuplicate) {
      alert("Item ini sudah ada loh! Yuk masukkan yang lain");
      return;
    }

    if (newItem.name.trim() === "") {
      alert("Kamu Belum Isi Apapun Nih. Yuk Isi Dulu!");
      return;
    }

    setItems([...items, newItem]);
  };

  const handleCheck = (index) => {
    const updatedItems = [...items];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setItems(updatedItems);
  };

  const editItem = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  const removeItem = (index) => {
    setEditIndex(null);
    setItems(items.filter((item, i) => i !== index));
  };

  const removeAllItems = () => {
    setItems([]); // Menghapus semua item dari daftar
  };

  const removeCheckedItems = () => {
    if (items.some((item) => item.isChecked)) {
      if (
        window.confirm(
          "Anda yakin ingin menghapus item yang sudah di CheckList?."
        )
      ) {
        setItems(items.filter((item) => !item.isChecked)); // Menghapus item yang sudah dicentang
      }
    } else {
      alert("Tidak ada item yang di CheckList.");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const filteredItems = items.filter((item) => {
    if (filter === "Done") {
      return item.isChecked;
    } else if (filter === "Todo") {
      return !item.isChecked;
    } else {
      return true;
    }
  });
  console.log(items);

  return (
    <>
      <div>
        <div className="container mx-auto px-6 mt-5">
          <div className="flex flex-1 flex-col justify-center text-center p-5 mx-4">
            <h1 className="text-3xl font-bold ">Daftar Mata Kuliah</h1>
          </div>
        </div>

        <div className="container mx-auto justify-center flex">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs"
              onSubmit={handleSearchSubmit}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                className="border rounded px-6 py-2 mb-2 w-full "
              />

              <button
                className="bg-blue-400 hover:bg-green-200 text-white font-bold py-2 px-4 w-full"
                type="submit"
              >
                Search
              </button>
            </form>
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs"
              onSubmit={(e) => {
                e.preventDefault();
                const newItemName = e.target.itemName.value;
                addItem({
                  id: Date.now(),
                  isChecked: false,
                  name: newItemName,
                });
                e.target.reset();
              }}
            >
              <input
                type="text"
                name="itemName"
                placeholder="Masukkan Mata Kuliah..."
                className="border rounded px-6 py-2 mb-2"
              />
              <button
                type="submit"
                className="bg-blue-400 hover:bg-green-200 text-white font-bold py-2 px-4 rounded"
              >
                Add Item
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-10">
          <h1 className="text-3xl font-bold">TodoList</h1>
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 mr-5"
            onClick={() => setFilter("All")}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Done")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 "
          >
            Done
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 ml-5"
            onClick={() => setFilter("Todo")}
          >
            Todo
          </button>
        </div>

        <ul className="mx-4 justify-center">
          {filteredItems
            .filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => (
              <li
                key={item.id}
                className="mt-4 border rounded-md shadow md:w-[500px] h-[60px] mx-auto flex items-center justify-between px-6 py-5"
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="border rounded px-4 py-2 w-2/3"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          editItem(index, { ...item, name: editedName });
                          setEditedName("");
                          setEditIndex(null);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Save
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          setEditIndex(null);
                          setEditedName("");
                        }}
                      >
                        Batal
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={`${item.isChecked ? "line-through" : ""}`}>
                      {item.name}
                    </span>
                    <div className="flex space-x-2">
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => handleCheck(index)}
                      />
                      <button
                        onClick={() => {
                          setEditIndex(index);
                          setEditedName(item.name);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => removeItem(index)}
                        className="bg-yellow-500 hover:bg-yellow-200 text-white font-bold py-2 px-4 rounded"
                      >
                        <FaRegTrashCan />
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
        </ul>

        <div className="text-center">
          <button
            onClick={removeCheckedItems}
            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded mt-8 mr-5"
          >
            Delete Done Tasks
          </button>
          <button
            onClick={removeAllItems}
            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded mt-8 mr-5"
          >
            Delete All Tasks
          </button>
        </div>
      </div>
    </>
  );
}

export default MataKuliahApp;
