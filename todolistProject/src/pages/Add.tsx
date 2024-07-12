import MyForm from "../components/Form";
import NavBar from "../components/NavBar";
import Menu from "../components/menu";

export default function Add() {
    return (
        <>
          
            <NavBar />
            <Menu />
            <div className="p-2 sm:ml-64">
            <div className="w-full max-w-5xl p-4 bg-white   sm:p-6 dark:bg-white-800 dark:border-white-100">

            <MyForm />

           </div> </div>
        </>
    )
}