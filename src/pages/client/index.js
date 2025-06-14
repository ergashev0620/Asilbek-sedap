import React from "react";
import { Box } from "@mui/system";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useUsersWithRestaurants } from "@/hooks/useUsersWithRestaurants";

export default function Client() {
  const user = useCurrentUser();
  const { users, loading } = useUsersWithRestaurants();
  console.log("users", users);
  return (
    <Box>
      {users.map((item) => (
        <RestaurantCards key={item.id} items={item} />
      ))}
    </Box>
  );
}

function RestaurantCards({ items }) {
  return (
    <Box>
      <p>{items?.restaurant?.name}</p>
    </Box>
  );
}
