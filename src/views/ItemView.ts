import Item from "../models/Item";
import User from "../models/User";
import imagesView from "./ImagesView";
import userView from "./UserView";

export default {
  render(item: Item) {
    return{
      item_id: item.item_id,
      name_item: item.name_item,
      price: item.price,
      description: item.description,
      category: item.category,
      user_id: item.user_id, 
      images: imagesView.renderMany(item.images)
    };
  },
  
  renderMany(items: Item[]) {
    return items.map(item => this.render(item));
  },
  
}
