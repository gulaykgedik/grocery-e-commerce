"use client";

import { addToBasket, checkoutSingleItem } from "@/app/service/basket-service";
import { Product } from "@/app/types";
import { userId } from "@/app/utils/constants";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaShoppingCart, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

const OrderButtons = ({ grocery }: { grocery: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddCart = async () => {
    if (quantity < 1 || grocery.stock < quantity) return;
    setLoading(true);

    try {
      await addToBasket(userId, grocery._id, quantity);
      toast.success(`${quantity} kilo/adet ${grocery.name} sepete eklendi`);
      setQuantity(1);
    } catch (error) {
      console.log(error);
      toast.error("Ürün sepete eklenemedi");
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (quantity < 1 || grocery.stock < quantity) return;
    setLoading(true);

    try {
      const { url } = await checkoutSingleItem(grocery, quantity);

      window.open(url, "_blank");

      setQuantity(1);
    } catch (error) {
      console.error(error);
      toast.error("Ödeme işlemi başlatılamadı");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gray-300 rounded">
          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <FaMinus />
          </button>
          <span className="px-3 py-2 border-x border-gray-300 hover:bg-gray-100 disabled:opacity-50">
            {quantity}{" "}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            disabled={quantity >= grocery.stock}
            className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
        <span className="text-gray-500">Stok: {grocery.stock}</span>
      </div>

      <div className="flex gap-3 mt-4 ">
        <button
          disabled={loading}
          onClick={handleAddCart}
          className="flex-1 bg-white border-2 border-green-600 text-green-600 hover:bg-green-100 transition py-2 px-4 gap-2 flex justify-center items-center rounded-md font-medium disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100"
        >
          {loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <>
              <FaShoppingCart />
              Sepete Ekle
            </>
          )}
        </button>

        <button
          disabled={loading}
          onClick={handleBuyNow}
          className="flex-1 flex justify-center items-center bg-green-600 text-white hover:bg-green-700 transition py-2 px-4 rounded-md font-medium disabled:opacity-90 cursor-pointer disabled:cursor-not-allowed  "
        >
          {loading ? <FaSpinner className="animate-spin" /> : " Hemen Satın Al"}
        </button>
      </div>
    </div>
  );
};

export default OrderButtons;
