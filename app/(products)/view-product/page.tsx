"use client";
import { useState, useEffect } from "react";
import withAuth from "@/app/withAuth";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton"; 

const ViewProduct = () => {
  const [orders, setOrders] = useState<any[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isModalLoading, setIsModalLoading] = useState(false); 
  const { toast } = useToast();

 
  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem("userId"); 
      if (!userId) {
        toast({
          title: "Error",
          description: "User ID not found. Please log in.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "https://ebuka-backend.onrender.com/product/all-products",
          { userId } 
        );

       
        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          toast({
            title: "Error",
            description: "Invalid data format received from the server.",
            variant: "destructive",
          });
          setOrders([]); 
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch orders.",
          variant: "destructive",
        });
        setOrders([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [toast]);

  
  const handleProductClick = async (orderId: string) => {
    setIsModalLoading(true); 
    setIsModalOpen(true); 
    try {
      const response = await axios.post(
        "https://ebuka-backend.onrender.com/product/single-product",
        { id: orderId, userId: localStorage.getItem("userId") }
      );

      if (response.data) {
       
        const parsedJprSuggestions = response.data.data.JprSuggestions.map(
          (suggestion: any) => {
            try {
              return {
                ...suggestion,
                optimalOrderQuantities: JSON.parse(suggestion.optimalOrderQuantities || "{}"),
                costBreakdown: JSON.parse(suggestion.costBreakdown || "{}"),
                orderStrategy: JSON.parse(suggestion.orderStrategy || "{}"),
              };
            } catch (error) {
              console.error("Failed to parse JSON:", error);
              return {
                ...suggestion,
                optimalOrderQuantities: {},
                costBreakdown: {},
                orderStrategy: {},
              };
            }
          }
        );

        
        const updatedProduct = {
          ...response.data.data,
          JprSuggestions: parsedJprSuggestions,
        };

        setSelectedProduct(updatedProduct); 
      } else {
        toast({
          title: "Error",
          description: "Product details not found.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch product details.",
        variant: "destructive",
      });
    } finally {
      setIsModalLoading(false); 
    }
  };

  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };


  const headers =
    orders.length > 0 && orders[0].items.length > 0
      ? Object.keys(orders[0].items[0])
      : [];

  return (
    <section className="p-8 w-full min-h-screen bg-gray-50">
      <Link href="/">
        <ChevronLeft size={30} className="bg-white rounded-full p-1 shadow-md hover:bg-gray-100" />
      </Link>
      <h1 className="text-center text-2xl font-serif font-bold text-gray-800 mt-4">
        Your Products
      </h1>
      <div className="mt-8 w-full max-w-6xl mx-auto">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full bg-gray-200 rounded-lg" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <Table className="bg-white rounded-lg shadow-md">
            <TableCaption className="text-gray-600 mt-4">
              A list of your added products.
            </TableCaption>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header} className="capitalize font-bold text-gray-800">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) =>
                order.items.map((item: any) => (
                  <TableRow
                    key={item.id} 
                    onClick={() => handleProductClick(order.id)} 
                    className="cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    {headers.map((header) => (
                      <TableCell key={header} className="py-3">
                        {item[header] === null || item[header] === undefined
                          ? "N/A" 
                          : typeof item[header] === "object"
                          ? JSON.stringify(item[header])
                          : item[header]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Product Details</h2>
            {isModalLoading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-6 w-full bg-gray-200 rounded" />
                ))}
              </div>
            ) : selectedProduct ? (
              <div className="space-y-4">
               
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Items</h3>
                  <div className="space-y-2">
                    {selectedProduct.items.map((item: any) => (
                      <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                        {Object.entries(item).map(([key, value]: any) => (
                          <div key={key} className="text-gray-700">
                            <strong className="capitalize">{key}:</strong>{" "}
                            {value === null || value === undefined
                              ? "N/A"
                              : typeof value === "object"
                              ? JSON.stringify(value)
                              : value}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">JPR Suggestions</h3>
                  <div className="space-y-2">
                    {selectedProduct.JprSuggestions.map((suggestion: any) => (
                      <div key={suggestion.id} className="bg-gray-50 p-4 rounded-lg">
                       
                        {Object.entries(suggestion).map(([key, value]: any) => {
                          
                          if (
                            key === "optimalOrderQuantities" ||
                            key === "costBreakdown" ||
                            key === "orderStrategy"
                          ) {
                            return null;
                          }
                          return (
                            <div key={key} className="text-gray-700">
                              <strong className="capitalize">{key}:</strong>{" "}
                              {value === null || value === undefined
                                ? "N/A"
                                : typeof value === "object"
                                ? JSON.stringify(value)
                                : value}
                            </div>
                          );
                        })}

                     
                        <div className="mt-2">
                          <strong className="capitalize">Optimal Order Quantities:</strong>
                          {Object.keys(suggestion.optimalOrderQuantities).length > 0 ? (
                            <div className="bg-gray-100 p-2 rounded text-sm">
                              {Object.entries(suggestion.optimalOrderQuantities).map(
                                ([item, quantity]: any) => (
                                  <div key={item} className="text-gray-700">
                                    <strong>{item}:</strong> {quantity}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-500">No data available.</p>
                          )}
                        </div>

                        <div className="mt-2">
                          <strong className="capitalize">Cost Breakdown:</strong>
                          {Object.keys(suggestion.costBreakdown).length > 0 ? (
                            <div className="bg-gray-100 p-2 rounded text-sm">
                              {Object.entries(suggestion.costBreakdown).map(
                                ([costType, amount]: any) => (
                                  <div key={costType} className="text-gray-700">
                                    <strong>{costType}:</strong> {amount}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-500">No data available.</p>
                          )}
                        </div>

                        <div className="mt-2">
                          <strong className="capitalize">Order Strategy:</strong>
                          {Object.keys(suggestion.orderStrategy).length > 0 ? (
                            <div className="bg-gray-100 p-2 rounded text-sm">
                              {Object.entries(suggestion.orderStrategy).map(
                                ([strategy, value]: any) => (
                                  <div key={strategy} className="text-gray-700">
                                    <strong>{strategy}:</strong> {value.toString()}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <p className="text-gray-500">No data available.</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No product details available.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default withAuth(ViewProduct);