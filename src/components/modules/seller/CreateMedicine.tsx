"use client";

import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";

import { Category } from "@/shop";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { shopService } from "@/service/shop.service";

const medicineSchema = z.object({
  name: z.string().min(3),
  price: z.number().min(1),
  stock: z.number().min(0),
  description: z.string().min(5),
  image: z.string().url(),
  categoryId: z.string().min(1),
});

export function CreateMedicine() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await shopService.getCategories();
        setCategories(data);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      description: "",
      image: "",
      categoryId: "",
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating medicine...");

      try {
        await shopService.createMedicine(value);
        toast.success("Medicine Created Successfully", { id: toastId });
        form.reset();
      } catch (err: any) {
        toast.error(err.message || "Something went wrong", {
          id: toastId,
        });
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Medicine</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* NAME */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* PRICE */}
            <form.Field name="price">
              {(field) => (
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* STOCK */}
            <form.Field name="stock">
              {(field) => (
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* DESCRIPTION */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* IMAGE */}
            <form.Field name="image">
              {(field) => (
                <Field>
                  <FieldLabel>Image URL</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* CATEGORY DROPDOWN */}
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <select
                    className="w-full border rounded p-2"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </CardContent>

      <CardFooter />
    </Card>
  );
}
