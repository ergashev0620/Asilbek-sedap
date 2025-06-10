import React from "react";
import CustomBtnFood from "@/components/pages/foods/CustomBtnFood";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

function CategoryTable({ categories, onDelete, onRefetch, setCat }) {
  const handleEdit = (cat) => {
    setCat(cat);
    console.log("categori table", cat);
  };

  const handleDelete = (cat) => {
    onDelete(cat.documentId);
    onRefetch();
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell
              sx={{ textAlign: "end", paddingRight: "40px" }}
              colSpan={2}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>{cat.id}</TableCell>
                <TableCell>{cat.attributes?.name || cat.name}</TableCell>
                <TableCell>
                  {cat.attributes?.description || cat.description || "-"}
                </TableCell>
                <TableCell
                  sx={{ display: "flex", gap: "20px", justifyContent: "end" }}
                >
                  <CustomBtnFood
                    onClick={() => handleEdit(cat)}
                    back="#FF5B5B26"
                    img="/foodIcon2.png"
                    text="Edit"
                  />
                  <CustomBtnFood
                    onClick={() => handleDelete(cat)}
                    back="#2D9CDB26"
                    img="/foodIcon3.png"
                    text="Delete"
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Hech qanday category topilmadi
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default CategoryTable;
