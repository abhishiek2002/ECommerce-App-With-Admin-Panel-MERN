import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function ShoppingProductTile({ product }) {
  const actualPrice = (product?.price)*(100 - product?.discount)/100
  return (
    <Card className="w-full max-w-sm mx-auto pt-0 h-full">
      <div>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          {
            product && product.discount > 0 ? (
              <span className="absolute top-3 left-3 bg-red-600 text-white rounded-xl px-2">Sale</span>
            ) : null
          }
        </div>
      </div>
      <CardContent className="p-4 h-full flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-2">
            {product?.name || "Product One"}
        </h2>
        <div className="flex justify-between items-center mb-2 font-semibold">
            <span className="text-sm text-muted-foreground">
                {product?.category || "Men"}
            </span>
            <span className="text-sm text-muted-foreground">
                {product?.brand || "Nike"}
            </span>
        </div>
        <div className="flex justify-between items-center mb-2 font-semibold">
            <span className={`text-sm ${product?.discount > 0 ? "line-through text-red-500" : null}`}>
                ${product?.price || "100"}
            </span>
            <span className={`text-sm ${product?.discount > 0 ? "" : "hidden"}`}>
                ${actualPrice }
            </span>
        </div>
        <Button className="w-full cursor-pointer">
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
}
