import { useStateContext } from "../context/ContextProvider";
import userAxiosClient from "../axios-user-client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Menu() {
    const { adminToken, token } = useStateContext();
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();

    //functions
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
        userAxiosClient
            .get("/foods")
            .then((response) => {
                console.log(response.data);
                setFoods(response.data);
            })
            .catch(() => {
                // set loading false here
            });
    };

    const handleImageError = (food) => {
        setFoods((prevFoods) =>
            prevFoods.map((f) =>
                f.id === food.id ? { ...f, imageError: true } : f
            )
        );
    };


    const formattedCost = (cost) => {
        const parsedCost = parseInt(cost);

        if (isNaN(parsedCost)) {
            return "Rp. N/A";
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

    const organizedFoods = {
        Food: {
            appetizer: [],
            fish: [],
            steak: [],
            soup: [],
            salad: [],
            dessert: [],
        },
        Drink: {
            tea: [],
            coffee: [],
            juice: [],
            mocktail: [],
            alcohol: [],
        },
    };

    foods.forEach((food) => {
        const { food_type, food_category } = food;
        if (organizedFoods[food_type] && organizedFoods[food_type][food_category]) {
            organizedFoods[food_type][food_category].push(food);
        }
    });

    return (
        <div className="container mx-auto lg:w-2/5 md:w-1/2 sm:w-full">
            {adminToken && (
                <p>
                    <a href="/EditMenuForm">Add Menu Item</a>
                </p>
            )}
            {Object.entries(organizedFoods).map(([foodType, categories]) => (
                <div key={foodType}>
                    {Object.values(categories).some(category => category.length > 0) && (
                        <>
                            <h2>{foodType}:</h2>
                            {Object.entries(categories).map(([category, items]) => (
                                <div key={category}>
                                    {items.length > 0 && (
                                        <div>
                                            <h3>{category}:</h3>
                                            {items.map((food) => (
                                                <div key={food.id}>
                                                    <div className="flex justify-between">
                                                        <div className="flex flex-col">
                                                            <p>{food.food_name}</p>
                                                            <p>{formattedCost(food.cost)}</p>
                                                        </div>
                                                        <div className="flex items-center">
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
                                                                    JSON.parse(localStorage.getItem("order"))[food.id] ? (
                                                                        <div>
                                                                            <button
                                                                                onClick={() => removeFromPlate(food)}
                                                                            >
                                                                                -
                                                                            </button>
                                                                            <span>
                                                                                {
                                                                                    JSON.parse(localStorage.getItem("order"))[food.id]
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
                                                    </div>
                                                    <img
                                                        src={`${import.meta.env.VITE_API_BASE_URL}/storage/${food.food_image}`}
                                                        alt={food.food_name}
                                                        onError={(e) => {
                                                            try {
                                                                e.preventDefault();
                                                            } catch (error) {}
                                                            handleImageError(food);
                                                        }}
                                                    />
                                                    <p>{food.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
