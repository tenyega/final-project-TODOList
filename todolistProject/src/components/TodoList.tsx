import { Key, useEffect, useState } from 'react';

import {  useNavigate } from 'react-router-dom';
import PartialPending from '../partials/_pending';
import PartialCompleted from '../partials/_completed';
import PartialImportant from '../partials/_important';

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

interface ToDo {
    id: any; // or string, depending on your actual id type
    status: string; // add other properties as needed
}


 function ToDoList() {
    let navigate = useNavigate() 



     const [resToDo, setResToDo] = useState([]);
     const [shouldFetch, setShouldFetch] = useState(false);
     const [searchTxt, setSearchTxt] = useState('');
     const [datas, setDatas] = useState<Datas | any>();
     const [selectedOption, setSelectedOption] = useState('');
     const [newData, setNewData] = useState<ToDo | any>();




     
     const [isDropdownVisible, setDropdownVisible] = useState(false);
      
     const toggleDropdown = () => {
       setDropdownVisible(!isDropdownVisible);
     };



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
           //Sets the shouldFetch to false after each fetch data. 
           if (shouldFetch) {
              fetchData();
              setShouldFetch(false);
          }
      }, [shouldFetch]);
      
    
    
     
     function handelete(id:any){
    
      navigate('edit/'+id)

     }
     useEffect(() => {
        if (datas) {
            console.log('SearchtedString is ' +searchTxt)
            const filtered = datas.filter((item: { title: string; }) => item.title.toLowerCase().includes(searchTxt));
            setResToDo(filtered);
            console.log(resToDo)
        }
    }, [datas]);

    const handleChange = async(e: { target: { name: any; value: any; }; }) => {
        const value = e.target.value;
        setSearchTxt(value)
        setShouldFetch(true);
      
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

                navigate('important')
               
                

            }
        } catch (err) {
            setResToDo([]);
        }
    }

    const handleOptionChange = (e:any) => {
        setSelectedOption(e.target.value);
  
    };
    

    const handelecomplete = async (id: any) => {
      
        setNewData(resToDo.find((data:{ id: number,status: string })=>data.id== id))
        newData.status='completed'
        console.log(newData)
        navigate('/important')


            try {
            const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo/'+id,{
                    method: 'PUT',
                    body: JSON.stringify(newData)
                
    
            });
            const datas = await response.json(); 
            if (datas) {
                setResToDo(datas);
    
               
                
    
            }
        } catch (err) {
            setResToDo([]);
        }
    
};
      

  return (
      <>
      

         <div className="p-4 sm:ml-64 ">
        
         <h4 className="mb-4 text-base font-semibold text-gray-700 md:text-4xl dark:text-black   p-6 ">
   MES  TÂCHES 
    </h4>
         <div className="flex items-center space-x-2 sm-2 p-6  ">
         <input  type="text"  id="title"
            name="title"
            placeholder="Recherche de tache "
            onChange={handleChange}
            className="w-full   max-w-3xl  p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"

           
            />   <div className="relative inline-block">
             <button     onClick={toggleDropdown}   className="inline-flex items-center px-6 l  p-2  text-sm font-bold text-center text-gray bg-blue-100 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-100 dark:hover:bg-gray-200 dark:focus:ring-gray-100">
                FILTRE
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
</svg>

                        </button> {isDropdownVisible && (  <div className="absolute mt-2 w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="mb-2">
            <label>
              <input type="radio" name="important" value="important" onChange={handleOptionChange} className="mr-2"   checked={selectedOption === 'important'}/>
           Importantes
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input type="radio" name="completed" value="completed" className="mr-2"  onChange={handleOptionChange}  checked={selectedOption === 'completed'} />
           Terminées 
            </label>
          </div>
          <div className="mb-2">
            <label>
              <input type="radio" name="pending" value="pending" className="mr-2"  onChange={handleOptionChange}  checked={selectedOption === 'pending'} />
            En cours 
            </label>
          </div>
        </div>)}   </div> </div>
           <div className="w-full max-w-5xl p-4 bg-white sm:p-6 dark:bg-white-800 dark:border-white-100">
           {selectedOption== '' &&    

    <ul className="my-4 space-y-3">
    {resToDo.map((data: { id: Key | null | undefined, title: string, date: string, desc:string, priorityToggle:Boolean, status:string }) => (
        data.title !== '' &&
        <li key={data.id}>
            <div className="w-full max-w-4xl p-6 font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-black">
                <div className="flex justify-between items-center">
                    <div>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">{data.title}</h5>
                        <blockquote className="text-xl italic font-semibold text-gray-900 dark:text-white">
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 3xl:max-w-3xl w-full">
  {data.desc}
</p>
 </blockquote>
                    </div>
                    <div className="flex space-x-2 ml-auto">
                        <button onClick={() => handelete(data.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        ✎
                        </button>
                        <button onClick={()=>supprime(data.id)}  className="py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-red-800 dark:text-gray-400 dark:border-red-800 dark:hover:text-white dark:hover:bg-red-700">
                                      ✖
                                      </button>
                    </div>
                    </div>
                    {data.status=='pending' &&   <div className="flex mt-4 md:mt-6">
                    <button  onClick = {()=>handelecomplete(data.id)}  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">
                  Tache Effectuée 
                    </button>
                </div> }
              
            </div>
        </li>
    ))}
</ul>
}
    </div></div>   <div className="mt-4 flex flex-col flex-wrap">
              {selectedOption == 'important' ? <PartialImportant /> : null}
              {selectedOption == 'completed' ? <PartialCompleted/> : null}
              {selectedOption == 'pending' ? <PartialPending/> : null}
        </div>
        </>
    );
}
export default ToDoList;