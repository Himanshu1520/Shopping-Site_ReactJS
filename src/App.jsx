import { useState, useEffect } from "react";
import Products_View from "./Products_view";

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  const [sortBy, setSortBy] = useState();
  const [categoryBy, setCategoryBy] = useState();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredList(data);
      });
  }, []);

  const handleSearch = (searchText) => {
    let searchFiltered = [...filteredList];
    searchFiltered = searchFiltered.filter(
      (n) =>
        n.name.toLowerCase().includes(searchText.toLowerCase()) ||
        n.category.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(searchFiltered);
    setFilteredList(searchFiltered);
  };

  const handleSort = (optVal) => {
    let filtered = [...products];

    if (categoryBy === "" || categoryBy === undefined) {
      filtered = [...products];
    } else {
      filtered = filtered.filter((item) =>
        item.category.toLowerCase().includes(categoryBy.toLowerCase())
      );
    }
    if (optVal === "l_h") {
      filtered.sort((a, b) => a.price - b.price);
      setFilteredList(filtered);
    } else if (optVal === "h_l") {
      filtered.sort((a, b) => b.price - a.price);
      setFilteredList(filtered);
    } else {
      if (categoryBy === "" || categoryBy === undefined) {
        setFilteredList(products);
      } else {
        filtered = filtered.filter((item) =>
          item.category.toLowerCase().includes(categoryBy.toLowerCase())
        );
        setFilteredList(filtered);
      }
    }
  };

  const handleCategory = (optVal) => {
    let filtered = [...products];

    if (sortBy === "" || sortBy === undefined) {
      filtered = [...products];
    } else {
      if (sortBy === "l_h") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === "h_l") {
        filtered.sort((a, b) => (b.price - a.price));
      } else {
        filtered.filter((item) =>
          item.category.toLowerCase().includes(optVal.toLowerCase())
        );
      }
    }

    filtered = filtered.filter((n) =>
      n.category.toLowerCase().includes(optVal.toLowerCase())
    );

    setCategoryBy(optVal);

    setFilteredList(filtered);
  };

  let catFiltered = [...products];
  const uniqueCategories = [
    ...new Set(catFiltered.map((item) => item.category)),
  ];
  let optionItems = uniqueCategories.map((user) => (
    <option key={user} value={user}>
      {user}
    </option>
  ));

  return (
    <>
      <div className="flex mt-4 border rounded-md border-gray-300 mx-2 justify-between p-4">
        <div className="rounded-md border border-gray-300 ">
          <select
            className="w-30"
            onChange={(e) => {
              setSortBy(e.target.value);

              handleSort(e.target.value);
            }}
          >
            <option value="">Sort By Price</option>
            <option value="l_h">Low to High</option>
            <option value="h_l">High to Low</option>
          </select>
        </div>
        <div className="flex gap-10 ml-4">
          <div className="">
            {/* <Router>
              <nav className="border w-11 text-center bg-yellow-400 cursor-pointer">
                <Link to="/cart">Cart</Link>
              </nav>

              <Routes>
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Router> */}
          </div>

          <div className=" rounded-md border border-gray-300 ">
            <input
              className="placeholder:pl-3"
              type="text"
              placeholder="Search by name"
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
            />
          </div>

          <select
            className="w-36 border border-gray-300 rounded-md "
            onChange={(e) => {
              setCategoryBy(e.target.value);
              handleCategory(e.target.value);
            }}
          >
            <option value="">Categories</option>

            {optionItems}
          </select>
        </div>
      </div>
      <div className=" border m-2 border-gray-300">
        <Products_View
          filteredList={filteredList}
          setFilteredList={setFilteredList}
        />
      </div>
    </>
  );
};

export default App;
