import {  JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Menu from "../components/menu";
import {  useNavigate } from 'react-router-dom';
interface RestToDo{
  id: any;
  title: string;
  date: Date;
  desc: string;
  priorityToggle: Boolean;
  status: string;
}



export default function Important() {
    let navigate = useNavigate() 

    const [resToDo, setResToDo] = useState<RestToDo | any>([]);

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
  
     function handelete(id:any){
    
        navigate('../edit/'+id)
  
       }



     const supprime = async (id:any) => {
      try {
      const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo/'+id,{
          method: 'DELETE',
          body: JSON.stringify(resToDo),
          headers: {
              'Content-Type': 'application/json'
          }
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
           <NavBar  />
          <Menu />
          <div className="p-4 sm:ml-64">
            <div className="w-full max-w-5xl p-4 bg-white sm:p-6 dark:bg-white-800 dark:border-white-100">
              <h2 className="mb-9 text-base font-semibold text-gray-900 md:text-5xl dark:text-black">
                TÂCHES IMPORTANTES
              </h2>
              <div className="  w-full max-w-5xl p-4 bg-white sm:p-6 dark:bg-white-800 dark:border-white-100">
              <ul className="my-4 space-y-3">
                {resToDo.map((data: { priorityToggle: Boolean; id: Key ; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; desc: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; status: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) =>
                  data.priorityToggle === true ? (
                    <li key={data.id}>
        <div className="bg-red-200 w-full max-w-4xl p-6 font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-black">
                <div className=" flex justify-between items-center">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{data.title}</h5>
                        <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 3xl:max-w-3xl w-full">
  {data.desc}
</p>
 </blockquote>
               

 </div>  </div>
                    <div className="flex space-x-2 ml-auto">
                        
                    <div className="flex space-x-2 ml-auto">
                        <button onClick={() => handelete(data.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        ✎
                        </button>
                        <button onClick={()=>supprime(data.id)}  className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-800 dark:text-gray-400 dark:border-red-800 dark:hover:text-white dark:hover:bg-red-700">
                        ✖
                        </button>
                    </div>                     </div>  

                    {data.status=='pending' && <div className="flex mt-4 md:mt-6">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                  Tache Effectuée ?
                    </button>
                </div>}
                     
                          </div>
                      
                    </li>
                  ) : null
                )}   
              </ul>
             
            </div>    </div>
          </div>
        </>
      );
    }      