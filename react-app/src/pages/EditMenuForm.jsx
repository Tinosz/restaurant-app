import { useNavigate, useParams } from "react-router-dom";
import adminAxiosClient from "../axios-admin-client";
import { useEffect, useState } from "react";
import userAxiosClient from "../axios-user-client";

export default function EditMenuForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null);
    const [food, setFood] = useState({
        id: null,
        food_name: "",
        food_type: "",
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
        formData.append("description", food.description);
        formData.append("cost", food.cost);
        formData.append("food_image", food.food_image);

        console.log(formData);

        if (id) {
            formData.append("_method", "PUT");
        }

        if (id) {
            console.log(formData);
            adminAxiosClient.post(`/foods/${food.id}`, formData, {
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
            adminAxiosClient.post("/foods", formData, {
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
        setFood({ ...food, food_type: e.target.value });
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
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Food Name:</label>
                    {errors && errors.food_name && (
                        <p className="text-red-600">{errors.food_name[0]}</p>
                    )}
                    <div>
                        <input
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
                    <label>Food Image (2MB Max.)</label>
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
                        <div>
                            <img
                                src={food.imageUrl}
                                alt="Food Preview"
                                style={{ maxWidth: "100px" }}
                            />
                        </div>
                    )}
                </div>
                <div>
                    <label>Food Type</label>
                    {errors && errors.food_type && (
                        <p className="text-red-600">{errors.food_type[0]}</p>
                    )}
                    <div>
                        <label>
                            Food
                            <input
                                type="radio"
                                name="food_type"
                                value="Food"
                                checked={food.food_type === "Food"}
                                onChange={handleFoodTypeChange}
                            />
                        </label>
                        <label>
                            Drink
                            <input
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
                    <label>Cost</label>
                    {errors && errors.cost && (
                        <p className="text-red-600">{errors.cost[0]}</p>
                    )}
                    <div>
                        <input
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
                    <label>Food Description: (Max. 280 Characters)</label>
                    {errors && errors.description && (
                        <p className="text-red-600">{errors.description[0]}</p>
                    )}
                    <div>
                        <textarea
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
                <button>{id ? "Edit" : "Add"}</button>
            </form>
        </div>
    );
}
