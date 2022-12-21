import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../loader";

interface IProduct {
  id: number;
  name: string;
  detail: string;
  created_at: string;
  updated_at: string;
}

const HomePage = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get<IProduct[]>("http://laravel.pv016.com/api/products").then((response) => {
        setProducts(response.data);
        setIsLoaded(true);
      }).then((error)=>{
        console.log(error);
        
      });
  }, []);

  const listItems =  products.map((item, index) => (
    <tr key={item.id}>
      <th>{index+1}</th>
      <td> {item.name}</td>
      <td> {item.detail}</td>
      <td> {item.created_at}</td>
    </tr>
  ));

  if (!isLoaded) {
    return <Loader/>
  } else {
    return (
        <>
        <h1> Головна сторінка</h1>

      <div className="row">
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th >#</th>
                <th >Name</th>
                <th >Description</th>
                <th >Create date</th>
              </tr>
            </thead>
            <tbody>
                 {listItems}
            </tbody>
          </table>
        </div>
      </div>
      </>
    );
  }
}

export default HomePage;
