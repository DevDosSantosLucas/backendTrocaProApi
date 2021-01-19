
import User from "../models/User";

export default {
  render(user: User) {
    return{
      user_id: user.user_id,
      name: user.name,
      city: user.city,
      uf: user.uf,
      // whatsapp: `https://api.whatsapp.com/send?phone=${user.whatsapp}`,
      whatsapp: user.whatsapp,

      avatar: `http://localhost:3333/uploads/${user.avatar}`,
    };
  },

}