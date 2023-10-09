import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxiosClient from "../axios-user-client";

export default function Order() {
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();
    const [totalCost, setTotalCost] = useState(0);

    useEffect(() => {
        getFoods();
    }, []);

    useEffect(() => {
        calculateTotalCost(); // Calculate total cost initially
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

        //process order to database;

        //go somewhere after order
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
    //Orders can only be seen when Foods are added from the menu
    //if not, the text saying that there is no order
    return (
        <div>
            {localStorage.getItem("order") &&
            Object.keys(JSON.parse(localStorage.getItem("order"))).length >
                0 ? (
                <div>
                    {foods
                        .filter((food) => {
                            const orderId = JSON.parse(
                                localStorage.getItem("order")
                            );
                            return orderId && orderId[food.id] > 0;
                        })
                        .map((food) => (
                            <div key={food.id}>
                                <p>{food.food_name}</p>
                                <p>{formattedCost(food.cost)}</p>
                                <button onClick={() => removeFromPlate(food)}>
                                    -
                                </button>
                                <span>
                                    {
                                        JSON.parse(
                                            localStorage.getItem("order")
                                        )[food.id]
                                    }
                                </span>
                                <button onClick={() => addToPlate(food)}>
                                    +
                                </button>
                            </div>
                        ))}
                    <p>Total Cost: {formattedCost(totalCost)}</p>
                    <a href="/" onClick={orderProcess}>
                        Order Now
                    </a>
                </div>
            ) : (
                <p>Currently, there is no order.</p>
            )}
        </div>
    );
}
