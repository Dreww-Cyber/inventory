import { ArrowLeftIcon, Camera, ChevronLeft } from "lucide-react";
import Link from "next/link";

const AddProduct = () => {
    return (
    <section className="bg-slate-300 min-h-screen w-sreen">
        <aside className="w-full gap-[30%] flex items-center px-16 py-10">
            <Link href="/"><ChevronLeft size={35} className="bg-white p-1 rounded-full text-slate-700"/></Link>
            <h1 className="text-2xl font-bold">Add New Product</h1>
        </aside>
        <aside className="h-[10rem] w-[15rem] bg-white rounded-lg flex p-2 flex-col items-center mx-auto">
            <Camera size={50} className="text-[#009951]"/>
            <p className=" truncate font-bold mt-[10%]">Upload Product Image</p>
        </aside>
    </section>
    );
}
 
export default AddProduct;