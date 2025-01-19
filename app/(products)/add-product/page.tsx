import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

const AddProduct = () => {
    return (
    <section className="bg-[#EFEFF0] min-h-screen w-screen pb-6">
        <aside className="w-full gap-[18%] md:gap-[36%] flex items-center px-16 py-10">
            <Link href="/"><ChevronLeft size={35} className="bg-white p-1 rounded-full text-slate-700"/></Link>
            <h1 className="text-2xl font-bold">Add New Product</h1>
        </aside>
        <aside className="h-[10rem] w-[15rem] bg-white rounded-lg flex p-2 flex-col items-center mx-auto">
            <Camera size={50} className="text-[#009951] text-sm"/>
            <p className=" truncate font-bold mt-[10%]">Upload Product Image</p>
        </aside>
        <div className="w-full flex flex-col">
            <label className="mt-5 mx-auto flex flex-col md:px-10 md:mx-auto">
                <p>Select Category</p>
                <input type="text" placeholder="Clothing" className="w-[23rem] h-[2.5rem] rounded placeholder:pl-3" />
            </label>
            <label className="mt-5 mx-auto  flex flex-col md:px-10 md:mx-auto">
                <p>Product name</p>
                <input type="text" placeholder="Input your product name" className="w-[23rem] h-[2.5rem] rounded placeholder:pl-3" />
            </label>
            <div className="flex gap-2 mx-auto">
            <label className="mt-5 mx-auto md:mx-0 flex flex-col md:px-10">
                <p>Price (NGN)</p>
                <input type="text" placeholder="NGN" className=" h-[2.5rem] rounded placeholder:pl-3 md:w-[9rem]" />
            </label>
            <label className="mt-5 mx-auto md:mx-0 flex flex-col md:px-10">
                <p>Quantity</p>
                <input type="text" placeholder="1" className=" h-[2.5rem] rounded placeholder:pl-3 md:w-[9rem]" />
            </label>
            </div>
            <label  className="mt-5 mx-auto  flex flex-col md:px-10">
            <p>Product description</p>
            <input type="text" placeholder="Value" className=" h-[4.5rem] rounded placeholder:pl-3 w-[23rem]" />
            </label>

            <div className="flex mx-auto mt-3 gap-3">
                <Link href="/"><Button className="bg-[#E3E3E3] rounded py-5 px-10">Cancel</Button></Link>
                <Button className="bg-[#009951] text-white py-5 px-10 rounded">Add Product</Button>
            </div>
        </div>
    </section>
    );
}
 
export default AddProduct;