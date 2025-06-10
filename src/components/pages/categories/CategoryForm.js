import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
export default function CategoryForm({
  onCreate,
  category,
  onUpdate,
  onCancel,
}) {
  const [form, setForm] = useState({
    documentId: null,
    name: "",
    description: "",
  });
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    if (category) {
      setForm({
        documentId: category.documentId,
        name: category.name,
        description: category.description,
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (form.documentId) {
      onUpdate(form);
    } else {
      onCreate(form);
    }
    setForm({
      documentId: null,
      name: "",
      description: "",
    });
  };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editCategory) {
      setForm({
        documentId: editCategory.documentId || null,
        name: editCategory.name || "",
        description: editCategory.description || "",
      });
    } else {
      setForm({
        documentId: null,
        name: "",
        description: "",
      });
    }
  }, [editCategory]);
  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <TextField
            label="Category nomi"
            name="name"
            value={form.name}
            onChange={handleChange}
            sx={{ flexGrow: 1, minWidth: 200 }}
            disabled={loading}
          />
          <TextField
            label="Category ta'rifi"
            name="description"
            value={form.description}
            onChange={handleChange}
            sx={{ flexGrow: 2, minWidth: 300 }}
            disabled={loading}
          />
        </Box>

        {error && <Box sx={{ color: "error.main", mb: 1 }}>{error}</Box>}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            variant="contained"
            color={form.documentId ? "warning" : "primary"}
            type="submit"
            disabled={loading}
            sx={{ minWidth: 120 }}
          >
            {form.documentId ? "update" : "create"}
          </Button>

          {form.documentId && (
            <IconButton color="error" onClick={onCancel} disabled={loading}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </form>
  );
}