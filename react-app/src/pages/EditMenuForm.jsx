import { useNavigate, useParams } from "react-router-dom";
import adminAxiosClient from "../axios-admin-client";
import { useEffect, useState } from "react";
import './Styles/MenuFormStyles.css';

export default function EditMenuForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [food, setFood] = useState({
        id: null,
        food_name: "",
        food_type: "",
        food_category: "",
        food_image: null,
        description: "",
        cost: "",
    });

    if (id) {
        useEffect(() => {
            adminAxiosClient
                .get(`/foods/${id}`)
                .then(({ data }) => {
                    setFood(data);
                    console.log(data)
                })
                .catch(() => {});
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("id", food.id);
        formData.append("food_name", food.food_name);
        formData.append("food_type", food.food_type);
        formData.append("food_category", food.food_category);
        formData.append("description", food.description);
        formData.append("cost", food.cost);
        formData.append("food_image", food.food_image);

        console.log(formData);

        if (id) {
            formData.append("_method", "PUT");
        }

        if (id) {
            console.log(formData);
            adminAxiosClient
                .post(`/foods/${food.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    navigate("/Menu");
                })
                .catch((err) => {
                    console.log(err);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            adminAxiosClient
                .post("/foods", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then(() => {
                    navigate("/Menu");
                })
                .catch((err) => {
                    console.log(err);
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    const handleFoodTypeChange = (e) => {
        setFood({ ...food, food_type: e.target.value, food_category: ""});
    };

    const handleFoodCategoryChange = (e) => {
        const selectedFoodCategory = e.target.value;
        setFood({ ...food, food_category: selectedFoodCategory });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFood({ ...food, food_image: selectedFile });

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imageUrl = event.target.result;
                setFood({ ...food, food_image: selectedFile, imageUrl });
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    return (
        <div class="bungkus flex align-middle">
            <form onSubmit={onSubmit}>
                <div>
                    <label class="textMF">Food Name:</label>
                    {errors && errors.food_name && (
                        <p className="text-red-600">{errors.food_name[0]}</p>
                    )}
                    <div>
                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                className="input-form"
                            value={food.food_name}
                            onChange={(e) =>
                                setFood({ ...food, food_name: e.target.value })
                            }
                            type="text"
                            placeholder="Food Name"
                        />
                    </div>
                </div>
                <div>
                    <label class="textMF">Food Image (2MB Max.)</label>
                    {errors && errors.food_image && (
                        <p className="text-red-600">{errors.food_image[0]}</p>
                    )}
                    <div>
                        <input
                            accept="image/*"
                            onChange={handleFileChange}
                            type="file"
                            placeholder="Food Name"
                        />
                    </div>
                    {food.imageUrl && (
                        <div className="food-image">
                            <img
                                src={food.imageUrl}
                                alt="Food Preview"
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label class="textMF">Food Type</label>
                    {errors && errors.food_type && (
                        <p className="text-red-600">{errors.food_type[0]}</p>
                    )}
                    <div>
                        <label class="textMF">
                            Food
                            <input class="input-form"
                                type="radio"
                                name="food_type"
                                value="Food"
                                checked={food.food_type === "Food"}
                                onChange={handleFoodTypeChange}
                            />
                        </label>
                        <label class="textMF">
                            Drink
                            <input class="input-form"
                                type="radio"
                                name="food_type"
                                value="Drink"
                                checked={food.food_type === "Drink"}
                                onChange={handleFoodTypeChange}
                            />
                        </label>
                        </div>
                    </div>
                    <div>
                {errors && errors.food_category && (
                <p className="text-red-600">{errors.food_category[0]}</p>
                )}
                <label className="textMF">Food Category</label>
                <div className="input-form">
                {food.food_type === "" && (
                    <select disabled className="opacity-40 bg-slate-300">
                    <option value=" ">All categories</option>
                    </select>
                )}
                {food.food_type === "Food" && (
                    <select
                    name="food_category"
                    value={food.food_category}
                    onChange={handleFoodCategoryChange}
                    >
                    <option value="Category">Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Fish">Fish</option>
                    <option value="Steak">Steak</option>
                    <option value="Soup">Soup</option>
                    <option value="Salad">Salad</option>
                    <option value="Dessert">Dessert</option>
                    </select>
                )}
                {food.food_type === "Drink" && (
                    <select
                    name="food_category"
                    value={food.food_category}
                    onChange={handleFoodCategoryChange}
                    >
                    <option value=" ">Category</option>
                    <option value="tea">Tea</option>
                    <option value="coffee">Coffee</option>
                    <option value="juice">Juice</option>
                    <option value="mocktail">Mocktail</option>
                    <option value="alcohol">Alcohol</option>
                    </select>
                )}
                </div>
                </div>
                <div>
                    <label class="textMF">Cost</label>
                    {errors && errors.cost && (
                        <p className="text-red-600">{errors.cost[0]}</p>
                    )}
                    <div class="input-form">
                        <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={food.cost}
                            onChange={(e) =>
                                setFood({ ...food, cost: e.target.value })
                            }
                            type="number"
                            placeholder="000000"
                        />
                    </div>
                </div>
                <div>
                    <label class="textMF">Food Description: (Max. 280 Characters)</label>
                    {errors && errors.description && (
                        <p className="text-red-600">{errors.description[0]}</p>
                    )}
                    <div class="input-form">
                        <textarea class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            maxLength="280"
                            value={food.description}
                            onChange={(e) =>
                                setFood({
                                    ...food,
                                    description: e.target.value,
                                })
                            }
                            placeholder="food Description"
                        />
                    </div>
                </div>
                <button class="textMF">{id ? "Edit" : "Add"}</button>
            </form>
        </div>
    );
}