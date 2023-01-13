import classNames from "classnames";
import qs from "qs";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import http from "../../http_common";
import Loader from "../loader";
import { IProductSearch } from "./store/type";

const HomePage = () => {
  const { list, isLoaded, count_pages, current_page, total } = useTypedSelector(
    (store) => store.product
  );
  const { GetProductList } = useActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<IProductSearch>({
    name: searchParams.get("name") || "",
    page: searchParams.get("page") || 1,
  });
  const navigate = useNavigate();

  useEffect(() => {
    GetProductList(search);
  }, [search]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const post = new FormData(e.currentTarget);
    const findeName = post.get("searchField");
    setSearch({ ...search, name: `${findeName}`, page: 1 });
    GetProductList(search);
  
    navigate(
      "/?" +
        qs.stringify(
          filterNonNull({ ...search, name: `${findeName}`, page: 1 })
        )
    );
  };

  function filterNonNull(obj: IProductSearch) {
    return Object.fromEntries(Object.entries(obj).filter(([k, v]) => !!v));
  }

  const buttons = [];

  for (let i = 1; i <= count_pages; i++) {
    buttons.push(i);
  }

  const navigateButtons = buttons.map((page) => (
    <li key={page} className="page-item">
      <Link
        className={classNames("page-link", { active: current_page === page })}
        onClick={() => {
          setSearch({ ...search, page });
        }}
        to={"?" + qs.stringify(filterNonNull({ ...search, page }))}
      >
        {page}
      </Link>
    </li>
  ));

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
              if (res.statusText === "OK") GetProductList(search);
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

        <form onSubmit={handleSearchSubmit}>
          <div className="row">
            <div className="col">
              <div className="input-group rounded" style={{ width: `500px` }}>
                <input
                  type="search"
                  name="searchField"
                  className="form-control mb-1 mt-1"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  defaultValue={search.name}
                />
                <input
                  type={"submit"}
                  className="btn btn-primary"
                  value="Найти"
                  style={{ marginLeft: 10, borderRadius: 5 }}
                />
              </div>
            </div>
          </div>
        </form>

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
            <nav aria-label="Page navigation">
              <ul className="pagination">
                {/* <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li> */}
                {navigateButtons}
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
