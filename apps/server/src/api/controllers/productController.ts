import { Request, Response } from "express";
import * as productService from "../services/productService";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error: unknown) {
    console.error("Error getting products:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.getProductById(id);
    res.status(200).json(product);
  } catch (error: unknown) {
    console.error("Error getting product by id:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.updateProduct(id, req.body);
    res.status(200).json(product);
  } catch (error: unknown) {
    console.error("Error updating product:", error);
    res.status(500).send("An unexpected error occurred");
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const product = await productService.deleteProduct(id);
    res.status(200).json(product);
  } catch (error: unknown) {
    console.error("Error deleting product:", error);
    res.status(500).send("An unexpected error occurred");
  }
};