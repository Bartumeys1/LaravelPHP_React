import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import Loader from "../loader";
import { IProductItem } from "./store/type";

const HomePage = () => {
  const dispatch = useDispatch();
  const { list } = useTypedSelector((store) => store.product);
  const [isLoaded, setIsLoaded] = useState(false);


  function getAllProducts(){
    http.get<Array<IProductItem>>("/api/products").then((res) => {
      console.log("Responce data ", res);
      dispatch({ type: "PRODUCT_LIST", payload: res.data });
      setIsLoaded(true);
    });
  }
  useEffect(() => {
   getAllProducts();
  }, []);

  const listItems = list.map((item, index) => (
    <tr key={item.id}>
      <th>{index + 1}</th>
      <td> {item.name}</td>
      <td> {item.detail}</td>
      <td> {item.created_at}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            http.delete(`/api/products/${item.id}`).then((res) => {
              if (res.statusText === "OK") 
              getAllProducts();
            });
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  if (!isLoaded) {
    return <Loader />;
  } else {
    return (
      <>
        <h1 className="text-center"> Головна сторінка</h1>
        <div className="text-center">
          <Link to={"add_product"} className={"btn btn-success"}>
            Create product
          </Link>
        </div>
        <div className="row">
          <div className="col">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Create date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{listItems}</tbody>
            </table>
          </div>
        </div>
      </>
    );
  }
};

export default HomePage;
