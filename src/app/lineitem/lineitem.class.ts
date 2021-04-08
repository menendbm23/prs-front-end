import { Request } from "../request/request.class";
import { Product } from "../product/product.class";



export class LineItem {
    id: number = 0;
    requestId: number = 0;
    request: Request = null;
    productId: number = 0;
    product: Product = null;
    quantity: number = 0;
}