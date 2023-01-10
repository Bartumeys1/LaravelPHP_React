import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import Loader from "../loader";


const HomePage = () => {
  const dispatch = useDispatch();
  const { list } = useTypedSelector((store) => store.product);
  const [isLoaded, setIsLoaded] = useState(false);
  const [findeName, setfindeName] = useState("");
  const [maxPage, setMaxPage] = useState(1);

  function getAllProducts(page: number = 1, name: string = "") {
    http.get(`/api/products?page=${page}&name=${name}`).then((res) => {
      dispatch({ type: "PRODUCT_LIST", payload: res.data });
      setMaxPage(res.data.last_page);
      setIsLoaded(true);
    });
  }

  function getProductsByPage(page: number = 1, name: string = findeName) {
    getAllProducts(page, name);
    dispatch({ type: "PRODUCT_PAGE", payload: page });
  }

  function findeByName(name: string = "") {
    http.get(`/api/products?name=${name}`).then((res) => {
      dispatch({ type: "PRODUCT_LIST", payload: res.data });
      setMaxPage(res.data.last_page);
    });
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleFindebyName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfindeName(event.target.value);
    findeByName(event.target.value);
  };

  const pagePaginationBtn = () => {
    let content = [];
    for (let i = 0; i < maxPage; i++) {
      content.push(
        <li key={i + 1} className="page-item">
          <a
            className="page-link"
            href={`#page=${i + 1}`}
            onClick={() => getProductsByPage(i + 1)}
          >
            {i + 1}
          </a>
        </li>
      );
    }
    return content;
  };

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
              if (res.statusText === "OK") getAllProducts();
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
            Створити новий продукт
          </Link>
        </div>

        <div className="input-group rounded" style={{width:`500px`}}>
          <input
            type="search"
            className="form-control mb-1 mt-1"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={handleFindebyName}
            
          />
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
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {/* <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li> */}
                {/* Вставити елемент сторінок для пагування */}
                {pagePaginationBtn()}
                {/* <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </a>
    </li> */}
              </ul>
            </nav>
          </div>
        </div>
      </>
    );
  }
};

export default HomePage;
