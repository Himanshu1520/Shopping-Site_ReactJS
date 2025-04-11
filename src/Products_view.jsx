const Products_View = ({ filteredList}) => {
  const addToCart = (item) => {
    console.log(item);
    var allEntries = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(allEntries);

    const index=allEntries.findIndex(entry=> entry.id=== item.id)

    console.log(index);

    if(index!== -1){
        allEntries[index].quantity+=1
    }
    else{

    allEntries.push({...item,quantity:1});
    }
    console.log(allEntries);
    localStorage.setItem("cart", JSON.stringify(allEntries));
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {filteredList.map((user) => (
        <div key={user.id} className="m-4 h-130 rounded-md shadow-lg">
          <div className="m-3">
            <div className="flex justify-center item-center">
              <img className="h-60" src={user.image} alt={user.name} />
            </div>
            <div className="pt-3 grid gap-4">
              <div>
                <p className="text-2xl font-bold">{user.name}</p>
              </div>

              <div>
                <p className="font-semibold bg-blue">{user.category}</p>
              </div>

              <div>
                <p className="text-xs">{user.description}</p>
              </div>

              <div className="flex  border-none h-6 w-15 bg-green-600 rounded-md">
                <p className="bg-green text-white font-bold pl-1">
                  {user.Rating}
                </p>
                <div className="mt-1 ml-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="12"
                  >
                    <path
                      fill="#FFF"
                      d="M6.5 9.439l-3.674 2.23.94-4.26-3.21-2.883 4.254-.404L6.5.112l1.69 4.01 4.254.404-3.21 2.882.94 4.26z"
                    />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <p className="text-l">
                  <strong>Rs. {user.price}</strong>
                </p>

                <button
                  className="border border-none cursor-pointer bg-yellow-400 h-7 w-25"
                  onClick={() => addToCart(user)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products_View;
