import { useStateContext } from "../context/ContextProvider";
import userAxiosClient from "../axios-user-client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import menuBanner from './Styles/images/menu-banner.jpg'
import menuBannerGlass from './Styles/images/menu-banner-Glass.png'
import border from './Styles/images/border.png'
import './Styles/MenuStyles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
    const { adminToken, token } = useStateContext();
    const [foods, setFoods] = useState([]);
    const navigate = useNavigate();
    const [openItems, setOpenItems] = useState({});
    const [clickedItems, setClickedItems] = useState({});
    

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
            Appetizer: [],
            Fish: [],
            Steak: [],
            Soup: [],
            Salad: [],
            Dessert: [],
        },
        Drink: {
            Tea: [],
            Coffee: [],
            Juice: [],
            Mocktail: [],
            Alcohol: [],
        },
    };

    foods.forEach((food) => {
        const { food_type, food_category } = food;
        if (organizedFoods[food_type] && organizedFoods[food_type][food_category]) {
            organizedFoods[food_type][food_category].push(food);
        }
    });

    //toggle
    const toggleDetails = (food) => {
        setOpenItems((prevOpenItems) => {
            return {
                ...prevOpenItems,
                [food.id]: !prevOpenItems[food.id]
            }
        })
    }

    //mobile click
    const handleClick = (food) => {
        const updatedClickedItems = { ...clickedItems };
        
        updatedClickedItems[food.id] = !updatedClickedItems[food.id];
        
        setClickedItems(updatedClickedItems);
};

    return (
        <div className="menu-wrapper">
            <header className="menu-header">
                <img className="background-menu" src={menuBanner} />
                <h1 className="lg:text-8xl md:text-7xl text-6xl header-menu-color header-menu-font menu-header-text">-Menu-</h1>
                <img className="background-menu-glass" src={menuBannerGlass} />
        </header>
            <div className="menu-normal w-full absolute section2-menu">
                <div className="container mx-auto relative">
                    <img src={border} className="rotate-180 -scale-x-100 absolute xl:w-2/12 md:w-1/6 w-1/3 -top-20 border-menu"/>
                    <div className="mx-auto 2xl:w-2/5 lg:w-2/5 md:w-1/2 w-3/4 mt-20">
                    {adminToken && (
                            <>
                                <a href="/EditMenuForm" className="description-menu-font text-base menu-button p-2 rounded-full z-10 relative">Add Menu Item</a>
                            </>
                        )}                    
                        <div>
                            {Object.entries(organizedFoods).map(([foodType, categories]) => (
                                <div key={foodType}>
                                    {Object.values(categories).some(category => category.length > 0) && (
                                        <>
                                            <h2 className="lg:text-5xl md:text-4xl text-4xl header-color header2-menu-font text-center mt-10">{foodType}</h2>
                                            {Object.entries(categories).map(([category, items]) => (
                                                <div key={category}>
                                                    {items.length > 0 && (
                                                        <div>
                                                            <h3 className="header-color header2-menu-font text-3xl">{category}</h3>
                                                            {items.map((food) => (
                                                                <div onClick={() => toggleDetails(food)} className="cursor-pointer hoverable-menu" data-aos="fade-right">
                                                                    <div  key={food.id}
                                                                        onClick={() => handleClick(food)}
                                                                        className={`hoverable-menu ${clickedItems[food.id] ? 'clicked' : ''}`}>
                                                                        <hr className="menu-divider mx-auto my-5"/>
                                                                        <div className="mx-4" key={food.id}>
                                                                            <div className="flex justify-between">
                                                                                <div className="flex flex-col">
                                                                                    <p className="subheader-menu-color subheader-menu-font lg:text-2xl md:text-2xl text-lg">{food.food_name}</p>
                                                                                    <p className="description-menu-font description-menu-color lg:text-2xl sm:text-2xl text-base">{formattedCost(food.cost)}</p>
                                                                                </div>
                                                                                <div onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                }} className="h-1">
                                                                                    <div className="flex items-center">
                                                                                        {adminToken ? (
                                                                                            <div className="w-32">
                                                                                                <Link
                                                                                                    to={"/EditMenuForm/" + food.id}
                                                                                                    className="mr-3 description-menu-font text-base menu-button p-2 rounded-full"
                                                                                                >
                                                                                                    Edit
                                                                                                </Link>
                                                                                                <button onClick={(e) => onDelete(food)} className="description-menu-font text-base menu-button p-2 rounded-full">
                                                                                                    Delete
                                                                                                </button>
                                                                                            </div>
                                                                                        ) : (
                                                                                            <div className="mt-3">
                                                                                                {localStorage.getItem("order") &&
                                                                                                JSON.parse(localStorage.getItem("order"))[food.id] ? (
                                                                                                    <div className="h-10 w-20 mx-auto">
                                                                                                        <button className="mr-2 description-menu-color increment-decrement-menu-button"
                                                                                                            onClick={() => removeFromPlate(food)}
                                                                                                        >
                                                                                                            <FontAwesomeIcon icon={faCircleMinus} />
                                                                                                        </button>
                                                                                                        <span className="description-menu-color lg:text-2xl sm:text-2xl text-base">
                                                                                                            {
                                                                                                                JSON.parse(localStorage.getItem("order"))[food.id]
                                                                                                            }
                                                                                                        </span>
                                                                                                        <button className="ml-2 description-menu-color increment-decrement-menu-button"
                                                                                                            onClick={() => addToPlate(food)}>
                                                                                                            <FontAwesomeIcon icon={faCirclePlus} />
                                                                                                        </button>
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <div className="h-5" onClick={() => addToPlate(food)}> 
                                                                                                        <button className="description-menu-font text-base menu-button p-2 rounded-full w-28">
                                                                                                            Add to Plate
                                                                                                        </button>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className={`menu-item-details ${openItems[food.id] ? 'open' : ''}`}>
                                                                                <div className="lg:flex md:flex">
                                                                                    <div className="mr-3">
                                                                                        <img
                                                                                            className="rounded menu-image object-cover"
                                                                                            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${food.food_image}`}
                                                                                            alt={food.food_name}
                                                                                            onError={(e) => {
                                                                                                try {
                                                                                                    e.preventDefault();
                                                                                                } catch (error) {}
                                                                                                handleImageError(food);
                                                                                            }}
                                                                                        />
                                                                                    </div>
                                                                                    <p className="description-menu-color description-menu-font text-base my-auto w-3/4">{food.description}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <hr className="menu-divider mx-auto my-5"/>
                                                                    </div>
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
                    </div>
                    <img src={border} className="-scale-x-100 absolute xl:w-2/12 md:w-1/6 w-1/3 z-10 right-0"/>
                </div>
            </div>
        </div>
    );
}
