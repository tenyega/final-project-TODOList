import {  useParams } from "react-router-dom"
import NavBar from "../components/NavBar"
import {  useEffect, useState } from 'react';
import Menu from "../components/menu";



interface ResToDo {
    id: number;
    title: string;
    date: Date;
    desc: string;
    priorityToggle: Boolean;
    status: string;
}

export default function Edit() {
    let params = useParams() ;

    
    const [resToDo, setResToDo] = useState<ResToDo |any>({});
        useEffect(() => {
        //Runs only on the first render
     
          
        async function fetchData() {
            try {
                const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo/'+params.id);
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
  


   
  

    const misejaour = async () => {
      
     


        try {
        const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo/'+params.id,{
                method: 'PUT',
                body: JSON.stringify(resToDo)
            

        });
        const datas = await response.json(); 
        if (datas) {
            setResToDo(datas);

           
            

        }
    } catch (err) {
        setResToDo([]);
    }
}

   

   return (
    <>
        <NavBar />
       
            <Menu />
            <div className="p-4 sm:ml-64">
    <div className="w-full max-w-5xl p-4 bg-white sm:p-6 rounded-lg shadow-lg">

        <div className="flex flex-col items-center">

            
            {resToDo ? (
                <div className="flex flex-col items-start gap-5 px-5 py-10 border border-gray-300 rounded-md shadow-md bg-gray-50 w-full">
                    <h2 className="text-xl font-semibold text-gray-700">To-Do Details:</h2>
                    <p><strong>Title:</strong> {resToDo.title}</p>
                    <p><strong>Description:</strong> {resToDo.desc}</p>
                    <p><strong>Status:</strong> {resToDo.status}</p>
                </div>
            ) : (
                <p className="text-center text-gray-500">Loading...</p>
            )}

            <h2 className="text-xl font-semibold mt-10 text-gray-700">Modifier</h2>
            <form className="flex flex-col gap-4 mt-5 w-full max-w-md" onSubmit={misejaour}>
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 text-gray-600">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                        value={resToDo.title}               
                        onChange={(e) => setResToDo({ ...resToDo, title: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="desc" className="mb-1 text-gray-600">Description</label>
                    <textarea 
                        id="desc" 
                        name="desc" 
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"  
                        value={resToDo.desc}  
                        onChange={(e) => setResToDo({ ...resToDo, desc: e.target.value })}
                    ></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="status" className="mb-1 text-gray-600">Statut</label>
                    <select 
                        name="status" 
                        id="status" 
                        className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={resToDo.status}
                        onChange={(e) => setResToDo({ ...resToDo, status: e.target.value })}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Mettre à jour la modification</button>
            </form>
        </div>
    </div>
</div>
</>
);
}