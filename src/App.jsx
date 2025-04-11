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

  const handleSortNSearch = (action, optVal) => {
    let filtered = [...products];
    let searchFiltered = [...filteredList];
    /** Sort Prices */
    if (action === "sortBy") {
      filtered = [...filteredList];
      if (optVal === "l_h") {
        filtered.sort((a, b) => a.price - b.price);
        setFilteredList(filtered);
      } else if (optVal === "h_l") {
        filtered.sort((a, b) => b.price - a.price);
        setFilteredList(filtered);
      } else {
        setFilteredList(products);
      }
    } else if (action === "searchBy") {
      searchFiltered = searchFiltered.filter(
        (n) =>
          n.name.toLowerCase().includes(optVal.toLowerCase()) ||
          n.category.toLowerCase().includes(optVal.toLowerCase())
      );
      console.log(searchFiltered);
      setFilteredList(searchFiltered);
    } else if (action === "categoryBy") {
      let filtered = [...products];
      filtered = filtered.filter((n) =>
        n.category.toLowerCase().includes(optVal.toLowerCase())
      );

      setCategoryBy(optVal);

      setFilteredList(filtered);
    }
  };

  const handleCategoryAfterSort = (category_next) => {
    let updatedProds = [...products];
    console.log(category_next);
    console.log("1.", updatedProds);
    updatedProds = updatedProds.filter((n) =>
      n.category.toLowerCase().includes(category_next.toLowerCase())
    );
    console.log("2.", updatedProds);

    if (sortBy === "l_h") {
      updatedProds.sort((a, b) => a.price - b.price);
    } else if (sortBy === "h_l") {
      updatedProds.sort((a, b) => b.price - a.price);
    }

    setFilteredList(updatedProds);
    console.log("3.", filteredList);
    setCategoryBy("");
    console.log("4.", updatedProds);
  };

  const handleSortAftercategory = (category_next) => {
    let updatedProd = [...filteredList];

    if (category_next === "l_h") {
      updatedProd.sort((a, b) => a.price - b.price);
    } else if (category_next === "h_l") {
      updatedProd.sort((a, b) => b.price - a.price);
    }

    setFilteredList(updatedProd);
    setSortBy("");
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

              if (categoryBy) handleSortAftercategory(e.target.value);
              else handleSortNSearch("sortBy", e.target.value);
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
                handleSortNSearch("searchBy", e.target.value);
              }}
            />
          </div>

          <select
            className="w-36 border border-gray-300 rounded-md "
            onChange={(e) => {
              setCategoryBy(e.target.value);
              if (!sortBy || sortBy === "") {
                handleCategoryAfterSort(e.target.value);
              } else {
                handleSortNSearch("categoryBy", e.target.value);
              }
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
