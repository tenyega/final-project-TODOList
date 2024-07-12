import  { useState } from 'react';
import {  useNavigate } from 'react-router-dom';


export default function MyForm() {
  let navigate = useNavigate() 

  
  const [msg, setMsg] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
      desc: '',
      // priority: '',
    status: '',
     priorityToggle:false
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setFormData({ ...formData, priorityToggle: checked });
  };

 


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const response = await fetch('https://json-server-vercel-two-kappa.vercel.app/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setMsg('Form data submitted successfully');
      console.log('Form data submitted successfully');
      setFormData({   title: '',
        date: '',
          desc: '',
          // priority: '',
        status: '',
        priorityToggle: false});
         navigate('/')
              
    } else {
      
      console.error('Form data submission failed');
    }
    console.log('Form data submitted:', formData);
  };

    return (
      <>
      <h2 className="mb-9 text-base font-semibold text-gray-900 md:text-5xl dark:text-black">
       AJOUTER UNE TÂCHE 
            </h2>
           <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="message">Description</label>
            <textarea
              id="desc"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
         </div>
          <div className='flex flex-row gap-5'>
        
            {/* <label className="block text-sm font-medium text-gray-700" htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value=""></option>
              <option value="Low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
           
                  </select> */}
                  {/* <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value=""></option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            
            </select> */}

            <label className="block text-sm font-medium text-gray-700" htmlFor="status">Status</label>
                      <input
                        
                  type="status"
                  id="status"
                  name="status"
                  value="pending"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                     
                        disabled
                />
    
          <br />
<label className="inline-flex items-center cursor-pointer"  htmlFor='priorityToggle'>
<input type="checkbox" className="sr-only peer" id="priorityToggle"  onChange={handleToggle} 
              name="priorityToggle"
              checked={formData.priorityToggle}/>

  <div className="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-black-300 dark:peer-focus:ring-red-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-700">Priority </span>
</label>

          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
              </button>
              {msg}
        </form>
      
            </>
  );
};


