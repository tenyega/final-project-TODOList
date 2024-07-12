import {  useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


interface Data {
    id: number;
    title: string;
    date: Date;
    desc: string;
    priorityToggle: Boolean;
    status: string;
}
interface Datas {
datas: Data[];
}

export default function NavBar() {
    const [datas, setDatas] = useState<Datas | any>();
    const [resToDo, setResToDo] = useState([]);


    const highPriorityItems = resToDo.filter((data: { priorityToggle: Boolean; }) => data.priorityToggle == true);
    const taskCompletedItems = resToDo.filter((data: { status: string; }) => data.status === 'completed');

    console.log(highPriorityItems);
    useEffect(() => {
        //this code runs only when shouldFetch is true (false by default) which means we have typed something in our search bar        
          async function fetchData() {
              try {
                  const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo');
                  setDatas(await response.json()) ; 
                  if (datas) {
                      setResToDo(datas);
  
                  }
              } catch (err) {
                  setResToDo([]);
              }
          }
           fetchData();
         
    });
    
 
   
    return (
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0  dark:border-gray-700" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-100">
          <ul className="space-y-2 font-medium">
              <li>
                
              <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100  group">

<h3 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-4xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-600 from-sky-600">Todo-List</span></h3>

                  </NavLink>
              </li>
              <li>
                  <NavLink to="/add" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
               </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap  text-gray-500">AJOUTER UNE TÂCHE </span>
                  </NavLink>
              </li>
              <li>
              <NavLink to="/" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M18 0H6a2 2 0 0 0-2 2h14v12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                  <path d="M14 4H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM2 16v-6h12v6H2Z"/>
               </svg>
                            <span className="flex-1 ms-3 whitespace-nowrap  text-gray-500">MES TÂCHES </span>
                          

                             <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black-800 bg-black-100 rounded-full dark:bg-orange-500 dark:text-black-300">{resToDo.length} </span>

                  </NavLink>
              </li>
              <li>
                 <NavLink to="/important" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 17 20">
                  <path d="M7.958 19.393a7.7 7.7 0 0 1-6.715-3.439c-2.868-4.832 0-9.376.944-10.654l.091-.122a3.286 3.286 0 0 0 .765-3.288A1 1 0 0 1 4.6.8c.133.1.313.212.525.347A10.451 10.451 0 0 1 10.6 9.3c.5-1.06.772-2.213.8-3.385a1 1 0 0 1 1.592-.758c1.636 1.205 4.638 6.081 2.019 10.441a8.177 8.177 0 0 1-7.053 3.795Z"/>
               </svg>
                            <span className="flex-1 ms-2 whitespace-nowrap  text-gray-500"> IMPORTANTES </span>
                           
                                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black-800 bg-black-100 rounded-full dark:bg-red-500 dark:text-black-300">{highPriorityItems.length} </span>
                                
                         
                        </NavLink>
              </li>
              <li>
                 <NavLink to="/completed" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
               </svg>
                      <span className="flex-1 ms-3 whitespace-nowrap  text-gray-500">EFFECUTÉES</span>
                      <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black-800 bg-black-100 rounded-full dark:bg-gray-500 dark:text-black-300">{taskCompletedItems.length}</span>

                  </NavLink>
              </li>
          </ul>
      </div>
  </aside>
  
    );
  }
  
  