import {toast} from 'react-toastify'
import { CreateUserPurchase } from '../api/UserPurchase/CreateUserPurchaseRequest'


const UserPurchase = ({ tariff, user, updateUser, token }) => {
    const balance = parseFloat(user.balance);
    const price = parseFloat(tariff.price);

    console.log(balance, price, 'JDL');

    const epsilon = 0.0001; // или выберите подходящее значение epsilon

    if (balance >= price - epsilon) {
        CreateUserPurchase({ tariff_id: tariff.id, updateUser: updateUser, token: token });
    } else {
        toast.warning('На балансе недостаточно средств');
    }
};

export default UserPurchase