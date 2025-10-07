import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataContext from "../context/DataContext";
import { useNavigate, useParams } from "react-router-dom";

interface GenreFormInputs {
  name: string;
}

export default function GenreForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const data = useContext(DataContext);
  const { genres, addGenre, updateGenre } = data!;
  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GenreFormInputs>();

  useEffect(() => {
    if (isEdit) {
      const genre = genres.find((g) => g.id === id);
      if (genre) {
        reset({ name: genre.name });
      }
    }
  }, [id, genres, isEdit, reset]);

  const onSubmit = (data: GenreFormInputs) => {
    if (isEdit && id) {
      updateGenre({ id, name: data.name });
    } else {
      addGenre({ id: Date.now().toString(), name: data.name });
    }
    navigate("/genres");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label className="block mb-2">Genre Name:</label>
      <input
        className="border p-2 w-full mb-4"
        {...register("name", { required: true })}
      />
      {errors.name && <span className="text-red-500">Name is required</span>}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isEdit ? "Update Genre" : "Add Genre"}
      </button>
    </form>
  );
}
