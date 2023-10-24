import { useEffect, useState } from "react";
import userAxiosClient from "../axios-user-client";
import "./Styles/OrderStyles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function Order() {
    const [foods, setFoods] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        getFoods();
    }, []);

    useEffect(() => {
        calculateTotalCost();
    }, [foods]);

    const getFoods = () => {
        userAxiosClient.get("/foods")
            .then((response) => {
                console.log(response.data);
                setFoods(response.data);
            })
            .catch(() => {
                // set Loading False here
            });
    };

    const orderProcess = (e) => {
        e.preventDefault();

        window.location.href = "/";
        localStorage.removeItem("order");
    };

    const removeFromPlate = (food) => {
        const order = JSON.parse(localStorage.getItem("order")) || {};
        const foodId = food.id;

        if (order[foodId] && order[foodId] > 1) {
            order[foodId]--;
        } else {
            delete order[foodId];
        }

        localStorage.setItem("order", JSON.stringify(order));
        getFoods();
        calculateTotalCost();
    };

    const addToPlate = (food) => {
        const order = JSON.parse(localStorage.getItem("order")) || {};
        const foodId = food.id;

        if (order[foodId]) {
            order[foodId]++;
        } else {
            order[foodId] = 1;
        }

        localStorage.setItem("order", JSON.stringify(order));
        getFoods();
        calculateTotalCost();
    };

    const calculateTotalCost = () => {
        const order = JSON.parse(localStorage.getItem("order")) || {};
        let total = 0;

        for (const foodId in order) {
            const quantity = order[foodId];
            const food = foods.find((f) => f.id === parseInt(foodId));

            if (food) {
                total += food.cost * quantity;
            }
        }

        setTotalCost(total);
    };

    const formattedCost = (cost) => {
        const parsedCost = parseInt(cost);

        if (isNaN(parsedCost)) {
            return "Rp. N/A";
        }
        const costString = parsedCost.toLocaleString("id-ID");
        return `Rp. ${costString}`;
    };

    return (
        <div className="flex justify-center">
            <div className="container lg:mx-auto md:mx-auto relative my-20">
                <div className="outer-box-order rounded-lg px-1 py-5 lg:p-10 md:p-5 lg:w-1/2 lg:mx-auto md:w-3/4 md:mx-auto">
                    <div className="mx-auto">
                    <a href="/Menu" className="back-to-order-button rounded-full p-2">
                            Back to Ordering
                        </a>
                        {localStorage.getItem("order") &&
                        Object.keys(JSON.parse(localStorage.getItem("order"))).length >
                            0 ? (
                            <div>
                                <table className="table-fixed w-11/12 mx-auto mt-4">
                                    <tbody>
                                    {foods
                                        .filter((food) => {
                                            const orderId = JSON.parse(
                                                localStorage.getItem("order")
                                            );
                                            return orderId && orderId[food.id] > 0;
                                        })
                                        .map((food) => (
                                            <tr key={food.id} className="border-b p-3">
                                                    <td>
                                                        <img className="w-32 h-20 object-cover rounded" src={`${import.meta.env.VITE_API_BASE_URL}/storage/${food.food_image}`} />
                                                    </td>
                                                    <td>
                                                        <p className="ml-3 order-text-bold">{food.food_name}</p>
                                                    </td>
                                                    <td className="text-end">    
                                                        <button onClick={() => removeFromPlate(food)}>
                                                            <FontAwesomeIcon icon={faCircleMinus} />
                                                        </button>
                                                        <span className="mx-3">
                                                            {
                                                                JSON.parse(
                                                                    localStorage.getItem("order")
                                                                )[food.id]
                                                            }
                                                        </span>
                                                        <button onClick={() => addToPlate(food)}>
                                                            <FontAwesomeIcon icon={faCirclePlus} />
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <p className="ml-4">{formattedCost(food.cost)}</p>
                                                    </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-end lg:mr-24 md:mr-10 mt-5">
                                    <p className="order-text text-2xl">Total Cost:</p>
                                    <p className="ml-10 order-text text-2xl">{formattedCost(totalCost)}</p>
                                </div>
                                <div className="flex justify-end lg:mr-20 md:mr-10 mt-5">
                                    <a href="/" onClick={orderProcess} className="order-button rounded-full p-2 order-text">
                                        Order Now
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <p className="order-text-bold text-3xl mt-10 text-center">Currently, there is no order.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
