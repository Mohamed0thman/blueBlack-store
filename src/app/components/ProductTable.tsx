import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Product } from "../models";
import { deleteProduct } from "../store/actions/product.action";
import { useAppDispatch } from "../store/configureStore";

type Props = {
  product: Product;
  index?: number;
};

const ProductTable = ({ index, product }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handelOnDelect(id: string) {
    try {
      await dispatch(deleteProduct({ id }));
      toast.success("product deleted successful ");
    } catch (e: any) {
      console.log(e.message);
    }
  }

  return (
    <tr>
      {index ? <td>{index + 1}</td> : null}

      <td>
        <Image src={product.productImage} />
        {product.productName}
      </td>
      <td>{product.totalQuantity}</td>
      <td>{product.ProductPrice}</td>
      <td>{product.discount}</td>
      <td>{product.categoryName}</td>
      <td>{product.subcategoryName}</td>
      <td>
        <Button
          onClick={() => navigate(`/dashboard/products/${product.productName}`)}
        >
          view
        </Button>
        <Button onClick={() => handelOnDelect(product.productId)}>
          delete
        </Button>
      </td>
    </tr>
  );
};

export default ProductTable;
