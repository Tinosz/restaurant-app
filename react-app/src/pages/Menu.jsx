import { useStateContext } from "../context/ContextProvider";
import userAxiosClient from "../axios-user-client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
    const { adminToken, token } = useStateContext();
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getFoods();
    }, []);

    const onDelete = (food) => {
        if (
            !window.confirm("Are you sure you want to delete this menu item?")
        ) {
            return;
        }

        userAxiosClient.delete(`/foods/${food.id}`).then(() => {
            getFoods();
        });
    };

    const getFoods = () => {
        userAxiosClient.get("/foods")
            .then((response) => {
                console.log(response.data);
                setFoods(response.data);
            })
            .catch(() => {
                // set loading false here
            });
    };

    const formattedCost = (cost) => {
        const parsedCost = parseInt(cost);
    
        if (isNaN(parsedCost)) {
            return 'Rp. N/A';
        }
        const costString = parsedCost.toLocaleString("id-ID");
        return `Rp. ${costString}`;
    };
    
    
    

    const addToPlate = (food) => {
        if (!token) {
            navigate("/Login");
            return;
        }

        const order = JSON.parse(localStorage.getItem("order")) || {};
        const foodId = food.id;

        if (order[foodId]) {
            order[foodId]++;
        } else {
            order[foodId] = 1;
        }

        localStorage.setItem("order", JSON.stringify(order));
        getFoods();
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
    };

    return (
        <div>
            {adminToken && (
                <p>
                    <a href="/EditMenuForm">Add Food or Drink</a>
                </p>
            )}
            {foods.map((food) => (
                <div key={food.id}>
                    <p>{food.food_name}</p>
                    <p>{food.description}</p>
                    <img
                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${
                            food.food_image
                        }`}
                        alt={food.food_name}
                    />
                    <p>{formattedCost(food.cost)}</p>
                    {adminToken ? (
                        <div>
                            <Link
                                to={"/EditMenuForm/" + food.id}
                                className="mr-3"
                            >
                                Edit
                            </Link>
                            <button onClick={(e) => onDelete(food)}>
                                Delete
                            </button>
                        </div>
                    ) : (
                        <div>
                            {localStorage.getItem("order") &&
                            JSON.parse(localStorage.getItem("order"))[
                                food.id
                            ] ? (
                                <div>
                                    <button
                                        onClick={() => removeFromPlate(food)}
                                    >
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
                            ) : (
                                <button onClick={() => addToPlate(food)}>
                                    Add to Plate
                                </button>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
