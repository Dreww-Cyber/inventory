"use client"
import { Eye, Plus, Upload, User } from "lucide-react";
import Link from "next/link";
import withAuth from "./withAuth"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
const Home = () => {
  const [userName, setUserName]= useState<any>()
  useEffect(()=>{
    setUserName(localStorage.getItem("userName"))
  },[])
  const logOut = ()=>{
    localStorage.removeItem("userName")
    localStorage.removeItem("token")
    location.replace("/sign-in")
  }
  return (
    <section className="bg-[#EFEFF0] min-h-screen w-sreen">
      <div className="flex items-center justify-between px-5">
        <div className="flex gap-3 items-center  px-6 py-4">
        <User size={26}/>
        <aside className="flex flex-col">
          <p className="font-bold text-[1.5rem]">Hi {userName||"User"}</p>
          <p className="font-semibold">Welcome back!</p>
        </aside>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button>Logout</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={logOut}>Logout</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-wrap justify-center items-center h-screen gap-5">
        <Link href="/add-product">   
        <aside className=" h-[10rem] w-[10rem] bg-white rounded-lg flex flex-col justify-center items-center">
          <Upload className="bg-[#EFEFF0] text-[#009951] p-1 cursor-pointer rounded"/>
          <p>Add products</p>
        </aside>
        </Link>
        {/* <Link href="/add-category">
        <aside className=" h-[10rem] w-[10rem] bg-white rounded-lg flex flex-col justify-center items-center">
          <Plus className="bg-[#EFEFF0] text-[#009951] p-1 cursor-pointer rounded"/>
          <p>Add category</p>
        </aside>
        </Link> */}
        <Link href="/view-product">
        <aside className=" h-[10rem] w-[10rem] bg-white rounded-lg flex flex-col justify-center items-center">
          <Eye className="bg-[#EFEFF0] text-[#009951] p-1 cursor-pointer rounded"/>
          <p>View products</p>
        </aside>
        </Link>
      </div>
    </section>
   );
}
 
export default withAuth(Home);