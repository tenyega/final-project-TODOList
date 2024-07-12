import { Key, useEffect, useState } from "react";
export default function Pending( ) {

    const [resToDo, setResToDo] = useState([]);

    useEffect(() => {
       //Runs only on the first render
    
         
       async function fetchData() {
           try {
               const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo');
               const datas = await response.json(); 
               if (datas) {
                   setResToDo(datas);

               }
           } catch (err) {
               setResToDo([]);
           }
       }
    fetchData();
   

         
 
    }, []);

 
    

    console.log(resToDo)
    return (
        <>
            
          <div className="flex  flex-row gap-5 px-5 py-10 ml-40 pl-28 ">
          
            <div className="flex flex-row  min-h-screen gap-5 px-5 py-20 bg-gray-100 flex-wrap ml-38 pl-28">
    
                {resToDo.map((data: { id: Key | null | undefined, title: string, date: string, desc: string, priorityToggle: Boolean, status: string })  =>
                    data.status == 'pending' ? (
                        <div
                        key={data.id}
                        className="w-full max-w-md p-5 text-center bg-white border rounded-lg shadow-md border-neutral-300">
                            <h4 className="mb-2 text-xl font-semibold text-gray-800">
                                {data.title}
                            </h4>
                            <h3 className="mb-1 text-gray-600 text-md"> {data.date}</h3>
                                <h3 className="text-gray-600 text-md">Description: {data.desc}</h3>
                                {/* <h3 className="text-gray-600 text-md">Priority: {data.priorityToggle}</h3> */}
                                <h3 className="text-gray-600 text-md">Status: {data.status}</h3>
                                
                        </div>
                    ) : null
                )}
                </div>
            </div>
        </>
    )
}