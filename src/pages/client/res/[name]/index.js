import React, { useState, useEffect } from "react";
import useFoods from "@/hooks/useFoods";
import { useRouter } from "next/router";
import useCategory from "@/hooks/useCategories";
import { Box, Link, Button } from "@mui/material";
import { useUsersWithRestaurants } from "@/hooks/useUsersWithRestaurants";
import Purchases from "@/components/pages/purchases/purchases";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCurUser } from "@/hooks/useCurUser";

export default function Bucket() {
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const router = useRouter();
  const { curUser } = useCurUser();
  const { users, loading } = useUsersWithRestaurants();
  const [resName, setResName] = useState(null);
  const catHook = useCategory(resName);
  const [{ categories }] = catHook;
  const [{ foods, isLoading, error }] = useFoods(resName);
  const [foodCount, setFoodCount] = useState(0);
  // const restaurants = curUser?.filter((item) => item.restaurant) || [];
  // const foundRestaurant = restaurants[0] ?? null;
  console.log("router", router.query.name);
  console.log("resname", resName);

  useEffect(() => {
    if (router.isReady && router.query.name) {
      setResName(router.query.name);
    }
  }, [router.isReady, router.query.name]);

  useEffect(() => {
    let result = foods;
    if (search.length > 0) {
      result = foods.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredFoods(result);
  }, [search, foods]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    setFoodCount(totalCount);
  }, []);

  const handlePlusCount = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    const totalCount = cart.reduce((son, i) => son + i.quantity, 0);
    setFoodCount(totalCount);
  };

  const handleMinusCount = (item) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity -= 1;
      if (existing.quantity <= 0) {
        const newCart = cart.filter((i) => i.id !== item.id);
        localStorage.setItem("cart", JSON.stringify(newCart));
        const totalCount = newCart.reduce((son, i) => son + i.quantity, 0);
        setFoodCount(totalCount);
        return;
      }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
    setFoodCount(totalCount);
  };

  let foodsByCat;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "10px",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <CategoryCom key={cat.id} items={cat.name} id={cat.documentId} />
          ))}
        </Box>
      </Box>
      {isLoading && <p style={{ textAlign: "center" }}>Yuklanmoqda...</p>}
      {error && <p>{error}</p>}
      {!isLoading && filteredFoods.length > 0 ? (
        <Box sx={{ padding: "20px", display: "flex" }}>
          <Box>
            {categories.map((cat) => {
              const foodsByCategory = filteredFoods.filter(
                (food) => food.type?.category?.documentId === cat.documentId
              );

              if (foodsByCategory.length === 0) return null;
              foodsByCat = foodsByCategory;

              return (
                <Box key={cat.documentId} style={{ marginBottom: "50px" }}>
                  <h2
                    id={cat.documentId}
                    style={{ margin: "20px 0", fontSize: "24px" }}
                  >
                    {cat.name}
                  </h2>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "40px",
                      maxWidth: "1460px",
                    }}
                  >
                    {foodsByCategory.map((item) => (
                      <Box
                        key={item?.id}
                        style={{
                          width: "276px",
                          borderRadius: "14px",
                          backgroundColor: "#fff",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          position: "relative",
                          paddingTop: "100px",
                          textAlign: "center",
                          margin: "30px 0px",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "-50px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "160px",
                            height: "160px",
                            backgroundColor: "white",
                            borderRadius: "50%",
                            overflow: "hidden",
                            marginTop: "15px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                          }}
                        >
                          <img
                            width={160}
                            height={160}
                            src={item?.image}
                            alt={item?.name}
                            style={{
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                        <Box sx={{ padding: "20px" }}>
                          <h3
                            style={{
                              fontWeight: "700",
                              fontSize: "18px",
                              margin: "0 0 8px 0",
                              marginTop: "10px",
                            }}
                          >
                            {item?.name}
                          </h3>
                          <p
                            style={{
                              color: "#00B074",
                              fontSize: "14px",
                              margin: "0 0 20px 0",
                            }}
                          >
                            {item?.type?.category?.name} / {item?.type?.name}
                          </p>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-around",
                              width: "100%",
                              margin: "20px 0px",
                            }}
                          >
                            <Button
                              onClick={() => handlePlusCount(item)}
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "20px",
                                fontSize: "20px",
                                minWidth: 50,
                                backgroundColor: "#00B074",
                                border: "1px solid #00B074",
                                color: "white",
                                minHeight: 30,
                                "&:hover": {
                                  backgroundColor: "white",
                                  border: "1px solid #00B074",
                                  color: "#00B074",
                                },
                              }}
                            >
                              +
                            </Button>
                            <Button
                              onClick={() => handleMinusCount(item)}
                              sx={{
                                backgroundColor: "white",
                                borderRadius: "20px",
                                fontSize: "20px",
                                minWidth: 50,
                                minHeight: 30,
                                backgroundColor: "#FF5B5B",
                                border: "1px solid #FF5B5B",
                                color: "white",
                                "&:hover": {
                                  backgroundColor: "white",
                                  border: "1px solid #FF5B5B",
                                  color: "#FF5B5B",
                                },
                              }}
                            >
                              -
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Purchases foodsByCat={foodsByCat} />
        </Box>
      ) : (
        <h1 style={{ textAlign: "center" }}>Food topilmadi!</h1>
      )}
    </>
  );
}

const CategoryCom = function ({ items, id }) {
  return (
    <Link
      href={`#${id}`}
      sx={{
        padding: "5px 10px",
        backgroundColor: "#eee",
        borderRadius: "10px",
        fontSize: "14px",
        cursor: "pointer",
        textDecoration: "none",
        color: "black",
        "&:hover": {
          border: "1px solid gray",
          padding: "4px 9px",
          boxShadow: "0px 0px 5px gray",
        },
        "&:active": {
          padding: "4px 9px",
          boxShadow: "0px 0px 5px gray",
          backgroundColor: "gray",
          color: "white",
        },
      }}
    >
      {items}
    </Link>
  );
};
