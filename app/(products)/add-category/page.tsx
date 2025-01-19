import { Button } from "@/components/ui/button";
import { ChevronLeft, Delete, DeleteIcon, Plus, Trash } from "lucide-react";
import Link from "next/link";

const Categories = () => {
    const categories=[
        {id:1,name:"Groceries"},
        {id:2,name:"Clothing"},
        {id:3, name:"Accessories"},
        {id:4, name:"Cosmetics"},
        {id:5, name:"Electronics"},
    ]
    return ( 
    <section className="bg-[#EFEFF0] min-h-screen w-screen pb-6">
        <aside className="w-full gap-[18%] md:gap-[36%] flex items-center px-16 py-10">
            <Link href="/"><ChevronLeft size={35} className="bg-white p-1 rounded-full text-slate-700"/></Link>
            <h1 className="text-2xl font-bold">Categories</h1>
        </aside>
        <div className="w-full">
            {categories.map((item)=>(
                <div className="w-full" key={item.id}>
                    <div className="text-2xl mx-auto w-[80%] mb-2 border-[2px] h-[3rem] px-5 flex justify-between items-center">
                        <p>{item.name}</p>
                        <Trash className="text-[#EC221F]"/>
                    </div>

                </div>
            ))}
        </div>
        <div className="mt-[7%] ">
        <Button className="flex place-self-center px-20 py-7 bg-[#009951] text-white"><Plus/> Add new category</Button>
        </div>
    </section> 
    );
}
 
export default Categories;